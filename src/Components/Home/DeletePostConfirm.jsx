import { ToastContainer } from "react-toastify";
import axios from "axios";
import notify from "../../hook/useNotification";
import { useContext } from "react";
import PostContext from "../../context/PostContext";

function DeletePostConfirm(props) {
  // console.log(props);
  const { listOfPosts, setListOfPosts } = useContext(PostContext);

  const API_URL = "http://localhost:3000/posts";

  const deletePost = async (postId) => {
    try {
      console.log(postId);
      const response = await axios.delete(`${API_URL}/${postId.post}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      notify(error.response.data, "error");
    }
  };

  const handleDelete = async (postId) => {
    try {
      const result = await deletePost(postId);
      console.log(result);
      notify("Your Post Deleted Successfully", "success");
      const NewListOfPosts = listOfPosts.filter(
        (item) => item.id !== postId.post
      );
      console.log(NewListOfPosts);
      setListOfPosts(NewListOfPosts);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <label
        htmlFor={`my-modal-D${props.post}`}
        className="btn btn-sm btn-circle bg-red-400 hover:bg-red-700"
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id={`my-modal-D${props.post}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`my-modal-D${props.post}`}
        className="modal cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <label
              htmlFor={`my-modal-D${props.post}`}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <button
                onClick={() => handleDelete(props)}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}

export default DeletePostConfirm;
