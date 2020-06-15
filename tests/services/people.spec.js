import fetch from "node-fetch";
import {
  getPeopleFromCity,
  getPeopleWithinArea,
} from "../../src/services/people";
import * as Distance from "../../src/utils/distance";

jest.mock("node-fetch");

const CENTRAL_LONDON_LATLON = [51.51, -0.13];

describe("getPeopleFromCity", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns json response from api", async () => {
    const expected = { test: "test" };
    fetch.mockImplementation(() => Promise.resolve({ json: () => expected }));

    const actual = await getPeopleFromCity("London");
    expect(actual).toEqual(expected);
  });

  it("throws server error when api fails", () => {
    fetch.mockImplementation(() => Promise.reject("test"));

    expect(getPeopleFromCity("London")).rejects.toThrow(
      new Error("People service is unavailable")
    );
  });
});

describe("getPeopleWithinArea", () => {
  const [londonLat, londonLon] = CENTRAL_LONDON_LATLON;

  it("should return all people with same latlon if 0 distance", async () => {
    const expected = [
      { latitude: 51.51, longitude: -0.13 },
      { latitude: 51.51, longitude: -0.13 },
      { latitude: 51.51, longitude: -0.13 },
    ];
    fetch.mockImplementation(() => Promise.resolve({ json: () => expected }));

    const actual = await getPeopleWithinArea(londonLat, londonLon, 0);
    expect(actual).toEqual(expected);
  });

  it("should only return people with same lat lon if 0 distance", async () => {
    const response = [
      { latitude: 51.51, longitude: -0.13 },
      { latitude: 52.51, longitude: -0.13 },
      { latitude: 53.51, longitude: -0.13 },
    ];
    fetch.mockImplementation(() => Promise.resolve({ json: () => response }));

    const actual = await getPeopleWithinArea(londonLat, londonLon, 0);
    expect(actual).toEqual([{ latitude: 51.51, longitude: -0.13 }]);
  });

  it("should only return people within latlon of given distance 1", async () => {
    const expected = [{ latitude: 51.52, longitude: -0.14 }];
    fetch.mockImplementation(() => Promise.resolve({ json: () => expected }));

    const actual = await getPeopleWithinArea(londonLat, londonLon, 1);
    expect(actual).toEqual(expected);
  });

  it("should return empty array if no people are within given distance", async () => {
    const expected = [{ latitude: 52, longitude: -0.14 }];
    fetch.mockImplementation(() => Promise.resolve({ json: () => expected }));

    const actual = await getPeopleWithinArea(londonLat, londonLon, 1);
    expect(actual).toEqual([]);
  });

  it("throws server error when api fails", () => {
    fetch.mockImplementation(() => Promise.reject("test"));

    expect(getPeopleWithinArea(londonLat, londonLon, 1)).rejects.toThrow(
      new Error("People service is unavailable")
    );
  });

  it("should make call with defaults if no params passed", async () => {
    const expected = [{ latitude: 0.5, longitude: 0.5 }];
    fetch.mockImplementation(() => Promise.resolve({ json: () => expected }));
    const distanceSpy = jest.spyOn(Distance, "getGreatCircleDistanceInMiles");

    const actual = await getPeopleWithinArea();
    expect(distanceSpy).toHaveBeenCalledWith(0, 0, 0.5, 0.5);
    expect(actual).toEqual(expected);
  });
});
