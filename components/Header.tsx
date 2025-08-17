import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { MenuItem, User } from "@/types";
import { APP_CONFIG } from "@/constants";
import Button from "./ui/Button";

const Header: React.FC = () => {
  const menu: MenuItem[] = [
    { name: "홈", path: "/" },
    { name: "게시판", path: "/board" },
    { name: "설정", path: "/setting" },
  ];

  const user: User = {
    isLogin: false,
    nickname: "2219"
  };

  return (
    <header className="w-screen h-[80px] backdrop-blur-sm bg-white/70 border-b border-b-black/30 center flex-row fixed gap-[700px] z-[1]">
      <Link href="/" className="w-[130px] h-full center flex-row gap-2 cursor-pointer">
        <Image 
          src="/images/logo.svg" 
          alt={`${APP_CONFIG.name} 로고`} 
          width={37} 
          height={25} 
          priority
        />
        <p className="text-[32px] font-bold">{APP_CONFIG.name}</p>
      </Link>
      
      <div className="w-[500px] h-full center flex-row gap-[55px]">
        <nav className="w-[220px] h-full center flex-row gap-[55px]">
          {menu.map((item) => (
            <Link 
              key={item.name} 
              href={item.path} 
              className="text-[20px] text-black/30 transition transform duration-300 hover:text-[#05AA87] focus:text-[#05AA87] focus:outline-none"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="w-[1px] h-[40px] bg-black/30" />
        
        {user.isLogin ? (
          <div className="w-[170px] h-full center flex-row gap-1">
            <p className="text-[20px] font-bold text-[#05AA87]">{user.nickname}</p>
            <p className="text-[20px]">님 환영합니다!</p>
          </div>
        ) : (
          <Link href="/login">
            <Button 
              variant="primary" 
              size="md"
              className="w-[105px] h-[50px] rounded-[60px] border-[2px] border-[#05AA87] hover:bg-white hover:text-[#05AA87] group"
            >
              로그인
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
