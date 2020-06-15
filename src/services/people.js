import fetch from "node-fetch";
import { getGreatCircleDistanceInMiles } from "../utils/distance";

const API_URI = "https://bpdts-test-app.herokuapp.com";

export const getPeopleFromCity = async (city) => {
  try {
    const response = await fetch(`${API_URI}/city/${city}/users`);
    return await response.json();
  } catch (e) {
    throw new Error("People service is unavailable");
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
    const response = await fetch(`${API_URI}/users`);
    const people = await response.json();

    return people.filter((person) =>
      isWithinArea(lat, lon, person.latitude, person.longitude, distanceInMiles)
    );
  } catch (e) {
    throw new Error("People service is unavailable");
  }
};
