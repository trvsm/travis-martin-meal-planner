import '../mealOptions/mealOptions.scss';
export default function SelectedMeals({ props, clickHandler }) {
  return (
    // Similar component to MealOptions: when selected recipes set to state display recipe titles
    // button clears state
    <form className='meals__form'>
      <fieldset className="meals__list">
        {Object.keys(props).length > 0 ? (
          props.map((recipe) => (
            <>
              <label
                className="meals__label"
                htmlFor={recipe.idMeal}
                onClick={clickHandler}
                key={recipe.idMeal}
              >
                <input
                  className="meals__checkbox"
                  type="checkbox"
                  id={recipe.idMeal}
                  name={recipe.strMeal}
                ></input>
                <div className="meals__text">{recipe.strMeal}</div>
              </label>
            </>
          ))
        ) : (
          <label>loading...</label>
        )}
      </fieldset>
      <button className="meals__button">remove all</button>
    </form>
  );
}
