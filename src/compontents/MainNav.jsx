import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export const MainNav = () => {
  const { user, isAuthenticated, signOutHandler } = useContext(AuthContext);
  return (
    <nav className="flex flex-col md:flex-row gap-4 justify-between  mx-auto p-4 md:p-8 items-center border-b border-gray-200">
      <div className="flex gap-2 items-center">
        <Link className="font-bold text-2xl md:text-3xl" to="/">
          طريق <span className="text-green-700">التعلم</span>
        </Link>
      </div>
      <ul className="flex flex-col  sm:flex-row  gap-4 md:gap-8 font-bold text-lg md:text-xl">
        <li>
          <Link to="/">الرئيسيه</Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link to="/signin">تسجيل الدخول</Link>
            </li>
            <li>
              <Link to="/signup">تسجيل حساب جديد</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/courses/1">الكورسات</Link>
        </li>
        {isAuthenticated && (
          <li>
            <li>
              <button onClick={signOutHandler}>تسجيل الخروج</button>
            </li>
          </li>
        )}
      </ul>

      {isAuthenticated && (
        <Link
          className="flex gap-2 items-center text-center"
          to={`/profile/${user?.id}`}
        >
          <h3 className="text-lg md:text-xl font-semibold">
            {user?.user_metadata?.fullname}
          </h3>
          <img
            alt=""
            src={user?.user_metadata?.image}
            height="100"
            width="100"
            className="rounded-full w-8 h-8 md:w-10 md:h-10"
          ></img>
        </Link>
      )}
    </nav>
  );
};
