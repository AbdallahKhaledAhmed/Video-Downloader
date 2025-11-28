import { spawn } from "node:child_process";
import fs from "node:fs";
import { YtDlpResponse } from "./types/DlpWrapper";
import { filterFormats } from "./helperFunctions";

export default class YTDLP {
  private dlpPath: string;

  private constructor(dlpPath: string) {
    this.dlpPath = dlpPath;
  }

  public static async create(dlpPath: string) {
    const process = new YTDLP(dlpPath);
    try {
      await process.ensureExecutable();
      return process;
    } catch {
      return null;
    }
  }
  private ensureExecutable() {
    return new Promise((res, rej) => {
      const process = spawn(this.dlpPath, ["--version"]);
      process.on("error", (err) => rej(err));
      process.on("close", (code) => {
        if (code === 0) res("success");
        else rej(new Error(`yt-dlp exited with code ${code}`));
      });
    });
  }

  public static async updateDLP(path: string) {
    return new Promise((res, rej) => {
      const process = spawn(path, ["--update"]);
      process.on("error", (err) => rej(err));
      process.on("close", (code) => {
        if (code === 0) res("success");
        else rej(`yt-dlp exited with code ${code}`);
      });
    });
  }

  public static async downloadLatestRelease(path: string): Promise<string> {
    try {
      const binaryResponse = await fetch(
        "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe"
      );

      if (!binaryResponse.ok) {
        throw new Error(`Failed to download: HTTP ${binaryResponse.status}`);
      }

      const binaryBuffer = await binaryResponse.arrayBuffer();
      fs.writeFileSync(path, Buffer.from(binaryBuffer));

      return "Download completed successfully";
    } catch (error) {
      throw new Error(`Download failed: ${(error as Error).message}`);
    }
  }

  public getVideoOptions(url: string) {
    const options = [
      "--no-warnings",
      "--no-playlist",
      "--dump-json",
      "--js-runtimes",
      "node",
      url,
    ];

    return new Promise((res, rej) => {
      let rawData = "";

      const process = spawn(this.dlpPath, options);

      process.stdout.on("data", (data) => (rawData += data));

      process.on("close", (code) => {
        if (code === 0) {
          try {
            // 1. Parse and Type Cast
            const parsedData = JSON.parse(rawData) as YtDlpResponse;

            // 2. Pass the typed object to your function
            fs.writeFileSync(
              "test.json",
              JSON.stringify(filterFormats(parsedData), null, 2)
            );
            res("success");
          } catch (error) {
            rej(`Failed to parse JSON: ${error}`);
          }
        } else {
          rej(`yt-dlp exited with code ${code}`);
        }
      });
    });
  }
}
