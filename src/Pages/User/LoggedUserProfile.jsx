import { Outlet } from "react-router-dom";
import Footer from "../../Components/Home/Footer";
import NavBar from "../../Components/Home/NavBar";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function LoggedUserProfile() {
  // let { id } = useParams();
  const [basicInfo, setBasicInfo] = useState({});
  // const [details, setdetails] = useState({});
  // const [listOfPosts, setPosts] = useState([]);
  const Navigate = useNavigate();

  // useEffect(() => {
  //   axios.get(`http://localhost:3000/users/${id}`).then((res) => {
  //     setbasicinfo(res.data.basicInfo);
  //     setdetails(res.data.details);
  //   });

  //   axios.get(`http://localhost:3001/posts/user/${id}`).then((res) => {
  //     setPosts(res.data);
  //   });
  // }, [id]);

  return (
    <>
      <NavBar />
      <section class=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
        <section class="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-gray-400 text-sm">2d ago</span>
            <span class="text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div class="mt-6 w-fit mx-auto">
            <img
              src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
              class="rounded-full w-28 "
              alt="profile picture"
              srcset=""
            />
          </div>

          <div class="mt-8 ">
            <h2 class="text-white font-bold text-2xl tracking-wide">
              Jonathan <br /> Smith
            </h2>
          </div>
          <p class="text-emerald-400 font-semibold mt-2.5">Active</p>

          <div class="h-1 w-full bg-black mt-8 rounded-full">
            <div class="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
          </div>
          <div class="mt-3 text-white text-sm">
            <span class="text-gray-400 font-semibold">Storage:</span>
            <span>40%</span>
          </div>
        </section>
      </section>

      <Footer />
      <Outlet />
    </>
  );
}

export default LoggedUserProfile;
