"use client";

import { useState } from "react";
import { FileText, ExternalLink, Copy, Edit2, Save, X } from "lucide-react";

export default function ContractPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [contractData, setContractData] = useState({
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    network: "BSC",
    deployedAt: "2024-01-01",
    bscscanUrl: "https://bscscan.com/address/0x1234567890abcdef1234567890abcdef12345678",
    rewardPerBlock: "1000000000000000000",
    bonusEndBlock: "12345678",
    depositFee: 0,
    poolLimitPerUser: "0",
    adminWallet: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    isVerified: true,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다!");
  };

  const handleSave = () => {
    console.log("Saving contract data:", contractData);
    setIsEditing(false);
    alert("컨트랙트 정보가 업데이트되었습니다!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">컨트랙트 정보</h1>
          <p className="text-neutral-500 mt-1">스마트 컨트랙트 상세 정보 및 관리</p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            편집
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              <X className="w-4 h-4" />
              취소
            </button>
          </div>
        )}
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-primary-500" />
          <h2 className="text-xl font-semibold">기본 정보</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                컨트랙트 주소
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={contractData.contractAddress}
                  onChange={(e) => setContractData({ ...contractData, contractAddress: e.target.value })}
                  disabled={!isEditing}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
                />
                <button
                  onClick={() => copyToClipboard(contractData.contractAddress)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                네트워크
              </label>
              <input
                type="text"
                value={contractData.network}
                onChange={(e) => setContractData({ ...contractData, network: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                배포 날짜
              </label>
              <input
                type="date"
                value={contractData.deployedAt}
                onChange={(e) => setContractData({ ...contractData, deployedAt: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                BSCScan URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={contractData.bscscanUrl}
                  onChange={(e) => setContractData({ ...contractData, bscscanUrl: e.target.value })}
                  disabled={!isEditing}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
                />
                <a
                  href={contractData.bscscanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Parameters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">컨트랙트 파라미터</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Reward Per Block
            </label>
            <input
              type="text"
              value={contractData.rewardPerBlock}
              onChange={(e) => setContractData({ ...contractData, rewardPerBlock: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Bonus End Block
            </label>
            <input
              type="text"
              value={contractData.bonusEndBlock}
              onChange={(e) => setContractData({ ...contractData, bonusEndBlock: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Deposit Fee (%)
            </label>
            <input
              type="number"
              value={contractData.depositFee}
              onChange={(e) => setContractData({ ...contractData, depositFee: parseInt(e.target.value) })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Pool Limit Per User
            </label>
            <input
              type="text"
              value={contractData.poolLimitPerUser}
              onChange={(e) => setContractData({ ...contractData, poolLimitPerUser: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Admin Wallet
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={contractData.adminWallet}
                onChange={(e) => setContractData({ ...contractData, adminWallet: e.target.value })}
                disabled={!isEditing}
                className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-neutral-50"
              />
              <button
                onClick={() => copyToClipboard(contractData.adminWallet)}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              검증 상태
            </label>
            <div className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-50">
              {contractData.isVerified ? (
                <span className="text-success-600 font-medium">✓ 검증됨</span>
              ) : (
                <span className="text-warning-600 font-medium">⚠ 미검증</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Checklist */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">보안 체크리스트</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
            <span className="text-success-600 text-xl">✓</span>
            <span className="text-neutral-700">컨트랙트 검증 완료</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
            <span className="text-success-600 text-xl">✓</span>
            <span className="text-neutral-700">감사 보고서 확인</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
            <span className="text-success-600 text-xl">✓</span>
            <span className="text-neutral-700">Admin 권한 설정 확인</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-warning-50 rounded-lg">
            <span className="text-warning-600 text-xl">⚠</span>
            <span className="text-neutral-700">멀티시그 지갑 설정 필요</span>
          </div>
        </div>
      </div>
    </div>
  );
}
