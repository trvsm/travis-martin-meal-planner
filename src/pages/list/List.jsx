import "./list.scss";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ingredientTracker,
  allSelectedIngredients,
} from "../../utilities/functions";

export default function List({ selected }) {
  /* Key feature of Meal Planner:
-uses helper functions to run computations on each selected recipe, output ingredient & measure
-check through all ingredients and sum any with the same ingredient name
*/
  // TODO: add field to toggle unit
  // TODO: add modal to support manual resolution of unformatted ingredients
  const justIngredients = allSelectedIngredients(selected);
  const computed = ingredientTracker(justIngredients);

  const [messyIngredients, setMessyIngredients] = useState();
  const [shoppingItem] = useState(computed);

  const showInput = (selection) => {
    const longList = [];
    if (selection[0]) {
      selection.forEach((recipe) => {
        for (const field in recipe) {
          longList.push(recipe[field]);
        }
      });
    }
    return longList;
  };

  useEffect(() => {
    setMessyIngredients(showInput(selected));
  }, [selected]);

  return (
    <div className="wrapper">
      {messyIngredients ? (
        <div className="contrast__wrapper">
          <h2 className="contrast__title">Meal Planner takes all this info:</h2>
          <div className="contrast__output">
            {messyIngredients.map((ingredient, index) => (
              <p key={`${ingredient}${index}`}>{ingredient}</p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {Object.keys(shoppingItem).length > 0 ? (
        <div className="list__wrapper">
          <h2 className="list__title">To make your simple shopping list:</h2>
          <ul className="list__output">
            {shoppingItem.map((ingredient) => (
              <li key={ingredient[0]} className="list__item">
                <div className="list__item-contents">
                  {ingredient[0]}: {ingredient[1]} {ingredient[2]}
                </div>
                <select
                  className="list__dropdown"
                  id={ingredient[1]}
                  defaultValue={1}
                >
                  <option value={1} className="list__option">
                   {ingredient[1].toFixed(1)} ml
                  </option>
                  <option value={1} className="list__option">
                   {ingredient[1].toFixed(1)} g
                  </option>
                  <option value={1/30} className="list__option">
                   {(ingredient[1]/30).toFixed(2)} oz
                  </option>
                  <option value={0.002205} className="list__option">
                   {(ingredient[1]/454).toFixed(2)} lb
                  </option>
                </select>
              </li>
            ))}
          </ul>
          <Link to={"/"}>
            <div className="list__restart">Start Over {">"}</div>
          </Link>
        </div>
      ) : (
        <div className="list__empty">
          <h1 className="list__message">
            Please follow the promts and select recipes to build a list!
          </h1>
          <Link to={"/"}>
            <div className="list__restart">Start Over {">"}</div>
          </Link>
        </div>
      )}
    </div>
  );
}
