import "../../App.scss";
import "./landing.scss";
import { Link, Outlet, useLocation } from "react-router-dom";

const pages = [
  "welcome",
  "conventional_list",
  "plan",
  "compiled_list",
  "upload_recipe",
];

export default function Landing() {
  // simple landing page to help user understand what to expect
  const location = useLocation();
  const currPath = location.pathname;
  return (
    //check path: if on sonething other than landing just render nav & outlet
    <>
      <div className="landing">
        <nav className="landing__nav">
          {/* TODO: link straight to list */}
          {pages.map((page) => (
            <Link
              key={`${page}`}
              className="landing__link"
              to={page === "welcome" ? "/" : `${page}`}
            >
              {page}
            </Link>
          ))}
        </nav>
        {/* if on path / display welcome message.  On any other path display content without welcome message */}
        {currPath !== "/" ? (
          <Outlet />
        ) : (
          <section className="landing__text">
            <h1 className="landing__title">Meal Compiler</h1>
            <h3 className="landing__tagline">
              Pick your meals, go shopping. We'll handle the list!
            </h3>
            <Link to={"/plan"}>
              <div className="landing__start">
                Start planning with pre-selected recipes {">"}
              </div>
            </Link>
            <Link to={"/conventional_list"}>
              <div className="landing__list">
                Jump to shopping list builder {">"}
              </div>
            </Link>
          </section>
        )}
      </div>
    </>
  );
}
