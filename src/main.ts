import YTDLP from "./YT-DLP";

(async function main() {
  console.log("Making sure YTDLP is Up to date.....");
  const dlp = await YTDLP.create("utils/yt-dlp.exe");
  if (dlp) {
    console.log("Working!");
  } else {
    console.log("error");
  }
})();
