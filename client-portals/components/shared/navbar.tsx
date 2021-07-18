import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../../context/authContext";
import LogoutIcon from "../../utils/icons/logout";
import Burger from "../../utils/icons/navbarBurger";

const Navbar = ({ links }) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const authContext = useContext(AuthContext);

  return (
    <>
      <div className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-base-black mb-3 text-white">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <h2 className="mt-5 mr-5 font-medium">
              Hi, {authContext.username}
            </h2>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-white rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <Burger />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {links.map((item) => (
                <div
                  key={item.name}
                  className="mx-2 text-xl p-3 border-b-4 border-base-teal hover:border-base-green transform hover:scale-105 hover:translate--y"
                >
                  <Link href={item.link}>{item.name}</Link>
                </div>
              ))}
              <button
                onClick={authContext.logoutHandler}
                className="bg-base-green p-2 mx-2 rounded text-xl"
              >
                <div className="flex ">
                  <span className="flex items-center">
                    <LogoutIcon />
                  </span>{" "}
                  <span className="mx-1">Logout</span>
                </div>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
