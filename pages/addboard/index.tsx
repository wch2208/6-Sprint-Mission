import { axiosJsonInstance, axiosFileInstance } from "@/lib/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const AddBoard: React.FC = () => {
  interface FormValue {
    title: string;
    content: string;
    image: string | Blob;
  }

  const FORM_INITIAL_VALUE: FormValue = {
    title: "",
    content: "",
    image: "https://example.com",
  };

  const [formValue, setFormValue] = useState<FormValue>(FORM_INITIAL_VALUE);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const validate = () => {
      const { title, content } = formValue;

      if (!title || !content) {
        setIsValidate(false);
        return;
      }
      setIsValidate(true);
    };

    validate();
  }, [formValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchArticle = async () => {
      try {
        const data = {
          title: formValue.title,
          content: formValue.content,
          image: formValue.image,
        };

        const response = await axiosJsonInstance.post("/articles", data);
        router.push(`/addboard/${response.data.id}`);
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
    if (!files) return;
    const fetchImageUrl = async () => {
      try {
        const formData = new FormData();
        formData.append("image", files[0]);
        const response = await axiosFileInstance.post(
          "/images/upload",
          formData
        );
        const imageUrl = response.data.url;
        setFormValue({ ...formValue, image: imageUrl });
      } catch (error) {
        console.error("이미지 업로드 에러 발생", error);
      }
    };

    fetchImageUrl();
  };

  const handleRemoveImage = () => {
    if (fileRef.current?.value === "") return;

    const isConfirm = window.confirm("정말 삭제하시겠습니까?");
    if (isConfirm) {
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      setFormValue({ ...formValue, image: "" });
    }
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
        <div className="flex gap-8">
          <label className="add-product-image-button w-168 h-168 bg-cool-gary-100 flex justify-center items-center rounded-xl relative bg-[url('/ic_upload.svg')] bg-no-repeat bg-center cursor-pointer">
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <div className="add-product-image-button w-168 h-168 flex justify-center items-center rounded-xl relative">
            {typeof formValue.image === "string" &&
              formValue.image.includes("sprint") && (
                <>
                  <Image
                    src={formValue.image}
                    alt="첨부된 이미지 미리보기"
                    width={200}
                    height={200}
                  />
                  <div
                    className="absolute w-24 h-24 top-0 right-0 cursor-pointer"
                    onClick={handleRemoveImage}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-0.5 bg-black transform rotate-45"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-0.5 bg-black transform -rotate-45"></div>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddBoard;
