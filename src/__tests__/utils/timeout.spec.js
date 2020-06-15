import timeout from "../../utils/timeout";

describe("timeoutHandler", () => {
  it("should throw default error if not specified", async () => {
    const asyncFunc = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });

    await expect(timeout(asyncFunc)).rejects.toThrow("Request timed out");
  });

  it("should not throw error if promise resolves in time", async () => {
    const asyncFunc = new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, 100);
    });

    await expect(timeout(asyncFunc)).resolves.toEqual("success");
  });
});
