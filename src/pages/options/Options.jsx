import "./options.scss";

import { Link } from "react-router-dom";
import Recipe from "../../components/recipe/Recipe";
import MealOptions from "../../components/mealOptions/MealOptions";
import SelectedMeals from "../../components/selectedMeals/SelectedMeals";

export default function Options({
  recipes,
  filtered,
  selected,
  activeRecipe,
  clickHandler,
  submitHandler,
  buttonHandler
}) {
  return (
    /* meal planning page for user.  Handles state passed from App
    props drilling to pass props to each appropriate component
    */
    <>
      <div className="options__wrapper">
        <div className="options__left">
          {/* list of search results or default meals */}
          <section className="options__meals">
            <h3 className="options__meals-title">Meals to choose from</h3>
            {/* will map through options to generate this list */}
            {Object.keys(filtered).length > 0 ? (
              <MealOptions
                props={filtered}
                clickHandler={clickHandler}
                submitHandler={submitHandler}
                buttonHandler={buttonHandler}
              />
            ) : (
              <MealOptions
                props={recipes}
                clickHandler={clickHandler}
                submitHandler={submitHandler}
                buttonHandler={buttonHandler}
              />
            )}
          </section>

          {/* list of user selected meals */}
          <section className="options__selected">
            <div className="options__top">
              <h3 className="options__selected-title">Selected Meals</h3>
              {/* will map through options to generate this list */}
              {Object.keys(selected).length > 0 ? (
                <SelectedMeals props={selected} clickHandler={clickHandler} />
              ) : (
                <p>please select meal options from above</p>
              )}
            </div>
            {selected.length > 0 ? (
              <Link to={"/list"}>
                <div className="options__link">
                  Get Your Shopping List {">"}
                </div>
              </Link>
            ) : (
              <div className="options__link">
                Select meal options, then generate a shopping list!
              </div>
            )}
          </section>
        </div>

        {/* recipe for meal in focus */}
        <section className="options__recipe-wrap">
          <article className="options__recipe">
            {Object.keys(activeRecipe).length > 0 ? (
              <Recipe props={activeRecipe} />
            ) : (
              <>
                <h3 className="options__recipe-title">
                  Click a recipe to view details
                </h3>
              </>
            )}
          </article>
        </section>
      </div>
    </>
  );
}
