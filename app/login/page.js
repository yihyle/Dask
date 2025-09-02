"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/input";
import { useRouter } from "next/navigation";
import { login } from "@/utils/api";

export default function Login() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(studentId, password);

      console.log("로그인 성공:", res);

      if (res.access_token) {
        localStorage.setItem("accessToken", res.access_token);
        const nickname = (studentId || "").slice(-4);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("nickname", nickname);

        window.dispatchEvent(new CustomEvent('authStateChanged'));
        
        router.replace("/");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인에 실패했습니다. 아이디/비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="w-full bg-[#F5F5F5] dark:bg-[#0B0B0B] h-screen center">
      <div className="w-[400px] h-[460px] flex flex-col items-center dark:text-white">
        <Image src="/images/logo.svg" alt="logo" width={105} height={71} />
        <p className="text-[40px] font-bold">로그인</p>
        <p className="text-[18px] text-black/70 dark:text-white/70 mb-7">익명 게시판에 참여하세요</p>
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
          <Input label="학번" name="studentId" required value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <Input label="비밀번호" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" value="로그인" className="w-full h-[40px] bg-[#05AA87] center rounded-[10px] text-[14px] text-white font-bold cursor-pointer mt-2 transition duration-300 hover:bg-[#048E71]" />
        </form>
      </div>
    </div>
  );
}