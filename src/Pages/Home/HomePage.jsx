import AddNewPost from "../../Components/Home/AddNewPost";
import Footer from "../../Components/Home/Footer";
import NavBar from "../../Components/Home/NavBar";
import PostCard from "../../Components/Home/PostCard";
import Slider from "../../Components/Home/Slider";

import background from "../../assets/images/491495eaa1d61af4780-23224602-acv-norwayiconic-male-1588257040528.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Home/Pagination";
import PostContext from "../../context/PostContext";

function HomePage() {
  // const [listOfPosts, setListOfPosts] = useState([]);
  const { listOfPosts, setListOfPosts } = useContext(PostContext);

  //search
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredPosts, setFilteredPosts] = useState([]);

  // const handleSearchQueryChange = (event) => {
  //   const query = event.target.value.toLowerCase();
  //   setSearchQuery(query);

  //   const filtered = listOfPosts.filter((post) =>
  //     post.title.toLowerCase().includes(query)
  //   );
  //   setFilteredPosts(filtered);
  // };

  //Pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = listOfPosts.slice(indexOfFirstPost, indexOfLastPost);
  // const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(listOfPosts.length / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  let user = "";
  if (localStorage.getItem("user_data") != null) {
    user = JSON.parse(localStorage.getItem("user_data"));
    console.log(user.firstName);
  }

  useEffect(() => {
    async function getAllPosts() {
      const { data } = await axios.get("http://localhost:3000/posts");
      setListOfPosts(data);
      // setFilteredPosts(data);
      console.log(data);
    }
    getAllPosts();
  }, []);

  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    // backgroundPosition: "center",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <div className="h-screen" style={styles}>
        <div className="sticky top-0 z-50">
          <NavBar />
        </div>
        <Slider />
        {/* <div className="flex items-center">
          <label for="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => handleSearchQueryChange(event)}
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />
        </div> */}
        {/* <div className="sticky top-20 z-20">
          <form class="flex items-center mt-5 opacity-70">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
            <button
              type="submit"
              class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </form>

          <h1 className="text-end text-7xl text-green-300">Master Your Play</h1>
        </div> */}
        <PostCard listOfPosts={listOfPosts} />
        {/* <div className="m-auto">
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={listOfPosts.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div> */}
        {/* <div className="btn-group">
          {Array.from(Array(noOfPages).keys()).map((pageNumber)
          {pageNumbers.map((pageNumber) => (
            <>
              <button
                key={pageNumber}
                className={`btn btn-${
                  pageNumber === currentPage ? "active" : ""
                } btn-outline btn-accent
            `}
                onClick={handlePageChange}
              >
                {pageNumber}
              </button>
            </>
          ))}
        </div> */}
        {user.firstName ? <AddNewPost /> : ""}
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
