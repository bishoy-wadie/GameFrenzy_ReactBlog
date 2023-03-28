function AddButton() {
  return (
    <>
      <div data-dial-init className="fixed right-6 bottom-6 group">
        <div
          id="speed-dial-menu-default"
          className="flex flex-col items-center  mb-4 space-y-2"
        >
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-default"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 transition-transform group-hover:rotate-45"
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
          </button>
        </div>
      </div>
    </>
  );
}

export default AddButton;
