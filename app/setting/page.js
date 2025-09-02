"use client";

import Link from "next/link";
import Input from "@/components/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useTheme } from "@/hooks";
import { changePassword } from "@/utils/api";

export default function Setting() {
  const router = useRouter();
  const { handleLogout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword, confirmPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("비밀번호 변경 실패: " + (err.response?.data?.message || "서버 오류"));
    }
  };

  return (
    <div className="center h-screen w-full bg-[#F5F5F5] dark:bg-[#0B0B0B]">
      <div className="mt-11 h-[570px] w-[850px] rounded-[20px] bg-white p-8 shadow-lg dark:bg-[#151515] dark:text-white">
        <div className="flex h-[30px] w-full items-center justify-between">
          <p className="text-[24px] font-bold">프로필 설정</p>
          <button onClick={handleLogout} className="rounded-[8px] border border-red-500 px-3 py-1 text-[14px] font-bold text-red-500 transition duration-200 hover:bg-red-500 hover:text-white">로그아웃</button>
        </div>
        <div className="mt-8 flex h-[386px] w-full flex-row gap-11">
          <div className="h-full w-full">
            <p className="mb-4 text-[18px] font-bold">계정 정보</p>
            <Input label="현재 비밀번호" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
            <Input label="변경할 비밀번호" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <Input label="비밀번호 확인" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="h-full w-full">
            <p className="mb-4 text-[18px] font-bold">설정</p>
            <div className="flex h-[40px] w-full items-center justify-between">
              <p className="text-[14px]">다크모드</p>
              <button onClick={toggleTheme} className={`flex h-6 w-12 items-center rounded-full p-1 transition-colors duration-100 ${isDark ? "bg-[#05AA87]" : "bg-gray-300"}`}>
                <div className={`h-4 w-4 rounded-full bg-white transition duration-100 ${isDark ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3 flex h-[45px] w-full flex-row items-center">
          <div className="ml-auto flex h-full w-[202px] flex-row items-center justify-center gap-4">
            <Link href="/" className="center h-full w-[80px] cursor-pointer rounded-[10px] border-[1px] border-black/30 transition duration-200 hover:bg-[#ECECEC] dark:hover:bg-[#1E1E1E]">
              <p className="text-[14px]">취소</p>
            </Link>
            <button onClick={handleSave} className="center h-full w-[100px] cursor-pointer rounded-[10px] bg-[#05AA87] transition duration-200 hover:bg-[#028B6E]">
              <p className="text-[14px] font-bold text-white">설정 저장</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
