const Seed = (function () {
  let seed = ""
  const getSeed = () => {
    return seed;
  };

  const setSeed = (s: string) => {
    seed = s;
  };

  return {
    getSeed: getSeed,
    setSeed: setSeed,
  };
})();

export default Seed;
