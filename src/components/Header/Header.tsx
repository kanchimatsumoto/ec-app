import Image from 'next/image';
import { HeaderMenu } from '@components/Header/HeaderMenu';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <nav
        className="
          flex flex-wrap
          justify-between
          items-center
          p-4
          w-full
          text-lg
          text-gray-700
          bg-teal-500 md:py-0
        "
      >
        <div className="text-white">
          <Link href="/">
            <a href="#">
              <Image src="/dress.svg" alt="Logo" width={72} height={16} />
              Fashion Site
            </a>
          </Link>
        </div>

        <HeaderMenu />
      </nav>
    </header>
  );
};
