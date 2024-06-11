import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useAddNewCategory } from "../../config/Queryes";

export const AddNewCategory = () => {
  const { mutate: addNewCategory } = useAddNewCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    addNewCategory(data);
    toast.success("تم اضافة القسم بنجاح");
  };
  return (
    <div>
      <ToastContainer />

      <h1 className="text-2xl md:text-4xl font-bold p-5">
        اضافة قسم جديد جديد
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", {
            required: "برجاء كتابة اسم القسم",
          })}
          aria-invalid={errors.title ? "true" : "false"}
          type="text"
          className=" border-blue-400 border p-3 rounded-md text-black"
          placeholder="اسم القسم"
        />
        {errors.title && (
          <p
            className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
            role="alert"
          >
            {errors.title.message}
          </p>
        )}

        <button className=" bg-green-600 text-white rounded-md p-2">
          اضف القسم{" "}
        </button>
      </form>
    </div>
  );
};
