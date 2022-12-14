import "../mealOptions/mealOptions.scss";
export default function SelectedMeals({ props, clickHandler }) {
  return (
    // Similar component to MealOptions: when selected recipes set to state display recipe titles
    // button clears state
    <form className="meals__form--selected">
      <fieldset className="meals__list">
        {Object.keys(props).length > 0 ? (
          props.map((recipe) => (
            <div key={recipe.idMeal}>
              <label
                className="meals__label"
                htmlFor={recipe.idMeal}
                onClick={clickHandler}
              >
                <input
                  className="meals__checkbox--selected"
                  type="checkbox"
                  id={recipe.idMeal}
                  name={recipe.strMeal}
                ></input>
                <div className="meals__text">{recipe.strMeal}</div>
              </label>
            </div>
          ))
        ) : (
          <label>loading...</label>
        )}
      </fieldset>
    </form>
  );
}
