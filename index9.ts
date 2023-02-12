import axios from "axios";

type OrderBookResponse = {
  lastUpdateId: number;
  bids: string[][];
  asks: string[][];
};

const url = "https://api1.binance.com/api/v3/depth?symbol=BTCUSDT";

async function calculateOutputAmount(usdtAmount: number) {
  const orderBookData: OrderBookResponse = await axios.get(url).then(res => res.data);
  
  const asks = orderBookData.asks;

  let input = usdtAmount;
  let output = 0;

  for (let i = 0 ; i < asks.length && input > 0; i ++) {
    const [price, orderVolume] = asks[i];
    const inputVolume = input / Number(price);

    const volume = Math.min(Number(orderVolume), inputVolume);

    input -= volume * Number(price)
    output += volume

    console.log({input, output, volume, price, amount: volume * Number(price)});
  }

  console.log(`Input USDT: ${usdtAmount}`)
  console.log(`Output BTC: ${output}`)
}

async function main() {
  calculateOutputAmount(290000);
}

main();
