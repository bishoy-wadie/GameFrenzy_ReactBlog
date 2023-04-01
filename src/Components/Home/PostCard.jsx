import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import DeletePostConfirm from "./DeletePostConfirm";

function PostCard(props) {
  console.log(props);
  let obj = {};

  let user = "";
  if (localStorage.getItem("user_data") != null) {
    user = JSON.parse(localStorage.getItem("user_data"));
    console.log(user.id);
  }

  return (
    <>
      {props.listOfPosts.length === 0 && <h1>No Posts to show!</h1>}
      <h1 className="m-5 text-4xl text-cyan-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 animate-ping inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 animate-ping inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
        Latest Posts
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 animate-ping inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 animate-ping inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </h1>
      {props.listOfPosts.map((post) => {
        obj = JSON.parse(post.user_data);
        console.log(post.id);
        return (
          <div className="Posts ">
            <div className="flex flex-col m-10 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={`database/${post.postImg}`}
                alt="There is NO IMAGE"
              />
              <div className="flex flex-col justify-between p-4 leading-normal relative w-full">
                {obj.id === user.id ? (
                  <div className="edit-delete-icons absolute inset-y-0 right-0 flex items-center pr-2">
                    <EditPost post={post} />
                    <DeletePostConfirm post={post.id} />
                  </div>
                ) : (
                  ""
                )}
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.postTitle}
                </h5>
                <div className="footer">
                  <Link
                    className="text-green-300 hover:underline dark:text-green-200"
                    to={`/${obj.id}`}
                  >
                    By @{`${obj.firstName} ${obj.lastName}`}
                  </Link>
                </div>
                <div className="footer">
                  <p>{`${post.newDate} at ${post.time}`}</p>
                </div>
                <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                  {post.postContent}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PostCard;
