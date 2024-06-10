import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 초기 상태 설정
    setMatches(mediaQuery.matches);

    // 이벤트 리스너 등록
    mediaQuery.addEventListener("change", handleChange);

    // 클린업 함수
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export const useResponsive = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1280px)");
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return { isMobile, isTablet, isDesktop };
};
