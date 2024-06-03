import React, { useState, useEffect, ChangeEvent } from "react";
import { GetStaticProps } from "next";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { useResponsive } from "../../lib/useMediaQuery";
import { debounce } from "lodash";

interface List {
  id: number;
  title: string;
  content: string;
  image: null | string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

interface Writer {
  id: number;
  nickname: string;
}

interface BoardsProps {
  articles: List[];
}

interface bestArticle extends List {}

const Boards: React.FC<BoardsProps> = ({ articles: initialArticles }) => {
  const [articles, setArticles] = useState<List[]>(initialArticles);
  const [originalArticles, setOriginalArticles] =
    useState<List[]>(initialArticles);
  const [bestArticles, setBestArticles] = useState<bestArticle[]>([]);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {
    if (articles.length === 0) return;
    const sortedArticles = [...articles].sort(
      (a, b) => b.likeCount - a.likeCount
    );
    setBestArticles(sortedArticles.slice(0, 3));
  }, [articles]);

  const handleSortChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const response = await axiosInstance.get(
      `/articles?page=1&pageSize=10&orderBy=${value}`
    );
    setArticles(response.data.list);
  };

  const itemsToShow = isMobile ? 1 : isTablet ? 2 : 3;

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isEmptyValue = value === "";

    if (isEmptyValue) {
      setArticles(originalArticles);
      return;
    }

    const filteredArticles = originalArticles.filter(article =>
      article.title.toLowerCase().includes(value.toLowerCase())
    );
    setArticles(filteredArticles);
  }, 1000);

  return (
    <div className="container m-auto w-[343px] md:w-[696px] xl:w-[1200px]">
      <h2 className="font-bold text-fs-20 mb-4">베스트 게시글</h2>
      {/* 베스트 게시글 영역 */}
      <div className="flex gap-4 xl:gap-6">
        {bestArticles.slice(0, itemsToShow).map(article => {
          return (
            <div key={article.id}>
              <div className="w-[343px] xl:w-[384px] h-[167px] px-[24px] pb-[16px] rounded-[8px] bg-cool-gary-50 flex flex-col justify-between">
                <div className="bg-bland-blue w-[102px] h-[30px] rounded-bottom flex justify-center items-center gap-1 text-white font-semibold">
                  <Image
                    src={"/ic_best.svg"}
                    width={16}
                    height={16}
                    alt="메달 아이콘"
                  />
                  <span>Best</span>
                </div>
                <div className="flex gap-2 flex-between ">
                  <div className="font-semibold text-lg leading-5 text-clip w-[212px]  h-[72px]">
                    {article.title}
                  </div>
                  {article.image ? (
                    <div className="rounded-lg bg-white w-[72px] h-[72px] flex items-center justify-center border border-cool-gary-200">
                      <Image
                        className="object-contain"
                        src={article.image}
                        alt="첨부이미지"
                        width={48}
                        height={42}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between gap-2">
                  <p>{article.writer.nickname}</p>
                  <p className="flex-auto flex gap-1">
                    <Image
                      src="/ic_heart.svg"
                      alt="하트아이콘"
                      width={16}
                      height={16}
                    />
                    {article.likeCount}
                  </p>
                  <p className="text-cool-gary-400">
                    {new Date(article.updatedAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 게시글 영역 */}
      <div className="container flex justify-between items-center mt-10 mb-4">
        <h2 className="font-bold text-fs-20">게시글</h2>
        <button className="w-btn-width h-btn-height bg-bland-blue rounded-lg text-white font-semibold">
          글쓰기
        </button>
      </div>
      <div className="container flex justify-between items-center mb-6 relative">
        <Image
          className="absolute left-4"
          src={"/ic_search.svg"}
          alt="검색아이콘"
          width={24}
          height={24}
        />
        <input
          className="w-[293px] md:w-[560px] xl:w-[1054px] h-[42px] rounded-2xl bg-cool-gary-100 py-4 pl-11"
          placeholder="검색할 상품을 입력해주세요."
          onChange={handleInputChange}
        />
        {isMobile ? (
          <Image src={"/ic_sort.svg"} alt="정렬아이콘" width={42} height={42} />
        ) : (
          <div>
            <select
              onChange={handleSortChange}
              className="rounded-lg border pl-5 w-[130px] h-[42px] appearance-none relative"
            >
              <option value="recent">최신순</option>
              <option value="like">좋아요순</option>
            </select>
            <Image
              className="absolute top-2 right-5"
              src={"/ic_arrow.svg"}
              alt="화살표아이콘"
              width={24}
              height={24}
            />
          </div>
        )}
      </div>
      {/* 게시글 리스트 영역 */}
      <ul>
        {articles.map(article => (
          <li
            className="w-[343px] md:w-[696px] xl:w-[1200px] h-[136px] border-b mt-6 justify-between flex flex-col pb-6"
            key={article.id}
          >
            <div className="flex justify-between gap-2">
              <p className="text-clip w-[263px] h-[72px] flex-auto font-semibold text-lg leading-5">
                {article.title}
              </p>
              {article.image ? (
                <div className="rounded-lg bg-white w-[72px] h-[72px] flex items-center justify-center border border-cool-gary-200">
                  <Image
                    src={article.image}
                    alt={"첨부이미지"}
                    width={48}
                    height={42}
                  />
                </div>
              ) : null}
            </div>
            <div className="flex justify-between items-center gap-2">
              <Image
                src={"/ic_profile.svg"}
                alt="프로필이미지"
                width={24}
                height={24}
              />
              <p>{article.writer.nickname}</p>
              <p className="flex-auto text-cool-gary-400">
                {new Date(article.updatedAt).toLocaleDateString()}
              </p>
              <div className="w-[82px] flex justify-end gap-2">
                <Image
                  src="/ic_heart.svg"
                  alt="하트아이콘"
                  width={16}
                  height={16}
                />
                <p>{article.likeCount}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axiosInstance.get(
    "/articles?page=1&pageSize=10&orderBy=recent"
  );
  const articles: List[] = response.data.list;

  return {
    props: {
      articles,
    },
    // 60초마다 페이지를 재생성합니다.
    revalidate: 60,
  };
};

export default Boards;
