import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";

const AdminNav = () => {
  return (
    <nav className=" bg-gray-800 text-white">
      <ul className="flex gap-4 flex-col md:gap-10 p-10">
        <li className="border-b-2 border-gray-700 p-2 hover:border-white hover:text-gray-300 transition-all">
          <Link to="/admin">الرئيسيه </Link>
        </li>
        <li className="border-b-2 border-gray-700 p-2 hover:border-white hover:text-gray-300 transition-all">
          <Link to="/admin/courses">الكورسات</Link>
        </li>
        <li className="border-b-2 border-gray-700 p-2 hover:border-white hover:text-gray-3000 transition-all">
          <Link to="/admin/add-new-course">اضافة كورس جديد</Link>
        </li>
        <li className="border-b-2 border-gray-700 p-2 hover:border-white hover:text-gray-3000 transition-all">
          <Link to="/admin/add-new-video">اضافة فيديو جديد</Link>
        </li>
        <li className="border-b-2 border-gray-700 p-2 hover:border-white hover:text-gray-300 transition-all">
          <Link to="/admin/add-new-category">اضافة قسم جديد</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
