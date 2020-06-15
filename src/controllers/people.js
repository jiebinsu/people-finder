import { getPeopleFromCity, getPeopleWithinArea } from "../services/people";

const CENTRAL_LONDON_LATLON = [51.5073899, -0.1364547];

const sortById = (a, b) => a.id - b.id;

const getPeopleFromLondon = async (_, res) => {
  const [lat, lon] = CENTRAL_LONDON_LATLON;

  const peopleFromLondon = await getPeopleFromCity("London");
  const peopleInLondon = await getPeopleWithinArea(lat, lon);

  const allSorted = [...peopleFromLondon, ...peopleInLondon].sort(sortById);

  res.json({
    people: allSorted,
    success: "true",
  });
};

export default { getPeopleFromLondon };
