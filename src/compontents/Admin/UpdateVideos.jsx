import { useForm } from "react-hook-form";
import { useGetAllCourses, useUpdateVideo } from "../../config/Queryes";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { useParams } from "react-router-dom";

const UpdateVideos = () => {
  const { id } = useParams();
  const { ChoosenVideo, setChoosenVideo } = useContext(AdminContext);
  const { mutate: updateVideo } = useUpdateVideo();
  const { data: courses } = useGetAllCourses();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: ChoosenVideo.title,
      url: ChoosenVideo.url,
      info: ChoosenVideo.info,
      course_id: ChoosenVideo.course_id,
    },
  });
  const onSubmit = async (data) => {
    updateVideo({ id, newVideo: data });
    toast.success("تم تعديل الفيديو بنجاح");
  };
  return (
    <div>
      <ToastContainer />
      <div>
        <h1 className="text-2xl md:text-4xl font-bold p-5">
          تعديل الفيديو الحالى
        </h1>
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
            تعديل الحلقه{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateVideos;
