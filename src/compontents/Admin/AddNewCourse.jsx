import { useForm } from "react-hook-form";
import { useAddNewCourse, useGetAllCategories } from "../../config/Queryes";
import { ToastContainer, toast } from "react-toastify";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { useState } from "react";
export const AddNewCourse = () => {
  const { data: categories, isLoading } = useGetAllCategories();
  const { mutateAsync: addCourse, isPending, isSuccess } = useAddNewCourse();
  const [imageURL, setImageURL] = useState("");
  const uploader = Uploader({
    apiKey: "public_W142iea7syzT87QeFAWfcA9Zy6m1",
  });
  const options = {
    apiKey: "public_W142iea7syzT87QeFAWfcA9Zy6m1",
    maxFileCount: 1,
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ title, cate_id }) => {
    if (cate_id === "القسم") {
      toast.error("برجاء اختيار قسم");
      return;
    }
    addCourse({ title, cate_id, image: imageURL });
    toast.success("تم اضافة الكورس بنجاح");
    reset();
  };
  return (
    <div>
      <ToastContainer />

      <h1 className="text-2xl md:text-4xl font-bold p-5">اضافة كورس جديد</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", {
            required: "برجاء كتابة اسم الكورس",
          })}
          aria-invalid={errors.title ? "true" : "false"}
          type="text"
          className=" border-blue-400 border p-3 rounded-md text-black"
          placeholder="اسم الكورس"
        />
        {errors.title && (
          <p
            className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
            role="alert"
          >
            {errors.title.message}
          </p>
        )}
        <UploadButton
          uploader={uploader}
          options={options}
          onComplete={(files) => setImageURL(files[0].fileUrl)}
        >
          {({ onClick }) => (
            <button
              className="bg-blue-600 text-white rounded-md p-2"
              onClick={onClick}
            >
              تحميل الصورة
            </button>
          )}
        </UploadButton>
        <label>القسم</label>
        <select
          {...register("cate_id")}
          className="border-blue-400 border p-3 rounded-md text-black"
          defaultValue="القسم"
        >
          <option value="القسم">القسم</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        {errors.cate_id && (
          <span
            className=" text-white p-3 rounded-md text-lg font-bold bg-red-600"
            role="alert"
          >
            {errors.cate_id.message}
          </span>
        )}
        <button className=" bg-green-600 text-white rounded-md p-2">
          اضف الكورس{" "}
        </button>
      </form>
    </div>
  );
};
