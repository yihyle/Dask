import Image from "next/image";
import Link from "next/link";

export default function Postcard({ post }) {
  if (!post) {
    return (
      <div className="w-[1250px] h-[190px] bg-gray-100 flex flex-col justify-center rounded-[20px] shadow-lg">
        <div className="text-center text-gray-500">
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/board/${post.id}`}>
      <div className="w-[1250px] h-[190px] bg-white dark:bg-[#151515] dark:text-white flex flex-col justify-center rounded-[20px] shadow-lg transition transform duration-300 hover:shadow-xl cursor-pointer gap-4 border border-transparent dark:border-white/10">
        <div className="w-full h-[25px] flex flex-row items-center gap-3">
          <div className="w-[40px] h-[25px] bg-[#00CF9E] rounded-[60px] center ml-6">
            <p className="text-[10px] font-semibold text-white">{post.category}</p>
          </div>
          <p className="text-[14px] text-black/50 dark:text-white/60">익명 - {post.time}</p>
        </div>

        <div className="w-full h-[27px] flex flex-row items-center">
          <p className="text-[22px] text-black dark:text-white font-bold ml-7">{post.title}</p>
        </div>

        <div className="w-[50%] h-[22px] flex flex-row items-center">
          <p className="text-[18px] text-black/70 dark:text-white/80 ml-7 overflow-hidden text-ellipsis whitespace-nowrap">{post.content}</p>
        </div>

        <div className="w-full h-[15px] flex flex-row items-center">
          <div className="w-auto h-full flex flex-row items-center gap-1 ml-7">
            <Image src="/images/view.svg" alt="views" width={17} height={11} className="opacity-70"/>
            <p className="text-[12px] text-black/70 dark:text-white/80">{post.views}</p>
          </div>
          <div className="w-auto h-full flex flex-row items-center gap-1 ml-5">
            <Image src="/images/like.svg" alt="likes" width={17} height={11} className="opacity-70"/>
            <p className="text-[12px] text-black/70 dark:text-white/80">{post.likes}</p>
          </div>
          <div className="w-auto h-full flex flex-row items-center gap-1 ml-5">
            <Image src="/images/comment.svg" alt="comments" width={17} height={11} className="opacity-70"/>
            <p className="text-[12px] text-black/70 dark:text-white/80">{post.comments}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
