import { axiosJsonInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { format } from "date-fns";
import { useState } from "react";

interface Article {
  content: string;
  createdAt: string;
  id: number;
  image: string;
  isLiked: boolean;
  likeCount: number;
  title: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

interface Commenter {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface AddBoardIdProps {
  articleData: Article;
  comments: Commenter[];
}

const AddBoardId: React.FC<AddBoardIdProps> = ({ articleData, comments }) => {
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const router = useRouter();

  console.log(comments);

  const handleKebabClick = (e: React.MouseEvent) => {
    console.log("kebab click!!");
  };

  const formattedUpdatedAt = format(
    new Date(articleData.updatedAt),
    "yyyy-MM-dd"
  );

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length > 0) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };

  return (
    <div className="container w-[343px] md:w-[696px] lg:w-[1200px] h-svh m-auto my-24">
      {/* 게시글 영역 */}
      <div className="title-container flex items-start">
        <h1 className="font-bold text-20 text-cool-gary-800 w-[312px]">
          {articleData.title}
        </h1>
        <Image
          src={"/ic_kebab.svg"}
          alt="케밥 아이콘"
          width={24}
          height={24}
          onClick={handleKebabClick}
        />
      </div>
      <div className="author-container flex gap-8 my-16">
        <Image
          src={"/ic_profile.svg"}
          alt="프로필 이미지"
          width={24}
          height={24}
        />
        <span className="">{articleData.writer.nickname}</span>
        <span className="">{formattedUpdatedAt}</span>
        <div className="flex gap-4 border-l border-cool-gary-200 pl-16 ml-16">
          <Image
            src={"/ic_heart.svg"}
            alt="하트 아이콘"
            width={24}
            height={24}
          />
          <span>{articleData.likeCount}</span>
        </div>
      </div>
      <div className="divider border-cool-gary-200 border-b my-16" />
      <div className="mb-40">{articleData.content}</div>
      {/* 댓글 영역 */}
      <div className="container">
        <span className="comment-title font-semibold text-cool-gray-900">
          댓글 달기
        </span>
        <textarea
          className="bg-cool-gary-100 rounded-xl w-[344px] placeholder:text-cool-gary-400 text-16 px-24 py-16 h-104 my-16"
          placeholder="댓글을 입력해주세요."
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex justify-end mb-16">
          <button
            type="submit"
            className={`add-product-submit-button ml-auto w-74 h-btn-height rounded-lg text-white font-semibold ${
              isValidate ? "bg-bland-blue" : "bg-cool-gary-400"
            }`}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  const fetchData = async () => {
    const [articleResponse, commentsResponse] = await Promise.all([
      axiosJsonInstance.get(`/articles/${id}`),
      axiosJsonInstance.get(`/articles/${id}/comments?limit=10`),
    ]);

    return {
      articleData: articleResponse.data,
      comments: commentsResponse.data,
    };
  };

  const { articleData, comments } = await fetchData();

  return {
    props: { articleData, comments },
  };
};

export default AddBoardId;
