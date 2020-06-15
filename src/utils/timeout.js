import { DEFAULT_TIMEOUT } from "../config";

export default (
  asyncFunction,
  timeoutInMs = DEFAULT_TIMEOUT,
  errMsg = "Request timed out"
) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(errMsg));
    }, timeoutInMs);
  });

  return Promise.race([asyncFunction, timeoutPromise]);
};
