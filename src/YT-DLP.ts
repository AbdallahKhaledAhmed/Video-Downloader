import { spawn } from "node:child_process";
import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import { error } from "node:console";

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
}
