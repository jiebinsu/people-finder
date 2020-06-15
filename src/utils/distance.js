/*
Haversine Formula
a = sin²(ΔlatDifference/2) + cos(lat1).cos(lat2).sin²(ΔlonDifference/2)
c = 2.atan2(√a, √(1−a))
d = R.c
*/
const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const getGreatCircleDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 3961;
  const latDifference = degreesToRadians(lat2 - lat1);
  const lonDifference = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(lonDifference / 2) *
      Math.sin(lonDifference / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

export { getGreatCircleDistanceInMiles };
