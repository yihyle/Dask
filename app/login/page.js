import Link from "next/link";
import Image from "next/image";
import Input from "@/components/input";

export default function Login() {
  return (
    <div className="w-full bg-[#F5F5F5] dark:bg-[#0B0B0B] h-screen center">
      <div className="w-[400px] h-[460px] flex flex-col items-center dark:text-white">
        <Image src="/images/logo.svg" alt="logo" width={105} height={71} />
        <p className="text-[40px] font-bold">로그인</p>
        <p className="text-[18px] text-black/70 dark:text-white/70 mb-7">익명 게시판에 참여하세요</p>
        <form className="w-full flex flex-col items-center">
          <Input label="학번" name="studentId" required />
          <Input label="비밀번호" name="password" type="password" required />
          <input type="submit" value="로그인" className="w-full h-[40px] bg-[#05AA87] center rounded-[10px] text-[14px] text-white font-bold cursor-pointer mt-2 transition duration-300 hover:bg-[#048E71]" />
        </form>
      </div>
    </div>
  );
}