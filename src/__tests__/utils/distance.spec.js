import { getGreatCircleDistanceInMiles } from "../../utils/distance";

describe("distance", () => {
  it("given undefined should return falsy", () => {
    const distance = getGreatCircleDistanceInMiles();
    expect(distance).toBeFalsy();
  });

  it("no difference should return 0", () => {
    const distance = getGreatCircleDistanceInMiles(1, 1, 1, 1);
    expect(distance).toEqual(0);
  });

  it("same difference in lat lon should return same distance", () => {
    const distance1 = getGreatCircleDistanceInMiles(1, 1, 0, 0);
    const distance2 = getGreatCircleDistanceInMiles(0, 0, 1, 1);
    expect(distance1).toEqual(distance2);
  });
});
