// importing a named export requires destructuring
import { useEffect } from "react";
import { useState } from "react";
import {
  mapNonEmpty,
  ingredientMatch,
  measurementMatch,
} from "../../utilities/functions";
import RecipeIngredients from "../recipeIngredients/RecipeIngredients";
import './recipe.scss';

export default function Recipe({ props }) {
  /* Render recipe details
  Call helper functions to extract ingredient & measure from active recipe
  Set correlated ingredients & measures to an array in state
  pass linkedIngredients as prop so RecipeIngredients can render a concise list
  */
  const entries = Object.entries(props[0]);
  const ingredients = mapNonEmpty(entries, ingredientMatch);
  const measures = mapNonEmpty(entries, measurementMatch);
  const ingredientEntry = () => {
    const items = [];
    for (let index = 0; index < ingredients.length; index++) {
      const item = [];
      item[0] = ingredients[index];
      item[1] = measures[index];
      items.push(item);
    }
    return items;
  };
  useEffect(() => {
    setLinkedIngredients(ingredientEntry());
  },[props]);

  const [linkedIngredients, setLinkedIngredients] = useState();

  return (
    <>
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
          <RecipeIngredients props={linkedIngredients} />
        </>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
