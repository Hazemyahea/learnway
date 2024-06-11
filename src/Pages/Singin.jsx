import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignIn } from "../config/Queryes";
import Loader from "../compontents/UI/Loader";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Singin = () => {
  const { signInHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate: signIn, isPending, isSuccess, error } = useSignIn();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    signIn(data);
  };
  if (isSuccess) {
    navigate("/");
    signInHandler();
  }
  return (
    <div className="signin flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-white p-5 rounded-lg flex flex-col  gap-4 md:w-[40%] shadow-md shadow-black"
      >
        <h2 className="text-2xl font-bold text-center">تسجيل الدخول</h2>
        {error && (
          <p className="bg-red-600 text-white p-3 rounded-md  font-bold">
            هناك خطأ فى البيانات من فضلك حاول مره اخري
          </p>
        )}

        <div className="flex justify-center p-5">{isPending && <Loader />}</div>
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
            required: "برجاء كتابة الرقم السري",
            minLength: {
              value: 6,
              message: "برجاء كتابة عدد من 6 أحرف علي الاقل",
            },
          })}
          type="password"
          className=" border-blue-400  border p-3 rounded-md text-black"
          placeholder="الرقم السري"
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
          تسجيل الدخول
        </button>
        <hr />
        <p className="text-center">
          إذا لم يكن لديك حساب برجاء التسجيل من{" "}
          <Link to="/signup" className="text-blue-500">
            هنا
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Singin;
