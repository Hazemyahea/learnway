import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp } from "../config/Queryes";
import Loader from "../compontents/UI/Loader";

const Signup = () => {
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isPending,
    isSuccess,
    error: signUpErorr,
  } = useSignUp();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    signUp(data);
  };
  if (isSuccess) {
    navigate("/");
  }
  return (
    <div className="signin flex justify-center items-center">
      <form
        className=" bg-white p-5 rounded-lg flex flex-col  gap-4 md:w-[40%]  shadow-md shadow-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center mb-4">تسجيل حساب جديد</h2>
        {signUpErorr && (
          <p className=" bg-red-700 text-white rounded-md p-2">
            البيانات موجوده مسبقاً
          </p>
        )}
        {isPending && <Loader />}
        <input
          {...register("username", {
            required: "برجاء كتابة الاسم الكامل",
          })}
          aria-invalid={errors.fullname ? "true" : "false"}
          type="text"
          className=" border-blue-400 border p-3 rounded-md text-black"
          placeholder="الاسم الكامل"
        />
        {errors.email && (
          <p
            className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
            role="alert"
          >
            {errors?.username.message}
          </p>
        )}
        <input
          {...register("email", {
            required: "برجاء كتابة البريد الالكتروني",
          })}
          aria-invalid={errors.email ? "true" : "false"}
          type="email"
          className=" border-blue-400 border p-3 rounded-md text-black"
          placeholder="البريد الالكتروني"
        />
        {errors.email && (
          <p
            className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}

        <input
          {...register("password", {
            required: "برجاء كتابة كلمة المرور",
            minLength: {
              value: 6,
              message: "برجاء كتابة كلمة المرور علي الاقل من 6 أحرف",
            },
          })}
          type="password"
          className=" border-blue-400  border p-3 rounded-md text-black"
          placeholder="كلمة المرور"
        />
        {errors.password && (
          <span
            className=" text-white p-3 rounded-md text-lg font-bold bg-red-600"
            role="alert"
          >
            {errors.password.message}
          </span>
        )}
        <button className=" bg-green-600 text-white rounded-md p-2">
          تسجيل الحساب
        </button>
        <hr />
        <p className="text-center">
          إذاكان لديك حساب برجاء سجل دخولك من{" "}
          <Link to="/signin" className="text-blue-500">
            هنا
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
