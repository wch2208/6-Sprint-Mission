import Image from "next/image";
import { useReducer } from "react";

interface SortDropdownProps {
  handleSortChange: (order: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ handleSortChange }) => {
  const [isOpen, setIsOpen] = useReducer(state => {
    return !state;
  }, false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen();
    const target = e.target as HTMLElement;
    if (target.id === "recent") {
      handleSortChange("recent");
    } else if (target.id === "like") {
      handleSortChange("like");
    }
  };
  return (
    <div className="drop-down-container" onClick={handleClick}>
      {/* 토글 버튼 */}
      <Image
        className="cursor-pointer"
        src="/ic_sort.svg"
        id="toggleIcon"
        alt="정렬 아이콘"
        width={40}
        height={40}
      />
      {/* 옵션 목록 */}
      {isOpen && (
        <div className="drop-down-overlay z-10 w-full h-full fixed top-0 left-0 opacity-0" />
      )}
      {isOpen && (
        <ul className="drop-down-list z-20 absolute right-2 top-50 w-100 border-1 flex flex-col bg-white rounded-md">
          <li
            className="w-full text-center py-4 border-b-1 cursor-pointer hover:bg-cool-gary-100"
            id="recent"
          >
            최신순
          </li>
          <li
            className="w-full text-center py-4 cursor-pointer hover:bg-cool-gary-100"
            id="like"
          >
            인기순
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
