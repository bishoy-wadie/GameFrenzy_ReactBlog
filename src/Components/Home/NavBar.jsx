import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_data") != null) {
      setUser(JSON.parse(localStorage.getItem("user_data")));
      console.log(user.firstName);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("user_data");
    setUser("");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            GameFrenzy
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control justify-center">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          <>
            {user != "" ? (
              <>
                <span>Hello,{user.firstName}</span>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src="../../src/assets/images/unknownpp.png" />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <NavLink to="/profile" className="justify-between">
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={logOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex flex-row btn btn-ghost normal-case text-l"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 m-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p>Login</p>
              </Link>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default NavBar;
