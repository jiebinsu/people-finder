import fetch from "node-fetch";
import timeoutHandler from "../utils/timeout";
import { getGreatCircleDistanceInMiles } from "../utils/distance";
import { ServerError } from "../errors/server-error";
import redis from "./database/redis";
import { API_URI, REDIS_TTL } from "../config";

export const getPeopleFromCity = async (city) => {
  try {
    let peopleFromLondon = await redis.get("from.london");
    if (!!peopleFromLondon) return JSON.parse(peopleFromLondon);

    const response = await timeoutHandler(
      fetch(`${API_URI}/city/${city}/users`)
    );
    peopleFromLondon = await response.json();
    redis.set("from.london", JSON.stringify(peopleFromLondon), REDIS_TTL);

    return peopleFromLondon;
  } catch (e) {
    throw new ServerError("People service is unavailable");
  }
};

const isWithinArea = (
  sourceLat,
  sourceLon,
  destLat,
  destLon,
  distanceInMiles
) => {
  const distance = getGreatCircleDistanceInMiles(
    sourceLat,
    sourceLon,
    destLat,
    destLon
  );
  return distance <= distanceInMiles;
};

export const getPeopleWithinArea = async (
  lat = 0,
  lon = 0,
  distanceInMiles = 50
) => {
  try {
    let peopleInLondon = await redis.get("in.london");
    if (!peopleInLondon) {
      const response = await timeoutHandler(fetch(`${API_URI}/users`));
      peopleInLondon = await response.json();
      redis.set("in.london", JSON.stringify(peopleInLondon), REDIS_TTL);
    } else {
      peopleInLondon = JSON.parse(peopleInLondon);
    }

    return peopleInLondon.filter((person) =>
      isWithinArea(lat, lon, person.latitude, person.longitude, distanceInMiles)
    );
  } catch (e) {
    throw new ServerError("People service is unavailable");
  }
};
