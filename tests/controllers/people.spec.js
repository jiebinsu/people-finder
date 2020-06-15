import peopleController from "../../src/controllers/people";
import {
  getPeopleFromCity,
  getPeopleWithinArea,
} from "../../src/services/people";

jest.mock("../../src/services/people");

const httpMock = (query) => {
  const req = {};
  const res = {
    json(payload) {
      this.body = payload;
      return {
        people: payload,
        success: "true",
      };
    },
  };
  const next = jest.fn();
  return [req, res, next];
};

describe("peopleController", () => {
  it("should return json response with empty array when no people found", async () => {
    const [req, res, next] = httpMock();
    getPeopleFromCity.mockResolvedValue([]);
    getPeopleWithinArea.mockResolvedValue([]);

    await peopleController.getPeopleFromLondon(req, res, next);

    const expected = {
      people: [],
      success: "true",
    };

    expect(res.body).toEqual(expected);
  });

  it("should return people sorted by id order", async () => {
    const [req, res, next] = httpMock();
    getPeopleFromCity.mockResolvedValue([{ id: 1 }, { id: 4 }]);
    getPeopleWithinArea.mockResolvedValue([{ id: 3 }, { id: 2 }]);

    await peopleController.getPeopleFromLondon(req, res, next);

    const expected = {
      people: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      success: "true",
    };

    expect(res.body).toEqual(expected);
  });
});
