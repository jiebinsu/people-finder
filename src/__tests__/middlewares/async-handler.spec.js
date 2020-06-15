import asyncHandler from "../../middlewares/async-handler";

describe("asyncHandler", () => {
  it("should catch exceptions of functions passed into it", async () => {
    const handler = asyncHandler(() => {
      throw new Error("test");
    });
    await expect(handler).toThrow("test");
  });

  it("should call next with error when async function throws it", async () => {
    const next = jest.fn();
    const handler = asyncHandler(async (req, res, next) => {
      throw new Error("test");
    });

    await handler(null, null, next);
    expect(next).toHaveBeenCalled();
  });

  it("should not call next if no error", async () => {
    const next = jest.fn();
    const handler = asyncHandler(async (req, res, next) => true);

    await handler(null, null, next);
    expect(next).not.toHaveBeenCalled();
  });
});
