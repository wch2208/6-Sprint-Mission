import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./LoginPage.module.css";
import Logo from "../../assets/logo-panda.svg";
import GoogleIcon from "../../assets/icon-google.svg";
import KakaoIcon from "../../assets/icon-kakao.svg";
import TogglePasswordView from "../../assets/icon-password-view.svg";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  const handleSocialClick = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.target as HTMLElement;
    console.log(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logoIcon} src={Logo} alt="로고" />
        <span>판다마켓</span>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          placeholder="이메일을 입력해주세요"
          autoComplete="off"
          autoFocus
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "잘못된 이메일 형식입니다",
            },
          })}
        />
        {errors.email && (
          <p className={styles.errorMessages}>{errors.email.message}</p>
        )}
        <label htmlFor="password">
          비밀번호
          <img
            src={TogglePasswordView}
            alt="비밀번호 보이기 토글 버튼"
            onClick={() => setShowPassword(!showPassword)}
          />
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="off"
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상 입력해주세요",
            },
          })}
        />
        {errors.password && (
          <p className={styles.errorMessages}>{errors.password.message}</p>
        )}
        <button
          className={`${isValid ? styles.isValid : ""}`}
          type="submit"
          disabled={!isValid}
        >
          로그인
        </button>
      </form>
      <div className={styles.socialLoginContainer}>
        <span>간편 로그인하기</span>
        <div onClick={handleSocialClick}>
          <img src={GoogleIcon} id="google" alt="구글 로그인" />
          <img src={KakaoIcon} id="kakao" alt="카카오 로그인" />
        </div>
      </div>
      <div className={styles.signupContainer}>
        <span>판다마켓이 처음이신가요?</span>
        <Link className={styles.signupLink} to={"/signup"}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
