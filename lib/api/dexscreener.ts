import axios from "axios";

const DEXSCREENER_API_BASE = "https://api.dexscreener.com/latest/dex";

export interface DexPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  volume: {
    h24: number;
  };
  priceChange: {
    h24: number;
  };
}

export class DexScreenerAPI {
  async getTokenPairs(tokenAddress: string): Promise<DexPair[]> {
    try {
      const response = await axios.get(
        `${DEXSCREENER_API_BASE}/tokens/${tokenAddress}`
      );

      return response.data.pairs || [];
    } catch (error) {
      console.error("Error fetching token pairs:", error);
      throw error;
    }
  }

  async getPairByAddress(pairAddress: string): Promise<DexPair> {
    try {
      const response = await axios.get(
        `${DEXSCREENER_API_BASE}/pairs/bsc/${pairAddress}`
      );

      return response.data.pair;
    } catch (error) {
      console.error("Error fetching pair data:", error);
      throw error;
    }
  }

  async searchPairs(query: string): Promise<DexPair[]> {
    try {
      const response = await axios.get(
        `${DEXSCREENER_API_BASE}/search?q=${query}`
      );

      return response.data.pairs || [];
    } catch (error) {
      console.error("Error searching pairs:", error);
      throw error;
    }
  }
}
