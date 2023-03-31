import { Command } from "commander";
import fs from "fs";

const program = new Command();
const package_ = JSON.parse(fs.readFileSync("package.json", "utf8"));

program
  .version(package_.version, "-V, --version")
  // .usage("[歌名 | 歌手]")
  // .option("-s, --search", "搜索音乐")
  .action(() => {})
  .parse(process.argv);

export default program;
