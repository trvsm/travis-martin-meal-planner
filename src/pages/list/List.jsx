import "./list.scss";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function List() {
  // list will get passed a bunch of arrays, sum them then map through all ingredients
  // replace meals with props received
  let meals = [
    [
      ["Chicken Stock", 711, "ml"],
      ["salt", 1.25, "ml"],
    ],
    [
      ["Chicken Stock", 711, "ml"],
      ["pepper", 0.31, "ml"],
    ],
    [["salt", 1.25, "ml"]],
    [["mushrooms", 79, "ml"]],
  ];

  // this can refactor with lodash for readability
  // add unique items to an output, add repeated items to their first occurrence
  const ingredientTracker = (recipeList) => {
    let shoppingList = [];
    for (let recipeIndex = 0; recipeIndex < recipeList.length; recipeIndex++) {
      // for each remaining ingredients compare to what's in output array
      // if match add to existing, else create new entry
      let ingredients = recipeList[recipeIndex];
      ingredients.forEach(
        //comparison: an ingredient in a recipe
        (ingredient) => {
          let currentList = [];
          // add each ingredient name in output to new array to check against
          shoppingList.forEach((element) => {
            currentList.push(element[0]);
          });
          // if current ingredients contains ingredient add ingredient quantity to existing quantity
          if (currentList.find((element) => element === ingredient[0])) {
            //   for each entry in output array, if element[0](ingredient name) matches ingredient[0] add quantity
            shoppingList.forEach((element) => {
              if (element[0] === ingredient[0]) {
                // element[1] & ingredient[1] hold logged and current quantities of ingredient respectively
                element[1] += ingredient[1];
              }
            });
          } else {
            // if entry doesn't exist add it to output
            shoppingList = [...shoppingList, ingredient];
          }
        }
      );
    }
    return shoppingList;
  };

  let [ingredients, setIngredients] = useState(ingredientTracker(meals));

  return (
    <div className="list__wrapper">
      <h2 className="list__title">Your Shopping List</h2>
      <ul className="list__output">
        {Object.keys(ingredients).length > 0 ? (
          ingredients.map((ingredient) => (
            <li key={ingredient[0]} className="list__item">
              {ingredient[0]}: {ingredient[1]} {ingredient[2]}
            </li>
          ))
        ) : (
          <li>loading...</li>
        )}
      </ul>
      <Link to={"/"}>
        <div className="list__restart">Start Over {">"}</div>
      </Link>
    </div>
  );
}
