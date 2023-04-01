import { Link } from "react-router-dom";
import background from "../assets/images/5405317.jpg";
// import background from "../assets/images/assassins-creed-valhalla-4k-game-ul.jpg";
export default function ErrorPage() {
  const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <div
        className="flex items-center justify-center w-screen h-screen"
        style={styles}
      >
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-cyan-600 text-9xl">404</h1>
              <p className="mb-8 text-center text-cyan-300 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <Link
                to="/"
                className="px-5 py-2 rounded-md text-green-100 bg-cyan-400 hover:bg-cyan-700"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
