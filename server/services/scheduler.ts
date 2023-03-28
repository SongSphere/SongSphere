const CronJob = require("node-cron");
const SPOTIFY_API = "https://api.spotify.com/v1";
import Seed from "../seed";

function getRandomSearch() {
  // A list of all characters that can be chosen.
  const characters = "abcdefghijklmnopqrstuvwxyz";

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(
    Math.floor(Math.random() * characters.length)
  );
  let randomSearch: string = "";

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = randomCharacter + "%";
      break;
    case 1:
      randomSearch = "%" + randomCharacter + "%";
      break;
  }

  return randomSearch;
}

export const initScheduledJobs = async () => {
  const scheduledJobFunction = CronJob.schedule("*/1 * * * *", () => {
    let url = "https://api.spotify.com/v1/search?type=track&offset=61&limit=1&q=%25s%25";
    let random_offset = Math.floor(Math.random() * 100);
    console.log("I'm executed on a schedule!");

    url = `${SPOTIFY_API}/search?type=track&offset=${encodeURIComponent(
      random_offset
    )}&limit=1&q=${encodeURIComponent(getRandomSearch())}`;

    Seed.setSeed(url)
  });

  scheduledJobFunction.start();
};
