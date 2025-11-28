import { YtDlpResponse } from "./types/DlpWrapper";
import { filteredFormatsType } from "./types/helperTypes";

export function filterFormats(jsonData: YtDlpResponse): filteredFormatsType {
  const formats: filteredFormatsType = {
    audio: [],
    video: [],
    videoWithAudio: [],
  };
  jsonData.formats.forEach((ele) => {
    if (ele.vcodec !== "none" && ele.acodec !== "none") {
      formats.videoWithAudio.push(ele);
    } else if (ele.vcodec !== "none" && ele.acodec === "none") {
      formats.video.push(ele);
    } else if (ele.vcodec === "none" && ele.acodec !== "none") {
      formats.audio.push(ele);
    }
  });
  return formats;
}
