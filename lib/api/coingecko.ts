import axios from "axios";

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

export interface TokenPrice {
  usd: number;
  usd_24h_change: number;
}

export interface TokenMarketData {
  current_price: { usd: number };
  market_cap: { usd: number };
  total_volume: { usd: number };
  price_change_percentage_24h: number;
}

export class CoinGeckoAPI {
  private apiKey: string;

  constructor(apiKey: string = process.env.COINGECKO_API_KEY || "") {
    this.apiKey = apiKey;
  }

  async getTokenPrice(tokenId: string): Promise<TokenPrice> {
    try {
      const response = await axios.get(`${COINGECKO_API_BASE}/simple/price`, {
        params: {
          ids: tokenId,
          vs_currencies: "usd",
          include_24hr_change: true,
        },
        headers: this.apiKey ? { "x-cg-pro-api-key": this.apiKey } : {},
      });

      const data = response.data[tokenId];
      return {
        usd: data.usd,
        usd_24h_change: data.usd_24h_change,
      };
    } catch (error) {
      console.error("Error fetching token price:", error);
      throw error;
    }
  }

  async getTokenMarketData(tokenId: string): Promise<TokenMarketData> {
    try {
      const response = await axios.get(
        `${COINGECKO_API_BASE}/coins/${tokenId}`,
        {
          params: {
            localization: false,
            tickers: false,
            community_data: false,
            developer_data: false,
          },
          headers: this.apiKey ? { "x-cg-pro-api-key": this.apiKey } : {},
        }
      );

      return response.data.market_data;
    } catch (error) {
      console.error("Error fetching token market data:", error);
      throw error;
    }
  }

  async getBNBPrice(): Promise<number> {
    try {
      const price = await this.getTokenPrice("binancecoin");
      return price.usd;
    } catch (error) {
      console.error("Error fetching BNB price:", error);
      throw error;
    }
  }
}
