// importing a named export requires destructuring
import { useState } from "react";
import {
  mapNonEmpty,
  ingredientMatch,
  measurementMatch,
} from "../../utilities/functions";

export default function Recipe({ props }) {
  let entries = Object.entries(props[0]);
  let ingredients = mapNonEmpty(entries, ingredientMatch);
  let measures = mapNonEmpty(entries, measurementMatch);
  let ingredientEntry = () => {
    let items = [];
    for (let index = 0; index < ingredients.length; index++) {
      items.push(`${ingredients[index]}, ${measures[index]} `);
    }
    return items;
  };
  let array = ingredientEntry();
  const linkedIngredients = useState(array);

  return (<>
      {Object.keys(props).length > 0 ? (
        <>
          <h3 className="recipe__title">{props[0].strMeal}</h3>
          <h5 className="recipe__label">source:</h5>
          <a href={props[0].strSource} className="recipe__source">
            {props[0].strSource}
          </a>
          <div className="recipe__specs">
            <h5 className="recipe__label">cuisine:</h5>
            <p className="recipe__cuisine">{props[0].strArea}</p>
            <h5 className="recipe__label">category:</h5>
            <p className="recipe__category">{props[0].strCategory}</p>
          </div>
          <h5 className="recipe__label">instructions:</h5>
          <p className="recipe__description">{props[0].strInstructions}</p>
          <ul className="recipe__recipe-ingredients">
            Ingredients
            {linkedIngredients ? (
              linkedIngredients.map((ingredient, index) => (
                <li key={`${ingredient}${index}`}>{ingredient}</li>
              ))
            ) : (
              <li>loading...</li>
              )}
          </ul>
        </>
      ) : (
        <p>loading...</p>
      )}
        </>
  );
}
