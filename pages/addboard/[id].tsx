import { axiosJsonInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useState, useRef } from "react";

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

interface comments {
  list: Commenter[];
  nextCursor: number;
}

interface AddBoardIdProps {
  articleData: Article;
  comments: comments;
}

const AddBoardId: React.FC<AddBoardIdProps> = ({ articleData, comments }) => {
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<Commenter[]>(comments.list);
  const router = useRouter();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleKebabClick = (e: React.MouseEvent) => {
    console.log("kebab click!!");
  };

  const formattedUpdatedAt = format(
    new Date(articleData.updatedAt),
    "yyyy-MM-dd"
  );

  const formatRelativeTime = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length > 0) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = commentInputRef.current?.value;
    if (!isValidate) return;
    try {
      const response = await axiosJsonInstance.post(
        `/articles/${articleData.id}/comments`,
        {
          content: comment,
        }
      );
      setCommentsList([response.data, ...commentsList]);
      if (commentInputRef.current) commentInputRef.current.value = "";
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };

  return (
    <div className="container w-[343px] md:w-[696px] lg:w-[1200px] m-auto my-24">
      {/* 게시글 영역 */}
      <div className="title-container flex items-start">
        <h1 className="font-bold text-20 text-cool-gary-800 w-[312px] md:w-[664px] lg:w-[1168px]">
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
      <div className="author-container flex gap-8 my-16 items-center">
        <Image
          src={"/ic_profile.svg"}
          alt="프로필 이미지"
          width={24}
          height={24}
        />
        <span className="">{articleData.writer.nickname}</span>
        <span className="text-12 text-cool-gary-400">{formattedUpdatedAt}</span>
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
      <div className="flex flex-col">
        <div className="image-container aspect-w-16 aspect-h-9">
          <Image
            src={`${articleData.image}`}
            alt="첨부이미지"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="mb-40 flex-auto">{articleData.content}</div>
      </div>
      {/* 댓글 영역 */}

      <form className="container" onSubmit={handleCommentSubmit}>
        <span className="comment-title font-semibold text-cool-gray-900">
          댓글 달기
        </span>
        <textarea
          className="bg-cool-gary-100 rounded-xl w-[344px] md:w-[100%] placeholder:text-cool-gary-400 text-16 px-24 py-16 h-104 my-16"
          placeholder="댓글을 입력해주세요."
          onChange={handleCommentChange}
          name="comment"
          ref={commentInputRef}
        ></textarea>
        <div className="flex justify-end mb-16">
          <button
            disabled={!isValidate}
            type="submit"
            className={`add-product-submit-button ml-auto w-74 h-btn-height rounded-lg text-white font-semibold ${
              isValidate ? "bg-bland-blue" : "bg-cool-gary-400"
            }`}
          >
            등록
          </button>
        </div>
        <div className="container">
          {commentsList.length === 0 ? (
            <Image
              className="m-auto"
              src={"/bg_no_comments.svg"}
              alt="댓글이 없습니다"
              width={151}
              height={195}
            />
          ) : (
            commentsList.map(comment => (
              <div key={comment.id}>
                <div className="comment-content flex items-start justify-between">
                  <p className="text-14 text-cool-gary-800 w-[312px]">
                    {comment.content}
                  </p>
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
                    width={32}
                    height={32}
                  />
                  <div className="flex flex-col">
                    <span className="text-12">
                      {articleData.writer.nickname}
                    </span>
                    <span className="text-12 text-gray-400">
                      {formatRelativeTime(comment.updatedAt)}
                    </span>
                  </div>
                </div>
                <div className="divider border-cool-gary-200 border-b my-16" />
              </div>
            ))
          )}
        </div>
        {/* 목록으로 돌아가기 */}
        <button
          className="gap-10 relative  bg-bland-blue rounded-[40px] w-[240px] h-48 mx-auto flex items-center px-[38.5px] my-40"
          onClick={() => {
            router.push("/boards");
          }}
        >
          <span className="text-white font-semibold text-18">
            목록으로 돌아가기
          </span>
          <Image
            className=""
            src={"/ic_back_arrow.svg"}
            alt="뒤로가기 화살표"
            width={24}
            height={24}
          />
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query;

  const fetchData = async () => {
    const [articleResponse, commentsResponse] = await Promise.all([
      axiosJsonInstance.get(`/articles/${id}`),
      axiosJsonInstance.get(`/articles/${id}/comments?limit=6`),
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
