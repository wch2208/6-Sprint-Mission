import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

const AddBoard: React.FC = () => {
  interface FormValue {
    title: string;
    content: string;
    image: string;
  }

  const FORM_INITIAL_VALUE: FormValue = {
    title: "",
    content: "",
    image: "https://example.com",
  };

  const [formValue, setFormValue] = useState<FormValue>(FORM_INITIAL_VALUE);
  const [isValidate, setIsValidate] = useState<boolean>(false);

  useEffect(() => {
    // 유효성 검사
    const validate = () => {
      const { title, content } = formValue;

      if (!title || !content) {
        setIsValidate(false);
        return;
      }
      // 유효성 검사 통과 상태 값
      setIsValidate(true);
    };

    validate();
  }, [formValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // axios를 사용한 post 요청 보내기
    const fetchArticle = async () => {
      try {
        const data = {
          title: formValue.title,
          content: formValue.content,
          image: formValue.image,
        };
        console.log(data);
        const response = await axiosInstance.post("/articles", data);
      } catch (error) {
        console.error("폼 제출 에러 발생", error);
      }
    };
    fetchArticle();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValue({ ...formValue, title: value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormValue({ ...formValue, content: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log("file:", files?.[0]);
    // setFormValue({ ...formValue, image: files?.[0] ?? null });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-product-container container my-16 mx-auto w-[344px] md:w-[696px] xl:w-[1200px] flex flex-col gap-24"
    >
      {/* 등록버튼 */}
      <div className="add-product-header flex justify-between items-center">
        <h1 className="add-product-title text-cool-gary-800 font-bold text-20">
          상품 등록하기
        </h1>
        <button
          type="submit"
          className={`add-product-submit-button w-74 h-btn-height rounded-lg text-white font-semibold ${
            isValidate ? "bg-bland-blue" : "bg-cool-gary-400"
          }`}
        >
          등록
        </button>
      </div>

      {/* 제목 */}
      <div className="add-product-title flex flex-col gap-12">
        <span className="add-product-title-text font-bold text-14 text-cool-gary-800">
          *제목
        </span>
        <input
          type="text"
          className="add-product-title-input bg-cool-gary-100 px-24 py-16 placeholder:text-cool-gary-400 text-16"
          placeholder="제목을 입력해주세요"
          onChange={handleTitleChange}
        />
      </div>

      {/* 내용*/}
      <div className="add-product-content flex flex-col gap-12">
        <span className="add-product-content-text font-bold text-14 text-cool-gary-800">
          *내용
        </span>
        <textarea
          className="add-product-content-input bg-cool-gary-100 placeholder:text-cool-gary-400 text-16 px-24 py-16 h-200"
          placeholder="내용을 입력해주세요"
          onChange={handleContentChange}
        ></textarea>
      </div>

      {/* 이미지 추가 */}
      <div className="add-product-image flex flex-col gap-12">
        <span className="add-product-image-text font-bold text-14 text-cool-gary-800">
          이미지
        </span>
        <label className="add-product-image-button w-168 h-168 bg-cool-gary-100 flex justify-center items-center rounded-xl relative bg-[url('/ic_upload.svg')] bg-no-repeat bg-center cursor-pointer">
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>
    </form>
  );
};

export default AddBoard;
