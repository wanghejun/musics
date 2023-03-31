import ora from "ora";
import axios from "axios";

async function searchSongs(text) {
  const spinner = ora("搜索中🔍").start();
  const normalSearchUrl = `https://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do?text=${encodeURIComponent(text)}&pageNo=1&searchSwitch={song:1}`;
  const res = await axios.get(normalSearchUrl);
  const searchSongs = res.data.songResultData.result;
  if (searchSongs) {
    let detailResults = await Promise.all(
      searchSongs.map(({ copyrightId }) => {
        const detailUrl = `https://c.musicapp.migu.cn/MIGUM2.0/v1.0/content/resourceinfo.do?copyrightId=${copyrightId}&resourceType=2`;
        return axios.get(detailUrl);
      })
    );
    // console.log(detailResults);
    searchSongs.forEach((item, index) => {
      const { resource } = detailResults[index].data;
      const { rateFormats, newRateFormats } = resource[0];
      const { androidSize, size, androidFileType, fileType, androidUrl, url } = newRateFormats.length ? newRateFormats[newRateFormats.length - 1] : rateFormats[rateFormats.length - 1];
      const { pathname } = new URL(androidUrl || url);
      Object.assign(item, {
        size: androidSize || size,
        url: `https://freetyst.nf.migu.cn${pathname}`,
        songName: `${joinSingersName(item.singers || item.artists)} - ${removePunctuation(item.name || item.songName)}.${androidFileType || fileType}`,
      });
    });
  }

  spinner.succeed("为您找到如下歌曲");
  return searchSongs;
}

function removePunctuation(str) {
  return str.replace(/[.?\/#|$%\^&\*;:{}+=_`'"~<>]/g, "").replace(/\s{2,}/g, " ");
}

function joinSingersName(singers) {
  const singersNames = singers.map((singer) => singer.name);
  return singersNames.join(",");
}
export { searchSongs };
