import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetCoursesInAddVideo,
  GetCoursesNumber,
  addCourseToUser,
  addNewCategory,
  addNewCourse,
  addNewVideo,
  deleteCourse,
  deleteCourseFromUser,
  deleteVideo,
  getAllCategories,
  getAllCourses,
  getAllVideos,
  getCourseById,
  getCoursesByCategory,
  getLastFiveCourses,
  getUser,
  getUserCourses,
  getUserProfile,
  getVideoById,
  signIn,
  signOut,
  signUp,
  updateCourse,
  updateUserProfile,
  updateVideo,
} from "./API";

export function useGetLastFiveCourses() {
  return useQuery({
    queryKey: ["lastFiveCourses"],
    queryFn: getLastFiveCourses, // Call the actual API function
  });
}

export function useGetCourseById(id) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
  });
}

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });
}

export function useGetCoursesByCategory(category, page, limit = 5) {
  return useQuery({
    queryKey: ["courses", category, page],
    queryFn: () => getCoursesByCategory(category, page, limit),
    keepPreviousData: true,
  });
}

export function useGetAllCourses(page, limit = 5) {
  return useQuery({
    queryKey: ["allCourses", page],
    queryFn: () => getAllCourses(page, limit),
    gcTime: 0,
  });
}
export function useGetCoursesNumber() {
  return useQuery({
    queryKey: ["CoursesNumber"],
    queryFn: GetCoursesNumber,
    gcTime: 0,
  });
}

export function useGetCoursesInAddVideo() {
  return useQuery({
    queryKey: ["CoursesInAddVideo"],
    queryFn: GetCoursesInAddVideo,
  });
}

export function useGetAllVideos() {
  return useQuery({
    queryKey: ["allVideos"],
    queryFn: getAllVideos,
  });
}

export function useGetVideoById(id) {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideoById(id),
  });
}

export function useAddNewCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["allCourses"] });
      queryClient.invalidateQueries({ queryKey: ["CoursesInAddVideo"] });
    },
  });
}

export function useAddNewVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewVideo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["allVideos"] });
    },
  });
}

export function useAddNewCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
    },
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["allVideos"] });
      queryClient.invalidateQueries({ queryKey: ["video"] });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["allCourses"] });
      queryClient.invalidateQueries({ queryKey: ["allVideos"] });
      queryClient.invalidateQueries({ queryKey: ["CoursesNumber"] });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["allCourses"] });
      queryClient.invalidateQueries({ queryKey: ["CoursesNumber"] });
    },
  });
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVideo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["allVideos"] });
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    gcTime: 0,
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useGetUserProfile(id) {
  return useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile(id),
  });
}

export function useGetUserCourses(id) {
  return useQuery({
    queryKey: ["userCourses", id],
    queryFn: () => getUserCourses(id),
  });
}
export function useAddCourseToUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCourseToUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userCourses"] });
    },
  });
}

export function useDeleteCourseFromUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourseFromUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userCourses"] });
    },
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
