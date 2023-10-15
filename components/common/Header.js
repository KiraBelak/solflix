import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-cyan-700 to-emerald-500">
      <nav
        className="max-w-7xl mx-0 px-0 sm:px-6 lg:pt-0 mt-10"
        aria-label="Top"
      >
        <div className="w-full py-6 flex items-center justify-between border-b border-primary-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="h-30 w-auto"
                src="https://res.cloudinary.com/dzdqwcqj0/image/upload/v1697332525/solflix/cortao_h86jst.png"
                alt="dreambacker logo"
                width={500}
                height={500}
              />
            </Link>
          </div>
          <div className="hidden ml-16 space-x-8 lg:block">
            <div className="text-base font-medium text-white hover:text-primary-50">
              {/* <ConnectWallet /> */}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden"></div>
      </nav>
    </header>
  );
};

export default Header;
