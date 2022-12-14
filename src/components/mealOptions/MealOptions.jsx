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
            <div key={recipe.idMeal}>
              <label
                className="meals__label"
                htmlFor={recipe.idMeal}
                onClick={clickHandler}
              >
                <input
                  className="meals__checkbox"
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
      <button className="meals__button">add to selection</button>
    </form>
  );
}
