export default function MealOptions({ props,submitHandler, clickHandler }) {
  return (
    // make this a form, pass submit handler from above
    <form onSubmit={submitHandler}>
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
