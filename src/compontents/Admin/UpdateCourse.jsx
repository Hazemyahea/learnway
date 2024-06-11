import { useState, useEffect, useContext } from "react";
import {
  useGetAllCategories,
  useGetCourseById,
  useUpdateCourse,
} from "../../config/Queryes";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import { AdminContext } from "../../Context/AdminContext";
import { ToastContainer, toast } from "react-toastify";

export default function UpdateCourse() {
  const { ChoosenCourse, setChoosenCourse } = useContext(AdminContext);
  const { id } = useParams();
  console.log(ChoosenCourse);
  const {
    mutate: updateCourse,
    isLoading: isUpdating,
    isSuccess: isUpdated,
    error,
  } = useUpdateCourse();
  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategories();
  const {
    data: course,
    isLoading: isLoadingCourse,
    isSuccess: isCourseSuccess,
  } = useGetCourseById(id);

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
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...ChoosenCourse,
    },
  });

  const onSubmit = (data) => {
    updateCourse({ id, course: { ...data, image: imageURL || course.image } });
    toast.success("تم تحديث الكورس بنجاح");
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center p-4">تعديل الكورس</h1>
      {error && (
        <p className="bg-red-600 text-white p-3 rounded-md text-lg font-bold">
          {error.message}
        </p>
      )}
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        {course?.title}
        <input
          {...register("title", {
            required: "برجاء كتابة اسم الكورس",
          })}
          aria-invalid={errors.title ? "true" : "false"}
          type="text"
          className="border-blue-400 border p-3 rounded-md text-black"
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
        {/* <span>{course?.title}</span> */}
        <UploadButton
          uploader={uploader}
          options={options}
          onComplete={(files) => setImageURL(files[0].fileUrl)}
        >
          {({ onClick }) => (
            <button
              className="bg-blue-600 text-white rounded-md p-2"
              type="button"
              onClick={onClick}
            >
              تحميل الصورة
            </button>
          )}
        </UploadButton>
        {imageURL && (
          <img
            src={imageURL}
            alt="Course"
            className="mt-2 rounded-md w-48 h-48"
          />
        )}
        <label>القسم</label>
        <select
          {...register("cate_id", {
            required: "برجاء اختيار قسم",
          })}
          className="border-blue-400 border p-3 rounded-md text-black"
        >
          <option value="">اختر القسم</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        {errors.cate_id && (
          <span
            className="text-white p-3 rounded-md text-lg font-bold bg-red-600"
            role="alert"
          >
            {errors.cate_id.message}
          </span>
        )}
        <button
          className="bg-green-600 text-white rounded-md p-2"
          type="submit"
          disabled={isUpdating}
        >
          {isUpdating ? "جاري التحديث..." : "تعديل الكورس"}
        </button>
      </form>
    </div>
  );
}
