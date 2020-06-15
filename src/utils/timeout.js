export default (
  asyncFunction,
  timeoutInMs = 350,
  errMsg = "Request timed out"
) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(errMsg));
    }, timeoutInMs);
  });

  return Promise.race([asyncFunction, timeoutPromise]);
};
