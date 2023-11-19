import "../../App.scss";
import "./landing.scss";
import { Link, Outlet } from "react-router-dom";

export default function Landing() {
  // simple landing page to help user understand what to expect
  return (
    <>
      <div className="landing">
        <div className="landing__text">
          <h1 className="landing__title">Meal Planner</h1>
          <h3 className="landing__tagline">
            Pick your meals, go shopping. We'll handle the list!
          </h3>
          <Outlet/>
        </div>
        <Link to={"/meals"}>
          <div className="landing__start">
            Start planning with pre-selected recipes {">"}
          </div>
        </Link>
      </div>
    </>
  );
}
