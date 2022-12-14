import "./list.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
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
  let justIngredients = allSelectedIngredients(selected);
  let computed = ingredientTracker(justIngredients);

  let [shoppingItem] = useState(computed);
  return (
    <>
      {Object.keys(shoppingItem).length > 0 ? (
        <div className="list__wrapper">
          <h2 className="list__title">Your Shopping List</h2>
          <ul className="list__output">
            {shoppingItem.map((ingredient) => (
              <li key={ingredient[0]} className="list__item">
                {ingredient[0]}: {ingredient[1]} {ingredient[2]}
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
    </>
  );
}
