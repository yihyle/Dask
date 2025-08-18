import Link from "next/link";
import Postcard from "@/components/postcard";

// Sample posts for the main page
const samplePosts = [
  {
    id: 1,
    category: "자유",
    nickname: "익명의 닉네임",
    time: "11시간 전",
    title: "테스트 제목",
    content: "테스트 내용입니다. 나중에 더 기능을 추가하세요.",
    views: 69,
    likes: 1212,
    comments: 102039,
  },
  {
    id: 2,
    category: "질문",
    nickname: "니엄마동석",
    time: "2시간 전",
    title: "범죄도시 보신분",
    content: "마동석 죽음",
    views: 150,
    likes: 40,
    comments: 12,
  },
  {
    id: 3,
    category: "자유",
    nickname: "익명의 닉네임",
    time: "5시간 전",
    title: "샘플 게시글",
    content: "메인 페이지용 샘플 게시글입니다.",
    views: 89,
    likes: 23,
    comments: 5,
  },
];

export default function Home() {
  return (
    <div className="w-full h-[2945px] flex items-center bg-[#F5F5F5] dark:bg-[#0B0B0B] flex-col gap-[170px]">
      <div className="w-[1330px] h-[600px] flex flex-col justify-center pl-[80px] bg-gradient-to-br from-[#00CF9E] to-[#05AA87] rounded-[20px] mt-[170px] relative overflow-hidden shadow-xl">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl z-0" />
        <p className="text-[64px] text-white font-extrabold leading-tight z-10 animate-fade-in-up">Dask</p>
        <p className="text-[26px] text-white mb-10 z-10 animate-fade-in-up delay-100">자유롭고 안전한 소통 공간</p>
        <Link href="/board" passHref>
          <div className="w-[200px] h-[50px] bg-white rounded-[12px] center text-[#05AA87] text-[18px] font-bold shadow-md hover:bg-[#ebebeb] transition duration-300 cursor-pointer z-10">
            게시판 둘러보기
          </div>
        </Link>
      </div>
      <div className="w-[1330px] h-[830px] flex flex-col items-center bg-white dark:bg-[#151515] dark:text-white rounded-[20px] shadow-lg p-11 gap-11 border border-transparent dark:border-white/10">
        <div className="w-full h-[30px] center gap-[1050px]">
          <p className="text-[23px] font-semibold">🔥 인기 게시글</p>
          <Link href={"/board"} className="text-[20px] text-[#05AA87] font-semibold">더보기</Link>
        </div>
        {samplePosts.slice(0, 3).map(post => (
          <Postcard key={post.id} post={post} />
        ))}
      </div>
      <div className="w-[1330px] h-[830px] flex flex-col items-center bg-white dark:bg-[#151515] dark:text-white rounded-[20px] shadow-lg p-11 gap-11 border border-transparent dark:border-white/10">
        <div className="w-full h-[30px] center gap-[1050px]">
          <p className="text-[23px] font-semibold">🕒 최근 게시글</p>
          <Link href={"/board"} className="text-[20px] text-[#05AA87] font-semibold">더보기</Link>
        </div>
        {samplePosts.slice(0, 3).map(post => (
          <Postcard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}