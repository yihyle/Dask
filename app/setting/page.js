"use client";

import Link from "next/link";
import Image from "next/image";
import Input from "@/components/input";
import { useState } from "react";

export default function Setting() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="w-full bg-[#F5F5F5] h-screen center">
      <div className="w-[850px] h-[620px] rounded-[20px] bg-white shadow-lg mt-11 p-8">
        <div className="w-full h-[30px] flex items-center">
          <p className="text-[24px] font-bold">프로필 설정</p>
        </div>
        <div className="w-full h-[386px] flex flex-row mt-8 gap-11">
          <div className="w-full h-full">
            <p className="text-[18px] font-bold mb-4">계정 정보</p>
            <Input label="기본 익명 닉네임" name="studentId" required />
            <Input label="현재 비밀번호" name="studentId" type="password" required />
            <Input label="변경할 비밀번호" name="studentId" type="password" required />
            <Input label="비밀번호 확인" name="studentId" type="password" required />
          </div>
          <div className="w-full h-full">
            <p className="text-[18px] font-bold mb-4">설정</p>
            <div className="w-full h-[40px] flex items-center justify-between">
              <p className="text-[14px]">다크모드</p>
              <button
                onClick={handleToggle}
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors duration-100 ${
                  isOn ? "bg-[#05AA87]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transform transition duration-100 ${
                    isOn ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[45px] flex flex-row items-center mt-[50px]">
          <div className="w-[202px] h-full center flex-row gap-4 ml-auto">
            <div className="w-[80px] h-full border-[1px] border-black/30 rounded-[10px] center cursor-pointer transition duration-200 hover:bg-[#ECECEC]">
              <p className="text-[14px]">취소</p>
            </div>
            <div className="w-[100px] h-full rounded-[10px] center bg-[#05AA87] cursor-pointer transition duration-200 hover:bg-[#028B6E]">
              <p className="text-[14px] font-bold text-white">설정 저장</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}