import inquirer from "inquirer";

async function inquiryMusic() {
  const result = await inquirer.prompt([
    {
      type: "string",
      name: "username",
      message: "请输入歌名或者歌手",
    },
  ]);
  return result;
}

export { inquiryMusic };
