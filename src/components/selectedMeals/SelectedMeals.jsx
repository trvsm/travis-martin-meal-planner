export default function SelectedMeals({ props, clickHandler }) {
  return (
    // Similar component to MealOptions: when selected recipes set to state display recipe titles
    // button clears state
    <form>
      <fieldset className="selected__list">
        {Object.keys(props).length > 0 ? (
          props.map((recipe) => (
            <label
              htmlFor={recipe.idMeal}
              onClick={clickHandler}
              key={recipe.idMeal}
            >
              {recipe.strMeal}
              <input
                type="checkbox"
                id={recipe.idMeal}
                className="selected__item"
                name={recipe.strMeal}
              ></input>
            </label>
          ))
        ) : (
          <label>loading...</label>
        )}
      </fieldset>
      <button>remove all</button>
    </form>
  );
}
