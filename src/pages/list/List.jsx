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
  const ingredientTracker = (inputArray) => {
    let outputArray = [];
    let firstCollection = inputArray[0];
    // if it is first collection there are no repeats in output, add all elements
    firstCollection.forEach((element) => {
      outputArray.push(element);
    });

    for (let topLv = 1; topLv < inputArray.length; topLv++) {
      // for each remaining collection compare to what's in output array
      // if match add to existing, else create new entry
      let collection = inputArray[topLv];
      collection.forEach(
        //comparison: an ingredient in a recipe
        (comparison) => {
          let currentList = [];
          // add each ingredient name in output to new array to check against
          outputArray.forEach((element) => {
            currentList.push(element[0]);
          });
          // if current ingredients contains comparison ingredient add comparison quantity to existing quantity
          if (currentList.find((element) => element === comparison[0])) {
            //   for each entry in output array, if element[0](ingredient name) matches comparison[0] add quantity
            outputArray.forEach((element) => {
              if (element[0] === comparison[0]) {
                // element[1] & comparison[1] hold logged and current quantities of ingredient respectively
                element[1] += comparison[1];
              }
            });
          } else {
            // if entry doesn't exist add it to output
            outputArray = [...outputArray, comparison];
          }
        }
      );
    }
    return outputArray;
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
