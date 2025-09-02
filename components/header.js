"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";

export default function Header() {
  const menu = [
    { name: "홈", path: "/" },
    { name: "게시판", path: "/board" },
    { name: "설정", path: "/setting" },
  ];

  const { isLogin, nickname, handleLogout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="w-screen h-[80px] backdrop-blur-sm bg-white/70 dark:bg-black/50 border-b border-b-black/30 dark:border-b-white/20 center flex-row fixed gap-[700px] z-[1]">
      <Link href="/" className="w-[130px] h-full center flex-row gap-2 cursor-pointer">
        <Image src="/images/logo.svg" alt="logo" width={37} height={25} />
        <p className="text-[32px] font-bold">Dask</p>
      </Link>
      <div className="w-[500px] h-full center flex-row gap-[55px]">
        <div className="w-[220px] h-full center flex-row gap-[55px]">
          {
            menu.map((a) => (
              <Link key={a.name} href={a.path} className="text-[20px] text-black/30 dark:text-white/60 transition transform duration-300 hover:text-[#05AA87]">
                {a.name}
              </Link>
            ))
          }
        </div>
        <div className="w-[1px] h-[40px] bg-black/30" />
        {
          isLogin ? (
            <div className="w-[170px] h-full center flex-row gap-1">
              <p className="text-[20px] font-bold text-[#05AA87]">{nickname}</p>
              <p className="text-[20px]">님 환영합니다!</p>
            </div>
          ) : (
            <Link href="/login">
              <div className="w-[105px] h-[50px] bg-[#05AA87] center rounded-[60px] cursor-pointer border-[2px] border-[#05AA87] transition duration-300 hover:bg-white group">
                <span className="text-[20px] font-bold text-white transition duration-300 group-hover:text-[#05AA87] dark:group-hover:text-[#05AA87]">
                  로그인
                </span>
              </div>
            </Link>
          )
        }
      </div>
    </div>
  );
}
