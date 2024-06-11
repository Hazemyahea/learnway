import { supabase } from "./Config";
// API.js

//UserMangment
export async function signUp(user) {
  let { data: signUp, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        fullname: user.username,
        image: "https://secure.gravatar.com/avatar/?s=96&amp;d=mm&amp;r=g",
      },
    },
  });
  if (signUp) {
    let { data: insertProfile, error: profileError } = await supabase
      .from("profile")
      .insert([
        {
          id: signUp.user.id,
          username: signUp.user.user_metadata.fullname,
          email: signUp.user.email,
        },
      ]);
  }
  if (signUpError) {
    throw new Error(signUpError);
    return;
  }
  return signUp;
}

export async function signIn(user) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    return;
  }
  return user;
}
export async function getLastFiveCourses() {
  // Simulate an API call
  let { data: courses, error } = await supabase
    .from("courses")
    .select("*, categories ( title )")
    .limit(8)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    return;
  }
  return courses;
}

// get course by id with videos
export async function getCourseById(id) {
  let { data: course, error } = await supabase
    .from("courses")
    .select("*, video ( * )")
    .eq("id", id);
  if (error) {
    console.log(error);
    return;
  }
  return course;
}
export async function getAllCategories() {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    return;
  }
  return categories;
}

export async function getCoursesByCategory(category, page = 1) {
  const limit = 5;
  const offset = (page - 1) * limit;
  let { data: courses, error } = await supabase
    .from("courses")
    .select("*, categories ( title )")
    .eq("cate_id", category)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    return;
  }
  return courses;
}

export async function getAllCourses(page = 1) {
  const limit = 5;
  const offset = (page - 1) * limit;
  let { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    return;
  }
  return courses;
}

export async function GetCoursesNumber() {
  let { data: courses, error } = await supabase.from("courses").select("*");
  if (error) {
    console.log(error);
    return;
  }
  return courses;
}
export async function GetCoursesInAddVideo() {
  let { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function getAllVideos() {
  let { data: videos, error } = await supabase.from("video").select("*");
  if (error) {
    console.log(error);
    return;
  }
  return videos;
}

export async function getVideoById(id) {
  let { data: video, error } = await supabase
    .from("video")
    .select("*")
    .eq("course_id", id);
  if (error) {
    console.log(error);
    return;
  }
  return video;
}

export async function addNewCourse(course) {
  console.log(course);
  let { data, error } = await supabase.from("courses").insert(course);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function addNewVideo(video) {
  let { data, error } = await supabase.from("video").insert(video);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function addNewCategory(category) {
  let { data, error } = await supabase.from("categories").insert(category);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function deleteVideo(id) {
  let { data, error } = await supabase.from("video").delete().eq("id", id);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function deleteCourse(id) {
  let { error: videoError } = await supabase
    .from("video")
    .delete()
    .eq("course_id", id);
  if (videoError) {
    console.log(videoError);
    return;
  }

  let { data, error } = await supabase.from("courses").delete().eq("id", id);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function updateCourse(newData) {
  let { data, error } = await supabase
    .from("courses")
    .update(newData.course)
    .eq("id", newData.id);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}
export async function updateVideo(newData) {
  console.log(newData);
  let { data, error } = await supabase
    .from("video")
    .update(newData.newVideo)
    .eq("id", newData.id);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function getUserProfile(id) {
  let { data, error } = await supabase.from("profile").select("*").eq("id", id);
  if (error) {
    console.log(error);

    throw new Error(error);
  }
  return data;
}
export async function getUserCourses(id) {
  let { data, error } = await supabase
    .from("usercourses")
    .select("*, courses( * )")
    .eq("user_id", id);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function addCourseToUser({ userId, courseId }) {
  console.log(userId, courseId);
  let { data: existingCourses, error: existingError } = await supabase
    .from("usercourses")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId);

  if (existingCourses.length > 0) {
    console.log("Course already added to user.");
    return { error: "Course already added to user." };
  }

  // If not added, insert the course into usercourses
  let { data, error } = await supabase.from("usercourses").insert({
    user_id: userId,
    course_id: courseId,
  });

  if (error) {
    console.log(error);
    return;
  }

  return { isAdded, data };
}

export async function deleteCourseFromUser({ userId, courseId }) {
  let { data, error } = await supabase
    .from("usercourses")
    .delete()
    .eq("user_id", userId)
    .eq("course_id", courseId);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

export async function updateUserProfile(newData) {
  let { data, error } = await supabase
    .from("profile")
    .update(newData.newProfile)
    .eq("id", newData.id);

  const { data: updateUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        fullname: newData.newProfile.username,
        image: newData.newProfile.image,
      },
    });
  console.log(newData.newProfile.username);

  if (error) {
    console.log(error);
    return;
  }
  return data;
}
