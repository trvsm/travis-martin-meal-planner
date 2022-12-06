export default function SelectedMeals({ props, clickHandler }) {
    // console.log(props);
  return (
    // make this a form, pass submit handler from above
    <form>
      <fieldset className="selected__list">
        {Object.keys(props).length > 0 ? (
          props.map((recipe) => (
            <label htmlFor={recipe.idMeal} onClick={clickHandler} key={recipe.idMeal}>
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
      <button>remove from selection</button>
    </form>
  );
}
