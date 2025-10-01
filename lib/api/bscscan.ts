import axios from "axios";

const BSCSCAN_API_BASE = "https://api.bscscan.com/api";

export interface BSCScanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  contractAddress: string;
  gasUsed: string;
  gasPrice: string;
}

export class BSCScanAPI {
  private apiKey: string;

  constructor(apiKey: string = process.env.BSCSCAN_API_KEY || "") {
    this.apiKey = apiKey;
  }

  async getContractBalance(address: string): Promise<string> {
    try {
      const response = await axios.get(BSCSCAN_API_BASE, {
        params: {
          module: "account",
          action: "balance",
          address,
          apikey: this.apiKey,
        },
      });

      return response.data.result;
    } catch (error) {
      console.error("Error fetching contract balance:", error);
      throw error;
    }
  }

  async getTransactions(
    address: string,
    startBlock: number = 0,
    endBlock: number = 99999999
  ): Promise<BSCScanTransaction[]> {
    try {
      const response = await axios.get(BSCSCAN_API_BASE, {
        params: {
          module: "account",
          action: "txlist",
          address,
          startblock: startBlock,
          endblock: endBlock,
          sort: "desc",
          apikey: this.apiKey,
        },
      });

      return response.data.result;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  async getContractABI(address: string): Promise<any> {
    try {
      const response = await axios.get(BSCSCAN_API_BASE, {
        params: {
          module: "contract",
          action: "getabi",
          address,
          apikey: this.apiKey,
        },
      });

      return JSON.parse(response.data.result);
    } catch (error) {
      console.error("Error fetching contract ABI:", error);
      throw error;
    }
  }
}
