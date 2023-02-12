import axios from "axios";

type OHLC = {
  open: string;
  hight: string;
  low: string;
  close: string;
};

const url = "https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT";

async function main() {
  const response = await axios.get(url);
  const candel = response.data;

  let obj: Record<string, OHLC> = {};

  for (let value of candel) {
    const data: OHLC = {
      open: value[1],
      hight: value[2],
      low: value[3],
      close: value[4],
    };

    const formatdat = new Date(value[0])
      .toISOString()
      .slice(0, 16)
      .replace("T", " ");
    obj[formatdat] = data;
  }

  console.log(obj);
}

main();
