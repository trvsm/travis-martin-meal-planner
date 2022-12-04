export default function MealOptions({ props, clickHandler }) {
  return (
    <>
      <fieldset className="options__meals-list">
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
                placeholder={recipe}
                className="options__meals-item"
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
