import program from "./command.js";
import { searchSongs } from "./search.js";
import { downloadSongs } from "./download.js";

import inquirer from "inquirer";

async function main() {
  const options = program.opts();

  if (!Object.keys(options).length) {
    const { msName } = await inquirer.prompt([
      {
        type: "string",
        name: "msName",
        message: "请输入歌名或者歌手",
      },
    ]);
    // const msName = "周杰伦";
    if (!msName) process.exit();

    const songs = await searchSongs(msName);
    // console.log(songs);
    if (songs) {
      let { 已选: curList } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "已选",
          choices() {
            const lists = [];
            songs.forEach((it) => {
              lists.push(`${it.songName}`);
            });
            return lists;
          },
        },
      ]);
      // console.log("result:", curList);
      curList.length ? "" : process.exit();

      curList = curList.map((it) => {
        return songs.find((item) => item.songName === it);
      });
      // console.log("curList:", curList);
      downloadSongs(curList);
    }
  }

  if (options.search) {
    console.log(options);
    console.log(program.args);
  }
}

export default main;
