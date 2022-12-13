

export default function RecipeIngredients({props}){
    return (
        <>
        <ul className="recipe__recipe-ingredients">
          Ingredients
          {props ? (
            props.map((ingredient, index) => (
              <li key={`${ingredient}${index}`}>{ingredient}</li>
            ))
          ) : (
            <li>loading...</li>
          )}
        </ul>
      </>
    );
}