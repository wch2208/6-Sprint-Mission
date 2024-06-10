import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const getLinkStyle = (currentPath: string, linkPath: string) => {
  return currentPath.startsWith(linkPath) ? "text-blue-500" : "text-gray-600";
};

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center px-15 py-16 border-b border-divider">
      <div className="flex items-center">
        <Link
          href="/"
          className="mr-4 md:mr-8 lg:mr-12"
          aria-label="홈으로 이동"
        >
          <Image
            className="hidden md:block"
            src={"/logo.svg"}
            alt="판다마켓 로고"
            width={153}
            height={50}
          />
          <p className="block md:hidden font-rokaf font-bold text-20 text-bland-blue mr-16">
            판다마켓
          </p>
        </Link>

        <nav>
          <ul className="flex list-none gap-8 font-bold text-base text-gray-600 md:gap-9 md:text-lg">
            <li>
              <Link
                href="/boards"
                className={`hover:text-blue-500 ${getLinkStyle(
                  router.pathname,
                  "/boards"
                )}`}
              >
                자유게시판
              </Link>
            </li>
            <li>
              <Link
                href="/items"
                className={`hover:text-blue-500 ${getLinkStyle(
                  router.pathname,
                  "/items"
                )}`}
              >
                중고마켓
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* <Link href="/login" className="text-gray-600 hover:text-blue-500">
        로그인
      </Link> */}
      <Image src="/ic_profile.svg" alt="프로필" width={40} height={40} />
    </header>
  );
};

export default Header;
