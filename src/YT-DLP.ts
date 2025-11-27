import { spawn } from "node:child_process";

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

  public async updateDLP() {
    return new Promise((res, rej) => {
      const process = spawn(this.dlpPath, ["--update"]);
      process.on("error", (err) => rej(err));
      process.on("close", (code) => {
        if (code === 0) res("success");
        else rej(`yt-dlp exited with code ${code}`);
      });
    });
  }
}
