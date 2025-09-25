const retryWithExponentialBackoff = async <T>(
  fn: (count: number) => Promise<T>,
  countsToCall: number
) => {
  try {
    const res = await fn(countsToCall);
    return res;
  } catch (e) {
    if (countsToCall === 0) {
      return "Error";
    } else {
      const delay = countsToCall * 1000;
      await new Promise((res) => {
        setTimeout(res, delay);
      });
      return retryWithExponentialBackoff(fn, countsToCall - 1);
    }
  }
};

export default retryWithExponentialBackoff;
