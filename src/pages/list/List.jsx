import "./list.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ingredientTracker,
  allSelectedIngredients,
} from "../../utilities/functions";

export default function List({ selected }) {
  // list will get passed a bunch of arrays, sum them then map through all ingredients
  // replace meals with props received
  let justIngredients = allSelectedIngredients(selected);
  let computed = ingredientTracker(justIngredients);

  let [shoppingItem, _setShoppingItem] = useState(computed);
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
        <>
          <h1>Please follow the promts and select recipes to build a list!</h1>
          <Link to={"/"}>
            <div className="list__restart">Start Over {">"}</div>
          </Link>
        </>
      )}
    </>
  );
}
