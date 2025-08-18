import Link from "next/link";
import Image from "next/image";

export default function New() {

  return (
    <div className="w-full bg-[#F5F5F5] dark:bg-[#0B0B0B] h-screen center">
      <div className="w-[850px] h-[655px] rounded-[20px] bg-white dark:bg-[#151515] dark:text-white shadow-lg mt-11 p-8 border border-transparent dark:border-white/10">

        {/* 제목 라인 */}
        <div className="w-full h-[30px] flex items-center">
          <p className="text-[24px] font-bold">게시글 작성</p>
        </div>

        {/* 첫번째 라인 */}
        <div className="w-full h-[70px] mt-8 flex flex-row items-center justify-center">
          <div className="w-full h-[70px] flex flex-col justify-center mb-4">
            <p className="text-[14px] text-black/70 dark:text-white/70 mb-1">카테고리</p>
            <div className="relative inline-block w-[365px]">
              <select defaultValue="" className="appearance-none w-full h-[47px] border border-[#D7D7D7] dark:border-[#2A2A2A] rounded-[10px] pl-4 pr-10 bg-white dark:bg-[#1E1E1E] focus:outline-none focus:border-[#05AA87] cursor-pointer">
                <option value="" disabled>카테고리 선택</option>
                <option value="all">전체</option>
                <option value="free">자유</option>
                <option value="question">질문</option>
              </select>
              <img src="/images/under.svg" alt="화살표" className="pointer-events-none w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="w-full h-[70px] flex flex-col justify-center mb-4">
            <p className="text-[14px] text-black/70 dark:text-white/70 mb-1">익명 닉네임</p>
            <input className="w-full h-[47px] rounded-[10px] bg-white dark:bg-[#1E1E1E] border border-[#D7D7D7] dark:border-[#2A2A2A] focus:outline-none focus:border-[#05AA87] pl-4 pr-4" />
          </div>
        </div>

        {/* 두번째 라인 */}
        <div className="w-full h-[340px] center flex-col mt-8 gap-4">
          <div className="w-full h-[70px] flex flex-col justify-center mb-4">
            <p className="text-[14px] text-black/70 dark:text-white/70 mb-1">제목</p>
            <input className="w-full h-[47px] rounded-[10px] bg-white dark:bg-[#1E1E1E] border border-[#D7D7D7] dark:border-[#2A2A2A] focus:outline-none focus:border-[#05AA87] pl-4 pr-4" placeholder="제목을 입력하세요" />
          </div>
          <div className="w-full h-auto flex flex-col justify-center mb-4">
            <p className="text-[14px] text-black/70 dark:text-white/70 mb-1">내용</p>
            <textarea className="w-full h-[215px] rounded-[10px] bg-white dark:bg-[#1E1E1E] border border-[#D7D7D7] dark:border-[#2A2A2A] focus:outline-none focus:border-[#05AA87] pl-4 pr-4 py-2 resize-none" placeholder="내용을 입력하세요" />
          </div>
        </div>

        {/* 버튼 라인 */}
        <div className="w-full h-[45px] flex flex-row items-center mt-[35px]">
          <div className="w-[202px] h-full center flex-row gap-4 ml-auto">
            <div className="w-[80px] h-full border-[1px] border-black/30 dark:border-white/30 rounded-[10px] center cursor-pointer transition duration-200 hover:bg-[#ECECEC] dark:hover:bg-[#1E1E1E]">
              <p className="text-[14px]">취소</p>
            </div>
            <div className="w-[100px] h-full rounded-[10px] center bg-[#05AA87] cursor-pointer transition duration-200 hover:bg-[#028B6E]">
              <p className="text-[14px] font-bold text-white">게시하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}