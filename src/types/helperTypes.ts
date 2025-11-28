import { YtDlpFormat } from "./DlpWrapper";

export type filteredFormatsType = {
  audio: YtDlpFormat[];
  video: YtDlpFormat[];
  videoWithAudio: YtDlpFormat[];
};
