import './recipeIngredients.scss';
export default function RecipeIngredients({ props }) {
  // use props to render bullet list of each ingredient & measurement
  return (
    <>
      <ul className="recipe__recipe-ingredients">
        Ingredients:
        {props ? (
          props.map((ingredient, index) => (
            <li className="recipe__ingredient" key={`${ingredient}${index}`}>{ingredient}</li>
          ))
        ) : (
          <li>loading...</li>
        )}
      </ul>
    </>
  );
}
