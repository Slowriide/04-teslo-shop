"use client";
import { useSession } from "next-auth/react";
import { useUiStore } from "@/store";
import { AuthenticatedNav } from "./AuthenticatedNav";
import { NotAuthenticatedNav } from "./NotAuthenticatedNav";
import { AdminNav } from "./AdminNav";

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Black Background */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}
      {/* Blur*/}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      {isAuthenticated && isAdmin && (
        <AdminNav isSideMenuOpen={isSideMenuOpen} closeMenu={closeMenu} />
      )}

      {isAuthenticated && !isAdmin && (
        <AuthenticatedNav
          isSideMenuOpen={isSideMenuOpen}
          closeMenu={closeMenu}
        />
      )}

      {!isAuthenticated && (
        <NotAuthenticatedNav
          isSideMenuOpen={isSideMenuOpen}
          closeMenu={closeMenu}
        />
      )}
    </div>
  );
};
