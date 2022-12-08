import "./options.scss";

import { Link } from "react-router-dom";
import Recipe from "../../components/recipe/Recipe";
import MealOptions from "../../components/mealOptions/MealOptions";
import SelectedMeals from "../../components/selectedMeals/SelectedMeals";

const BACK_END = process.env.REACT_APP_BACK_END;

export default function Options({recipes, filtered, selected,activeRecipe, clickHandler, submitHandler}) {

  return (
    <>
      <div className="options__wrapper">
        <div className="options__left">
          {/* list of search results or default meals */}
          <div className="options__meals">
            <h3 className="options__meals-title">Meals to choose from</h3>
            {/* will map through options to generate this list */}
            {Object.keys(filtered).length > 0 ? (
              <MealOptions
                props={filtered}
                clickHandler={clickHandler}
                submitHandler={submitHandler}
              />
            ) : (
              <MealOptions
                props={recipes}
                clickHandler={clickHandler}
                submitHandler={submitHandler}
              />
            )}
          </div>

          {/* list of user selected meals */}
          <div className="options__selected">
            <h3 className="options__selected-title">Selected Meals</h3>
            {/* will map through options to generate this list */}
            {Object.keys(selected).length > 0 ? (
              <SelectedMeals props={selected} clickHandler={clickHandler} />
            ) : (
              <p>please select meal options from above</p>
            )}
          </div>
        </div>

        {/* recipe for meal in focus */}
        <div className="options__recipes">
          {Object.keys(activeRecipe).length > 0 ? (
            <Recipe props={activeRecipe} />
          ) : (
            <>
              <h3 className="options__recipe-title">
                Click a recipe to view details
              </h3>
            </>
          )}
          <Link to={"/list"}>
            <div className="options__link">Get Your Shopping List {">"}</div>
          </Link>
        </div>
      </div>
    </>
  );
}
