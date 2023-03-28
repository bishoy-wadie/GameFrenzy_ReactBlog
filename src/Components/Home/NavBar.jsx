import { Link, NavLink } from "react-router-dom";

function NavBar() {
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
          <span>Hello,Bishoy</span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
