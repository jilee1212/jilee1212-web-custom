"use client";

import { useState, useEffect } from "react";
import { FileText, ExternalLink, Copy, Edit2, Save, X, Wallet, Plus, Trash2 } from "lucide-react";
import axios from "axios";

interface ContractInfo {
  id?: number;
  name?: string;
  contractType?: string;
  contractAddress: string;
  network: string;
  deployedAt?: string;
  bscscanUrl?: string;
  rewardPerBlock?: string;
  bonusEndBlock?: string;
  depositFee: number;
  poolLimitPerUser?: string;
  adminWallet?: string;
  isVerified: boolean;
  notes?: string;
}

interface WalletInfo {
  id?: number;
  name: string;
  address: string;
  type: string;
  purpose?: string;
  network: string;
  isActive: boolean;
  notes?: string;
}

interface DeploymentParam {
  id?: number;
  parameterName: string;
  parameterValue: string;
  description?: string;
  category?: string;
}

export default function ContractPage() {
  const [contracts, setContracts] = useState<ContractInfo[]>([]);
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [deploymentParams, setDeploymentParams] = useState<DeploymentParam[]>([]);
  
  const [isEditingContract, setIsEditingContract] = useState(false);
  const [selectedContract, setSelectedContract] = useState<ContractInfo | null>(null);
  const [isAddingContract, setIsAddingContract] = useState(false);
  
  const [isAddingWallet, setIsAddingWallet] = useState(false);
  const [newWallet, setNewWallet] = useState<WalletInfo>({
    name: "",
    address: "",
    type: "Deployment",
    network: "BSC",
    isActive: true,
  });

  const [isAddingParam, setIsAddingParam] = useState(false);
  const [newParam, setNewParam] = useState<DeploymentParam>({
    parameterName: "",
    parameterValue: "",
    category: "Staking",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contractsRes, walletsRes, paramsRes] = await Promise.all([
        axios.get("/api/contract"),
        axios.get("/api/wallets"),
        axios.get("/api/deployment-params"),
      ]);
      setContracts(contractsRes.data || []);
      setWallets(walletsRes.data || []);
      setDeploymentParams(paramsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다!");
  };

  const handleSaveContract = async () => {
    try {
      if (selectedContract?.id) {
        await axios.put("/api/contract", selectedContract);
      } else if (isAddingContract && selectedContract) {
        await axios.post("/api/contract", selectedContract);
        setIsAddingContract(false);
      }
      setIsEditingContract(false);
      setSelectedContract(null);
      fetchData();
      alert("컨트랙트 정보가 저장되었습니다!");
    } catch (error) {
      console.error("Error saving contract:", error);
      alert("컨트랙트 저장 중 오류가 발생했습니다.");
    }
  };

  const handleAddWallet = async () => {
    try {
      await axios.post("/api/wallets", newWallet);
      setIsAddingWallet(false);
      setNewWallet({
        name: "",
        address: "",
        type: "Deployment",
        network: "BSC",
        isActive: true,
      });
      fetchData();
      alert("지갑이 추가되었습니다!");
    } catch (error) {
      console.error("Error adding wallet:", error);
      alert("지갑 추가 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteWallet = async (id: number) => {
    if (!confirm("이 지갑을 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/api/wallets/${id}`);
      fetchData();
      alert("지갑이 삭제되었습니다!");
    } catch (error) {
      console.error("Error deleting wallet:", error);
      alert("지갑 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleAddParam = async () => {
    try {
      await axios.post("/api/deployment-params", newParam);
      setIsAddingParam(false);
      setNewParam({
        parameterName: "",
        parameterValue: "",
        category: "Staking",
      });
      fetchData();
      alert("파라미터가 추가되었습니다!");
    } catch (error) {
      console.error("Error adding parameter:", error);
      alert("파라미터 추가 중 오류가 발생했습니다.");
    }
  };

  const startAddingContract = () => {
    setIsAddingContract(true);
    setIsEditingContract(true);
    setSelectedContract({
      name: "",
      contractType: "Staking",
      contractAddress: "",
      network: "BSC",
      depositFee: 0,
      isVerified: false,
    });
  };

  const startEditingContract = (contract: ContractInfo) => {
    setIsEditingContract(true);
    setSelectedContract({ ...contract });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">컨트랙트 & 지갑 관리</h1>
          <p className="text-neutral-500 mt-1">스마트 컨트랙트 및 지갑 정보 관리</p>
        </div>
      </div>

      {/* Contracts Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold">컨트랙트 목록</h2>
          </div>
          <button
            onClick={startAddingContract}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            컨트랙트 추가
          </button>
        </div>

        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{contract.name || "Unnamed Contract"}</h3>
                    {contract.isVerified && (
                      <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded">검증됨</span>
                    )}
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                      {contract.contractType || "General"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-neutral-500">주소: </span>
                      <span className="font-mono">{contract.contractAddress.slice(0, 10)}...{contract.contractAddress.slice(-8)}</span>
                      <button
                        onClick={() => copyToClipboard(contract.contractAddress)}
                        className="ml-2 text-primary-600 hover:text-primary-700"
                      >
                        <Copy className="w-3 h-3 inline" />
                      </button>
                    </div>
                    <div>
                      <span className="text-neutral-500">네트워크: </span>
                      <span>{contract.network}</span>
                    </div>
                    {contract.adminWallet && (
                      <div>
                        <span className="text-neutral-500">관리자: </span>
                        <span className="font-mono">{contract.adminWallet.slice(0, 10)}...{contract.adminWallet.slice(-8)}</span>
                      </div>
                    )}
                    {contract.rewardPerBlock && (
                      <div>
                        <span className="text-neutral-500">보상/블록: </span>
                        <span>{contract.rewardPerBlock}</span>
                      </div>
                    )}
                  </div>
                  {contract.notes && (
                    <p className="mt-2 text-sm text-neutral-600">{contract.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => startEditingContract(contract)}
                  className="ml-4 p-2 text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {contracts.length === 0 && (
            <p className="text-center text-neutral-500 py-8">등록된 컨트랙트가 없습니다.</p>
          )}
        </div>
      </div>

      {/* Contract Edit Modal */}
      {isEditingContract && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {isAddingContract ? "컨트랙트 추가" : "컨트랙트 편집"}
              </h2>
              <button
                onClick={() => {
                  setIsEditingContract(false);
                  setIsAddingContract(false);
                  setSelectedContract(null);
                }}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    컨트랙트 이름 *
                  </label>
                  <input
                    type="text"
                    value={selectedContract.name || ""}
                    onChange={(e) => setSelectedContract({ ...selectedContract, name: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="예: LUMINA Flexible Staking Pool"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    컨트랙트 타입
                  </label>
                  <select
                    value={selectedContract.contractType || "Staking"}
                    onChange={(e) => setSelectedContract({ ...selectedContract, contractType: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Staking">Staking</option>
                    <option value="Router">Router</option>
                    <option value="Factory">Factory</option>
                    <option value="Token">Token</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    컨트랙트 주소 *
                  </label>
                  <input
                    type="text"
                    value={selectedContract.contractAddress}
                    onChange={(e) => setSelectedContract({ ...selectedContract, contractAddress: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                    placeholder="0x..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    네트워크
                  </label>
                  <input
                    type="text"
                    value={selectedContract.network}
                    onChange={(e) => setSelectedContract({ ...selectedContract, network: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    배포 날짜
                  </label>
                  <input
                    type="date"
                    value={selectedContract.deployedAt || ""}
                    onChange={(e) => setSelectedContract({ ...selectedContract, deployedAt: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    BSCScan URL
                  </label>
                  <input
                    type="text"
                    value={selectedContract.bscscanUrl || ""}
                    onChange={(e) => setSelectedContract({ ...selectedContract, bscscanUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://bscscan.com/address/0x..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Reward Per Block
                  </label>
                  <input
                    type="text"
                    value={selectedContract.rewardPerBlock || ""}
                    onChange={(e) => setSelectedContract({ ...selectedContract, rewardPerBlock: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                    placeholder="1000000000000000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Bonus End Block
                  </label>
                  <input
                    type="text"
                    value={selectedContract.bonusEndBlock || ""}
                    onChange={(e) => setSelectedContract({ ...selectedContract, bonusEndBlock: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="78000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Deposit Fee (%)
                  </label>
                  <input
                    type="number"
                    value={selectedContract.depositFee}
                    onChange={(e) => setSelectedContract({ ...selectedContract, depositFee: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Pool Limit Per User
                  </label>
                  <input
                    type="text"
                    value={selectedContract.poolLimitPerUser || "0"}
                    onChange={(e) => setSelectedContract({ ...selectedContract, poolLimitPerUser: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0 (무제한)"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Admin Wallet
                  </label>
                  <input
                    type="text"
                    value={selectedContract.adminWallet || ""}
                    onChange={(e) => setSelectedContract({ ...selectedContract, adminWallet: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                    placeholder="0x..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    메모
                  </label>
                  <textarea
                    value={selectedContract.notes || ""}
                    onChange={(e) => setSelectedContract({ ...selectedContract, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="추가 정보나 중요한 메모를 입력하세요..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isVerified"
                    checked={selectedContract.isVerified}
                    onChange={(e) => setSelectedContract({ ...selectedContract, isVerified: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="isVerified" className="text-sm font-medium text-neutral-700">
                    컨트랙트 검증 완료
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveContract}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>
                <button
                  onClick={() => {
                    setIsEditingContract(false);
                    setIsAddingContract(false);
                    setSelectedContract(null);
                  }}
                  className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wallets Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold">지갑 목록</h2>
          </div>
          <button
            onClick={() => setIsAddingWallet(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            지갑 추가
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">이름</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">주소</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">타입</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">용도</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">상태</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-neutral-700">작업</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet) => (
                <tr key={wallet.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 text-sm font-medium">{wallet.name}</td>
                  <td className="py-3 px-4 text-sm font-mono">
                    {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="ml-2 text-primary-600 hover:text-primary-700"
                    >
                      <Copy className="w-3 h-3 inline" />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                      {wallet.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-600">{wallet.purpose || "-"}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 text-xs rounded ${
                      wallet.isActive 
                        ? "bg-success-100 text-success-700" 
                        : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {wallet.isActive ? "활성" : "비활성"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteWallet(wallet.id!)}
                      className="p-1 text-error-600 hover:bg-error-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {wallets.length === 0 && (
            <p className="text-center text-neutral-500 py-8">등록된 지갑이 없습니다.</p>
          )}
        </div>
      </div>

      {/* Wallet Add Modal */}
      {isAddingWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">지갑 추가</h2>
              <button
                onClick={() => setIsAddingWallet(false)}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    지갑 이름 *
                  </label>
                  <input
                    type="text"
                    value={newWallet.name}
                    onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="예: Dev Fund Wallet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    지갑 타입 *
                  </label>
                  <select
                    value={newWallet.type}
                    onChange={(e) => setNewWallet({ ...newWallet, type: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Deployment">Deployment</option>
                    <option value="Admin">Admin</option>
                    <option value="Treasury">Treasury</option>
                    <option value="Fee">Fee</option>
                    <option value="Ownership">Ownership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    지갑 주소 *
                  </label>
                  <input
                    type="text"
                    value={newWallet.address}
                    onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                    placeholder="0x..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    네트워크
                  </label>
                  <input
                    type="text"
                    value={newWallet.network}
                    onChange={(e) => setNewWallet({ ...newWallet, network: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    상태
                  </label>
                  <select
                    value={newWallet.isActive ? "active" : "inactive"}
                    onChange={(e) => setNewWallet({ ...newWallet, isActive: e.target.value === "active" })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    용도
                  </label>
                  <input
                    type="text"
                    value={newWallet.purpose || ""}
                    onChange={(e) => setNewWallet({ ...newWallet, purpose: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="지갑의 용도를 간단히 설명하세요"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    메모
                  </label>
                  <textarea
                    value={newWallet.notes || ""}
                    onChange={(e) => setNewWallet({ ...newWallet, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="추가 정보나 중요한 메모를 입력하세요..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddWallet}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>
                <button
                  onClick={() => setIsAddingWallet(false)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deployment Parameters Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">배포 파라미터</h2>
          <button
            onClick={() => setIsAddingParam(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            파라미터 추가
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deploymentParams.map((param) => (
            <div key={param.id} className="border border-neutral-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{param.parameterName}</h4>
                    {param.category && (
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded">
                        {param.category}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono text-neutral-700 break-all">{param.parameterValue}</p>
                  {param.description && (
                    <p className="text-xs text-neutral-500 mt-2">{param.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {deploymentParams.length === 0 && (
            <p className="col-span-2 text-center text-neutral-500 py-8">등록된 파라미터가 없습니다.</p>
          )}
        </div>
      </div>

      {/* Parameter Add Modal */}
      {isAddingParam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">파라미터 추가</h2>
              <button
                onClick={() => setIsAddingParam(false)}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    파라미터 이름 *
                  </label>
                  <input
                    type="text"
                    value={newParam.parameterName}
                    onChange={(e) => setNewParam({ ...newParam, parameterName: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="예: _rewardPerBlock"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    파라미터 값 *
                  </label>
                  <input
                    type="text"
                    value={newParam.parameterValue}
                    onChange={(e) => setNewParam({ ...newParam, parameterValue: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                    placeholder="예: 1000000000000000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={newParam.category || "Staking"}
                    onChange={(e) => setNewParam({ ...newParam, category: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Staking">Staking</option>
                    <option value="Router">Router</option>
                    <option value="Factory">Factory</option>
                    <option value="Token">Token</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    설명
                  </label>
                  <textarea
                    value={newParam.description || ""}
                    onChange={(e) => setNewParam({ ...newParam, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="파라미터에 대한 설명을 입력하세요..."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddParam}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>
                <button
                  onClick={() => setIsAddingParam(false)}
                  className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
