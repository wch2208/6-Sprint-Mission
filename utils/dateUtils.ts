import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

const MILLISECONDS_PER_MINUTE = 60000; // 1분을 밀리초로 표현
const MILLISECONDS_PER_HOUR = 3600000; // 1시간을 밀리초로 표현
const MILLISECONDS_PER_DAY = 86400000; // 1일을 밀리초로 표현
const MILLISECONDS_PER_WEEK = 604800000; // 1주를 밀리초로 표현

const diffConstants = {
  minute: MILLISECONDS_PER_MINUTE,
  hour: MILLISECONDS_PER_HOUR,
  day: MILLISECONDS_PER_DAY,
  week: MILLISECONDS_PER_WEEK,
};

// updatedAt 표시: Date string을 현재 시간과 비교한 형식으로 변환해주는 함수
// 7일 이내까지는 시간이 얼마나 흘렀는지를 분, 시간, 일 단위로 나타내고, 그보다 오래된 날짜는 포맷팅한 문자열로 리턴함
export const formatUpdatedAt = (dateString: Date) => {
  const date = new Date(dateString); // 입력된 날짜 문자열을 Date 객체로 변환
  const now = new Date(); // 현재 기준 Date 객체 생성
  const diffInMilliseconds = now.getTime() - date.getTime();

  if (diffInMilliseconds < diffConstants.minute) {
    return "방금 전";
  } else if (diffInMilliseconds < diffConstants.hour) {
    const diffInMinutes = differenceInMinutes(now, date); // 현재 시간과 입력된 날짜의 차이를 분(minute) 단위로 계산
    return `${diffInMinutes}분 전`;
  } else if (diffInMilliseconds < diffConstants.day) {
    const diffInHours = differenceInHours(now, date); // 현재 시간과 입력된 날짜의 차이를 시간(hour) 단위로 계산
    return `${diffInHours}시간 전`; // 차이가 1일 미만인 경우 "N시간 전" 형식으로 출력
  } else if (diffInMilliseconds < diffConstants.week) {
    const diffInDays = differenceInDays(now, date); // 현재 시간과 입력된 날짜의 차이를 일(day) 단위로 계산
    return `${diffInDays}일 전`; // 차이가 7일 이내인 경우 "N일 전" 형식으로 출력
  } else {
    // 차이가 7일 이상인 경우 포맷팅된 날짜 출력
    return format(date, "yyyy.MM.dd hh:mm a");
  }
};
