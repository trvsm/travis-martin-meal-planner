import "./mealOptions.scss";
export default function MealOptions({ props, submitHandler, clickHandler }) {
  /* Meal Options component:
  checklist showing recipe titles from recipes state passed as props
  OnSubmit: checked recipes are set to selected state, selected recipes filtered from list 
  */
  return (
    <form className="meals__form" onSubmit={submitHandler}>
      <fieldset className="meals__list">
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
                className="meals__item"
                name={recipe.strMeal}
              ></input>
            </label>
          ))
        ) : (
          <label>loading...</label>
        )}
      </fieldset>
      <button>add to selection</button>
    </form>
  );
}
