import "../../App.scss";
import "./landing.scss";
import { Link, Outlet } from "react-router-dom";

const pages = ["welcome", "plan", "shopping list", "import recipe"];

export default function Landing() {
  // simple landing page to help user understand what to expect
  return (
    <>
      <div className="landing">
        <nav className="landing__nav">
          {pages.map((page) => (
            <Link to={page === "welcome" ? "/" : `${page}`}>{page}</Link>
          ))}
        </nav>
        <div className="landing__text">
          <h1 className="landing__title">Meal Compiler</h1>
          <h3 className="landing__tagline">
            Pick your meals, go shopping. We'll handle the list!
          </h3>
          <Outlet />
        </div>
        <Link to={"/plan"}>
          <div className="landing__start">
            Start planning with pre-selected recipes {">"}
          </div>
        </Link>
      </div>
    </>
  );
}
