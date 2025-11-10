import { logout } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

interface Props {
  isSideMenuOpen: boolean;
  closeMenu: () => void;
}

export const NotAuthenticatedNav = ({ closeMenu, isSideMenuOpen }: Props) => {
  return (
    <nav
      className={clsx(
        "fixed p-5 right-0 top-0 w-[500] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
        { "translate-x-full": !isSideMenuOpen }
      )}
    >
      <IoCloseOutline
        size={50}
        className="absolute top-5 right-5 cursor-pointer"
        onClick={closeMenu}
      />
      {/* input */}
      <div className="relative mt-14">
        <IoSearchOutline size={20} className="absolute top-2 left-2" />
        <input
          type="text"
          placeholder="Buscar"
          className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
        />
      </div>

      <Link
        onClick={closeMenu}
        href={"/auth/login"}
        className=" flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        <IoLogInOutline size={30} />
        <span className="ml-3 text-xl">Ingresar</span>
      </Link>
    </nav>
  );
};
