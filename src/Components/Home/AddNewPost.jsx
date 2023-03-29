function AddNewPost() {
  return (
    <>
      <div data-dial-init className="fixed right-6 bottom-6 group">
        <div
          id="speed-dial-menu-default"
          className="flex flex-col items-center  mb-4 space-y-2"
        >
          <label
            htmlFor="my-modal-4"
            type="button"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            className="flex btn items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
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
            <span className="sr-only">Open actions menu</span>
          </label>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <div className="modal-box relative" htmlFor="">
              <label
                htmlFor="my-modal-4"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">
                Congratulations random Internet user!
              </h3>
              <p className="py-4">
                You've been selected for a chance to get one year of
                subscription to use Wikipedia for free!
              </p>
              <div className="modal-action">
                <label htmlFor="my-modal-4" className="btn">
                  Add Post
                </label>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}

export default AddNewPost;
