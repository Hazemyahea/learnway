import { Link, useParams } from "react-router-dom";
import { useDeleteVideo, useGetVideoById } from "../../config/Queryes";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

const AdminVideos = () => {
  const { id } = useParams();
  const { ChoosenVideo, setChoosenVideo } = useContext(AdminContext);
  const { data: videos, isLoading } = useGetVideoById(id);
  const {
    mutate: deleteVideo,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useDeleteVideo();

  function handleDeleteVideo(id) {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteVideo(id);
      isDeleted && toast.success("تم حذف الفيديو بنجاح");
    }
  }

  return (
    <div>
      <ToastContainer />
      <h1 className="text-center text-3xl font-bold mb-4">الفيديوهات</h1>
      <div>
        {videos?.length === 0 ? (
          <p>لا يوجد فيديوهات</p>
        ) : (
          <ul className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md text-lg">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              videos?.map((video) => (
                <li
                  key={video.id}
                  className="flex justify-between items-center gap-4 bg-white border-gray-200 p-4 rounded-md"
                >
                  <p>{video.title.slice(0, 50)}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDeleteVideo(video.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "جاري الحذف..." : "حذف الفيديو"}
                    </button>
                    <Link
                      to={`/admin/update-video/${video.id}`}
                      onClick={() => setChoosenVideo(video)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md"
                    >
                      تعديل الفيديو
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      ;
    </div>
  );
};

export default AdminVideos;
