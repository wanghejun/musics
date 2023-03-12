
const ora = require('ora');
const spinner = ora('搜索中🔍').start();
// console.log(ora);
setTimeout(() => {
	// spinner.color = 'green';
	// spinner.text = '为您找到如下歌曲';
}, 1000);
setTimeout(()=>{
	// spinner.text = '为您找到如下歌曲';

  spinner.succeed('为您找到如下歌曲')
  // spinner.stop()
},2000)
