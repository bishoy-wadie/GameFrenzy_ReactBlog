import AddButton from "../../Components/Home/AddButton";
import Footer from "../../Components/Home/Footer";
import NavBar from "../../Components/Home/NavBar";
import Post from "../../Components/Home/Post";
import Slider from "../../Components/Home/Slider";

function HomePage() {
  let user = "";
  if (localStorage.getItem("user_data") != null) {
    user = JSON.parse(localStorage.getItem("user_data"));
    console.log(user.firstName);
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <Slider />
      <h1 className="m-5 text-4xl">Latest Posts</h1>
      <Post />
      <Post />
      <Post />
      <Post />
      {user.firstName ? <AddButton /> : ""}
      <Footer />
    </>
  );
}

export default HomePage;
