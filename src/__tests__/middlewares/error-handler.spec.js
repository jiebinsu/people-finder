import errorHandler from "../../middlewares/error-handler";
import { ServerError } from "../../errors/server-error";

describe("errorHandler", () => {
  let res;

  const next = jest.fn();

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(console, "warn").mockImplementation();

    res = {
      data: null,
      code: null,
      status(statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      send(payload) {
        this.data = payload;
      },
    };
  });

  afterEach(() => {
    next.mockClear();
    jest.clearAllMocks();
  });

  test("should return the default error message with status code of 500", () => {
    const error = new ServerError();
    errorHandler(error, {}, res, next);

    expect(res.statusCode).toEqual(500);
    expect(res.data).toEqual({ error: "Internal Server Error" });
  });

  test("should return the passed error message with status code of 400", () => {
    const error = new ServerError("oops", 400);
    errorHandler(error, {}, res, next);

    expect(res.statusCode).toEqual(400);
    expect(res.data).toEqual({ error: "oops" });
  });

  test("should log warn if status code is under 400", () => {
    const error = new ServerError("oops", 304);
    errorHandler(error, {}, res, next);

    expect(console.warn).toHaveBeenCalledWith({ status: 304, message: "oops" });
  });

  test("should log error if status code is >= 400", () => {
    const error = new ServerError("oops", 404);
    errorHandler(error, {}, res, next);

    expect(console.error).toHaveBeenCalledWith({
      status: 404,
      message: "oops",
    });
  });

  test("should return 500 and default error message if not specified", () => {
    const error = new Error();
    errorHandler(error, {}, res, next);

    expect(console.error).toHaveBeenCalled();
    expect(res.statusCode).toEqual(500);
    expect(res.data).toEqual({ error: "Internal Server Error" });
  });
});
