import { Outlet } from "react-router-dom";
import Footer from "../../Components/Home/Footer";
import NavBar from "../../Components/Home/NavBar";

function UserProfile() {
  return (
    <>
      <NavBar />
      <h1>Welcome to User Profile page</h1>
      <Footer />
      <Outlet />
    </>
  );
}

export default UserProfile;
