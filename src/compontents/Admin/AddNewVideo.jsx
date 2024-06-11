import { useForm } from "react-hook-form";
import { useAddNewVideo, useGetCoursesInAddVideo } from "../../config/Queryes";
import { ToastContainer, toast } from "react-toastify";

export const AddNewVideo = () => {
  const { data: courses } = useGetCoursesInAddVideo();
  const { mutateAsync: addVideo, isPending, isSuccess } = useAddNewVideo();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  isSuccess && toast.success("تم اضافة الفيديو بنجاح");
  const onSubmit = async (data) => {
    addVideo(data);

    reset();
  };
  return (
    <div>
      <ToastContainer />
      <div>
        <h1 className="text-2xl md:text-4xl font-bold p-5">اضافة فيديو جديد</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title", {
              required: "برجاء كتابة اسم الفيديو",
            })}
            aria-invalid={errors.email ? "true" : "false"}
            type="text"
            className=" border-blue-400 border p-3 rounded-md text-black"
            placeholder="اسم الفيديو"
          />
          {errors.title && (
            <p
              className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
              role="alert"
            >
              {errors.title.message}
            </p>
          )}

          <input
            {...register("url", {
              required: "برجاء كتابة رابط الفيديو",
              minLength: {
                value: 6,
                message: "رابط الفيديو مطلوب",
              },
            })}
            type="text"
            className=" border-blue-400  border p-3 rounded-md text-black"
            placeholder="رابط الفيديو"
          />
          {errors.url && (
            <span
              className=" text-white p-3 rounded-md text-lg font-bold bg-red-600"
              role="alert"
            >
              {errors.url.message}
            </span>
          )}
          <textarea
            {...register("info", {
              required: "برجاء كتابة وصف الفيديو",
              minLength: {
                value: 6,
                message: "وصف الفيديو مطلوب",
              },
            })}
            type="text"
            className=" border-blue-400  border p-3 rounded-md text-black"
            placeholder="وصف الفيديو"
          />
          {errors.info && (
            <span
              className=" text-white p-3 rounded-md text-lg font-bold bg-red-600"
              role="alert"
            >
              {errors.info.message}
            </span>
          )}
          <select
            className=" border-blue-400  border p-3 rounded-md text-black"
            {...register("course_id", {
              required: "برجاء اختيار الكورس",
            })}
          >
            {courses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <button className=" bg-green-600 text-white rounded-md p-2">
            اضف الحلقه{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
