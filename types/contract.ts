export interface ContractInfo {
  id: number;
  contractAddress: string;
  network: string;
  deployedAt?: Date;
  bscscanUrl?: string;
  rewardPerBlock?: string;
  bonusEndBlock?: bigint;
  depositFee: number;
  poolLimitPerUser: bigint;
  adminWallet?: string;
  isVerified: boolean;
  updatedAt: Date;
}
