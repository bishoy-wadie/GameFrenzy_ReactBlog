import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import PostContext from "../../context/PostContext";
import { mixed, object, string } from "yup";
import axios from "axios";
import notify from "../../hook/useNotification";

function EditPost(props) {
  const { listOfPosts, setListOfPosts } = useContext(PostContext);
  const [postEditTitle, setPostEditTitle] = useState(props.post.postTitle);
  const [postEditContent, setPostEditContent] = useState(
    props.post.postContent
  );
  const [postEditImg, setPostEditImg] = useState(props.post.postImg);
  const [errors, setErrors] = useState(null);

  const onChangePostEditTitle = (e) => {
    setPostEditTitle(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.postTitle;
    setErrors(newErrors);
  };
  const onChangePostEditContent = (e) => {
    setPostEditContent(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.postContent;
    setErrors(newErrors);
  };
  const onChangePostEditImg = (e) => {
    console.log(e.target.files[0]);
    setPostEditImg(e.target.files[0]);
    const newErrors = { ...errors };
    delete newErrors.postImg;
    setErrors(newErrors);
  };

  const EditPostSchema = object({
    postTitle: string().min(3).max(250),
    postContent: string().min(20),
    postImg: mixed(),
  });

  const API_URL = "http://localhost:3000";

  const editPost = async (editedPostData) => {
    console.log(editedPostData);
    try {
      // console.log(editedPostData.user_data);
      const formData = new FormData();
      formData.append("postTitle", editedPostData.postEditTitle);
      formData.append("postContent", editedPostData.postEditContent);
      // formData.append("user_data", JSON.stringify(editedPostData.user_data));
      formData.append("postImg", editedPostData.postEditImg);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `${API_URL}/posts/${props.post.id}`,
        formData,
        config
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      notify(error.response.data, "error");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // const user_data = JSON.parse(localStorage.getItem("user_data"));
    // console.log(user_data);
    console.log(postEditTitle);
    console.log(postEditContent);
    console.log(postEditImg);
    try {
      const result = await EditPostSchema.validate(
        {
          postEditTitle,
          postEditContent,
          postEditImg,
        },
        { abortEarly: false }
      );
      console.log(result);

      const response = await editPost({
        postEditTitle,
        postEditContent,
        postEditImg,
      });

      console.log(response);
      notify("Your Post Updated Successfully", "success");
      const NewListOfPosts = listOfPosts.filter(
        (item) => item.id !== props.post.id
      );
      setListOfPosts([response, ...NewListOfPosts]);
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
      {/* {console.log(props.post)} */}
      <ToastContainer theme="dark" />
      <label
        htmlFor={`my-modal-${props.post.id}`}
        className=" btn btn-sm btn-circle bg-orange-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
      </label>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={`my-modal-${props.post.id}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`my-modal-${props.post.id}`}
        className="modal cursor-pointer"
      >
        <div className="modal-box relative " htmlFor="">
          <label
            htmlFor={`my-modal-${props.post.id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg text-center font-bold">Edit Post</h3>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Post Title</span>
              </label>
              <input
                type="text"
                defaultValue={props?.post.postTitle}
                onChange={onChangePostEditTitle}
                className="input input-accent w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Post Content</span>
              </label>
              <textarea
                className="textarea textarea-accent h-24"
                defaultValue={props?.post.postContent}
                onChange={onChangePostEditContent}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Post Image</span>
              </label>
              <div className="flex justify-between">
                <input
                  type="file"
                  onChange={onChangePostEditImg}
                  className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                />
                <div className="w-40 rounded">
                  <img src={`database/${props.post.postImg}`} />
                </div>
              </div>
            </div>
            <div className="modal-action">
              <button
                type="submit"
                htmlFor={`my-modal-${props.post.id}`}
                className="btn btn-outline btn-accent"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </label>
    </>
  );
}

export default EditPost;
