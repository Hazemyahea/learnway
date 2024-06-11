// Dialog.js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { useUpdateUserProfile } from "../config/Queryes";
import Loader from "./UI/Loader";

const ProfileUpdate = ({ isOpen, onClose, userProfile }) => {
  if (!isOpen) return null;
  const {
    mutate: updateUserProfile,
    isPending,
    isSuccess,
  } = useUpdateUserProfile();
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: userProfile[0].username,
      image: userProfile[0].image,
    },
  });
  const uploader = Uploader({
    apiKey: "public_W142iea7syzT87QeFAWfcA9Zy6m1",
  });
  const options = {
    apiKey: "public_W142iea7syzT87QeFAWfcA9Zy6m1", // This is your API key.
    maxFileCount: 1,
  };

  const onSubmit = (data) => {
    updateUserProfile({
      id: userProfile[0].id,
      newProfile: { ...data, image: imageURL || userProfile[0].image },
    });
  };

  return ReactDOM.createPortal(
    <div className="dialog-overlay z-50 bg-black bg-opacity-50 backdrop-blur-sm p-5">
      <div className="dialog-content bg-white text-black p-4 rounded-md w-1/2  relative">
        {isPending ? (
          <p className="text-white text-lg font-bold flex items-center gap-2">
            <Loader />
            جاري تحديث الملف الشخصي
          </p>
        ) : isSuccess ? (
          <div className=" items-center gap-5 p-5 ">
            <p className=" text-center text-xl font-bold">
              تم تحديث الملف الشخصي
            </p>
            <img
              src="https://www.clearsteps.com/wordpress/wp-content/uploads/2017/12/Green-Check.png"
              alt="Success"
              className="w-full max-w-[250px] mx-auto"
            />
          </div>
        ) : (
          <>
            <h3 className="text-2xl text-center font-bold text-black pb-4">
              تعديل الملف الشخصي
            </h3>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("username", {
                  required: "برجاء كتابة اسم المستخدم",
                })}
                aria-invalid={errors.username ? "true" : "false"}
                type="text"
                className=" border-blue-400 border p-3 rounded-md text-black"
                placeholder="اسم المستخدم"
              />
              {errors.username && (
                <p
                  className="bg-red-600 text-white p-3 rounded-md text-lg font-bold"
                  role="alert"
                >
                  {errors.username.message}
                </p>
              )}
              {imageURL && (
                <img
                  src={imageURL}
                  alt="Profile"
                  className="w-[250px] rounded-xl shadow-lg"
                />
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
                    تحميل صوره جديده
                  </button>
                )}
              </UploadButton>

              <button className=" bg-green-600 text-white rounded-md p-2">
                تعديل
              </button>
            </form>
          </>
        )}

        <span
          className="bg-red-600 text-white p-2 rounded-md absolute right-2 top-2 hover:bg-red-700  cursor-pointer"
          onClick={onClose}
        >
          X
        </span>
      </div>
    </div>,
    document.getElementById("dialog-root")
  );
};

export default ProfileUpdate;
