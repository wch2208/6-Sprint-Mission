/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 외부 이미지 주소
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "example.com",
    ],
  },
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // SVG 이미지를 리액트 컴포넌트로 변환해주는 라이브러리 설정 추가
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
