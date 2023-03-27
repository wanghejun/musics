import download from "download";
import ora from "ora";

async function downloadSongs(songs) {
	const spinner = ora("下载中").start();
	await Promise.all(
		songs.map(({ url, songName }) => {
			return download(url, "./musics", { filename: songName });
		})
	);
	spinner.succeed("下载完成");
}

export { downloadSongs };
