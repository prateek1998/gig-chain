import React from "react";
import { topMenus, bottomMenus, linkMenu } from "../constants/Sidebar";
import { Link, useLocation, Outlet } from "react-router-dom";
import { AiOutlineBulb } from 'react-icons/ai'

const Layout = () => {
  const location = useLocation();
  return (
    <>
      <div className="flex">
        <div
          className={`"w-72"
            } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
        >
          <div className="flex gap-x-4 items-center">
            <AiOutlineBulb size={"3rem"} color='white' />
            <p
              className={`text-white origin-left font-medium text-3xl duration-200 }`}
            >
              Gig Chain
            </p>
          </div>
          <ul className="pt-6">
            {topMenus.map((Menu, index) => (
              <Link to="/" key={index}>
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                    } `}
                >
                  {Menu.icon}
                  <span className={`origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>

              </Link>
            ))}
          </ul>
          <ul className="pt-6 absolute mb-5 mx-3 inset-x-0 bottom-0">
            {bottomMenus.map((Menu, index) => (
              <Link to="/" key={index}>
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"}
                    } `}
                >
                  {Menu.icon}
                  <span className={`origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>

              </Link>
            ))}
          </ul>
        </div>
        <div className="h-screen flex-1 p-7">
          <p className="text-3xl mb-5 text-gray-500">
            Gig Execution Module
          </p>
          <p className="text-xl mb-4 text-blue-600">
            Allocate Gigs, Track Execution, Track Execution by Giggers
          </p>
          <div className="flex flex-row">
            {
              linkMenu.map((item) => (
                <Link to={item.url} key={item.title} className="mr-2">
                  <button className={`flex flex-col items-center 
                   bg-blue-100 
                   border-gray-300 hover:text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-10 mr-2 mb-2 focus:outline-none border 
                   
                   ${location.pathname === "/" + item.url && "text-white bg-blue-800"}`}>
                    <div>
                      {item.icon}
                    </div>
                    {item.title}
                  </button>
                </Link>
              ))
            }
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
