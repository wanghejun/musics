import { Command } from 'commander';
const program = new Command();

program
	.version("1.0.0")
	.usage("[歌名 | 作者]")
	.option("-s, --search", "搜索音乐")
	.command("init", "创建新项目")
	.action(function (a, b, c, d) {
		console.log(a);
		console.log("请输入歌名or作者");
	})
	.parse(process.argv);

const options = program.opts();

if (options.search) {
	console.log("搜索音乐");
}

import inquirer from 'inquirer';

// inquirer
// 	.prompt([
// 		{
// 			type: "string",
// 			name: "username",
// 			message: "请输入用户名",
// 		},
// 		{
// 			type: "number",
// 			message: "请输入您的年龄",
// 			name: "age",
// 		},
// 	])
// 	.then((answers) => {
// 		console.log(answers);
// 		console.log(answers.age);
// 		console.log(answers.username);
// 	});

	inquirer.prompt([
		{
			type: 'checkbox',
			name: 'lists',
			choices() {
				const lists = [];
				for (let i = 0; i < 100; i++) {
					if (i % 3 === 0) {
						// lists.push(new inquirer.Separator());
					}
					// lists.push('item' + (i + 1));
					lists.push({a:1});
				}
				return lists;
			},
		},
	]);
