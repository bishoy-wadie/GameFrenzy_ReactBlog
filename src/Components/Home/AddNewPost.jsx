import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { mixed, object, string } from "yup";
import notify from "../../hook/useNotification";
import PostContext from "../../context/PostContext";

function AddNewPost() {
  const { listOfPosts, setListOfPosts } = useContext(PostContext);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [errors, setErrors] = useState(null);

  const onChangePostTitle = (e) => {
    setPostTitle(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.postTitle;
    setErrors(newErrors);
  };
  const onChangePostContent = (e) => {
    setPostContent(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.postContent;
    setErrors(newErrors);
  };
  const onChangePostImg = (e) => {
    console.log(e.target.files[0]);
    setPostImg(e.target.files[0]);
    const newErrors = { ...errors };
    delete newErrors.postImg;
    setErrors(newErrors);
  };

  const AddNewPostSchema = object({
    postTitle: string().min(3).max(250).required(),
    postContent: string().min(20).required(),
    postImg: mixed().required(),
  });

  const API_URL = "http://localhost:3000";

  const addNewPost = async (postData) => {
    console.log(postData.postImg);
    try {
      console.log(postData.user_data);
      const formData = new FormData();
      formData.append("postTitle", postData.postTitle);
      formData.append("postContent", postData.postContent);
      // formData.append("date", JSON.stringify(postData.date));
      formData.append("time", postData.time);
      formData.append("newDate", postData.newDate);
      formData.append("user_data", JSON.stringify(postData.user_data));
      formData.append("postImg", postData.postImg);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(`${API_URL}/posts`, formData, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      notify(error.response.data, "error");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const user_data = JSON.parse(localStorage.getItem("user_data"));
    console.log(user_data);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newDate = now.toLocaleDateString();

    try {
      const result = await AddNewPostSchema.validate(
        {
          postTitle,
          postContent,
          postImg,
        },
        { abortEarly: false }
      );
      console.log(result);
      // setPostTitle("");
      // setPostContent("");
      // setPostImg(null);
      const response = await addNewPost({
        postTitle,
        postContent,
        postImg,
        date: {
          year,
          month,
          day,
        },
        time,
        newDate,
        user_data,
      });

      console.log(response);
      notify("Your Post Created Successfully", "success");
      setListOfPosts([response, ...listOfPosts]);
    } catch (error) {
      let errors = [];
      console.log(error);
      if (error.errors) {
        errors = error.errors.map((err) => err);
      }
      errors.forEach((err) => notify(err, "error"));
      console.dir(errors);
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <div data-dial-init className="fixed right-6 bottom-6 group z-30">
        <div
          id="speed-dial-menu-default"
          className="flex flex-col items-center  mb-4 space-y-2"
        >
          <label
            htmlFor="my-modal-1000"
            type="button"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            className="flex btn items-center justify-center text-white rounded-full w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 "
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </label>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-1000" className="modal-toggle" />
          <label htmlFor="my-modal-1000" className="modal cursor-pointer">
            <div className="modal-box relative " htmlFor="">
              <label
                htmlFor="my-modal-1000"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg text-center font-bold">Create New Post</h3>
              <form className="form" onSubmit={onSubmit}>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Post Title</span>
                  </label>
                  <input
                    value={postTitle}
                    onChange={onChangePostTitle}
                    type="text"
                    placeholder="Title here..."
                    className="input input-accent w-full max-w-xs"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Post Content</span>
                  </label>
                  <textarea
                    value={postContent}
                    onChange={onChangePostContent}
                    className="textarea textarea-accent h-24"
                    placeholder="Write content here..."
                  ></textarea>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Post Image</span>
                  </label>

                  <input
                    type="file"
                    onChange={onChangePostImg}
                    className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="submit"
                    htmlFor="my-modal-1000"
                    className="btn btn-outline btn-accent"
                  >
                    Add Post
                  </button>
                </div>
              </form>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}

export default AddNewPost;
