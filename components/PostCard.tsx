import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types";
import { formatNumber, getCategoryColor, truncateText } from "@/utils";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
    <Link href={`/board/${post.id}`} className="block">
      <article className="w-[1250px] h-[190px] bg-white flex flex-col justify-center rounded-[20px] shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer gap-4 group">
        <div className="w-full h-[25px] flex flex-row items-center gap-3">
          <div className={`w-[40px] h-[25px] ${getCategoryColor(post.category)} rounded-[60px] center ml-6`}>
            <p className="text-[10px] font-semibold text-white">{post.category}</p>
          </div>
          <p className="text-[14px] text-black/50">
            {post.nickname} - {post.time}
          </p>
        </div>

        <div className="w-full h-[27px] flex flex-row items-center">
          <h3 className="text-[22px] text-black font-bold ml-7 group-hover:text-[#05AA87] transition-colors duration-200">
            {truncateText(post.title, 50)}
          </h3>
        </div>

        <div className="w-full h-[22px] flex flex-row items-center">
          <p className="text-[18px] text-black/70 ml-7">
            {truncateText(post.content, 60)}
          </p>
        </div>

        <div className="w-full h-[15px] flex flex-row items-center gap-5 ml-7">
          <div className="w-auto h-full flex flex-row items-center gap-1">
            <Image 
              src="/images/view.svg" 
              alt="조회수" 
              width={17} 
              height={11} 
              className="opacity-70"
            />
            <p className="text-[12px] text-black/70">{formatNumber(post.views)}</p>
          </div>
          
          <div className="w-auto h-full flex flex-row items-center gap-1">
            <Image 
              src="/images/like.svg" 
              alt="좋아요" 
              width={17} 
              height={11} 
              className="opacity-70"
            />
            <p className="text-[12px] text-black/70">{formatNumber(post.likes)}</p>
          </div>
          
          <div className="w-auto h-full flex flex-row items-center gap-1">
            <Image 
              src="/images/comment.svg" 
              alt="댓글" 
              width={17} 
              height={11} 
              className="opacity-70"
            />
            <p className="text-[12px] text-black/70">{formatNumber(post.comments)}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
