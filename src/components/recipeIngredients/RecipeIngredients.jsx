import './recipeIngredients.scss';
export default function RecipeIngredients({ props }) {
  // use props to render bullet list of each ingredient & measurement
  return (
    <>
      <ul className="recipe__recipe-ingredients">
        <h5 className='recipe__ingredients-title'>
          Ingredients:
          </h5>
        {props ? (
          props.map((ingredient, index) => (
            <li className="recipe__ingredient" key={`${ingredient}${index}`}>{`${ingredient[0]}, ${ingredient[1]}`}</li>
          ))
        ) : (
          <li>loading...</li>
        )}
      </ul>
    </>
  );
}
