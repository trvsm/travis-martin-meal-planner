import "../../App.scss";
import "./landing.scss";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing__wrapper">
      <h1 className="landing__title">Meal Planner</h1>
      <h3 className="landing__tagline">
        Pick your meals, go shopping. We'll handle the list!
      </h3>
      <Link to={"/meals"}>
        <div className="landing__start">
          Start planning with pre-selected recipes {'>'}
        </div>
      </Link>
      {/* <form action="" className="landing__search">
        <input type="text" placeholder="search for a recipe" className="landing__input" />
      </form> */}
    </div>
  );
}
