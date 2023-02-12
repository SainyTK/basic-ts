import axios from "axios";
const url1 = "https://ftx.com/api/markets/BTC/USDT";
const url2 = "https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT";

async function main() {
  const result = await axios.get(url1);
  const btcFTX = result.data.result.price;
  const result2 = await axios.get(url2);
  const btcBinance = result2.data.price;
  const diff = btcFTX - btcBinance;
  const per = (diff * 100) / btcBinance;
  console.log(`BTC price : ${btcFTX} USDT`);
  console.log(`USDT price : ${btcBinance} USDT`);
  console.log(`Diff : ${diff} (${per})%`);
}
main();
