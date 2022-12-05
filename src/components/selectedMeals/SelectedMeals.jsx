export default function SelectedMeals({ props, clickHandler }) {
  return (
    // make this a form, pass submit handler from above
    <>
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
              ></input>
            </label>
          ))
        ) : (
          <label>loading...</label>
        )}
      </fieldset>
    </>
  );
}
