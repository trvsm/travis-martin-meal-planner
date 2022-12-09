import "./list.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  mapNonEmpty,
  separateUnits,
  ingredientMatch,
  measurementMatch,
  convertFraction,
  letterMatch,
  correlate,
  convertMeasures,
  ingredientTracker,
} from "../../utilities/functions";

export default function List({ selected }) {
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
  // console.log(selected);
  let entries = {
    idMeal: "52955",
    strMeal: "Egg Drop Soup",
    strDrinkAlternate: null,
    strCategory: "Vegetarian",
    strArea: "Chinese",
    strInstructions:
      "In a wok add chicken broth and wait for it to boil.\r\nNext add salt, sugar, white pepper, sesame seed oil.\r\nWhen the chicken broth is boiling add the vegetables to the wok.\r\nTo thicken the sauce, whisk together 1 Tablespoon of cornstarch and 2 Tablespoon of water in a bowl and slowly add to your soup until it's the right thickness.\r\nNext add 1 egg slightly beaten with a knife or fork and add it to the soup slowly and stir for 8 seconds\r\nServe the soup in a bowl and add the green onions on top.",
    strMealThumb: "https://www.themealdb.com/images/media/meals/1529446137.jpg",
    strTags: "Soup,Baking,Calorific",
    strYoutube: "https://www.youtube.com/watch?v=9XpzHm9QpZg",
    strIngredient1: "Chicken Stock",
    strIngredient2: "Salt",
    strIngredient3: "Sugar",
    strIngredient4: "Pepper",
    strIngredient5: "Sesame Seed Oil",
    strIngredient6: "Peas",
    strIngredient7: "Mushrooms",
    strIngredient8: "Cornstarch",
    strIngredient9: "Water",
    strIngredient10: "Spring Onions",
    strIngredient11: "",
    strIngredient12: "",
    strIngredient13: "",
    strIngredient14: "",
    strIngredient15: "",
    strIngredient16: "",
    strIngredient17: "",
    strIngredient18: "",
    strIngredient19: "",
    strIngredient20: "",
    strMeasure1: "3 cups ",
    strMeasure2: "1/4 tsp",
    strMeasure3: "1/4 tsp",
    strMeasure4: "pinch",
    strMeasure5: "1 tsp ",
    strMeasure6: "1/3 cup",
    strMeasure7: "1/3 cup",
    strMeasure8: "1 tbs",
    strMeasure9: "2 tbs",
    strMeasure10: "1/4 cup",
    strMeasure11: "",
    strMeasure12: "",
    strMeasure13: "",
    strMeasure14: "",
    strMeasure15: "",
    strMeasure16: "",
    strMeasure17: "",
    strMeasure18: "",
    strMeasure19: "",
    strMeasure20: "",
    strSource: "https://sueandgambo.com/pages/egg-drop-soup",
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  };
  let test = Object.entries(entries);
  // let entries = selected ? Object.entries(selected[0]) : meals;
  let ingredients = mapNonEmpty(test, ingredientMatch);
  let measures = mapNonEmpty(test, measurementMatch);
  let measureArray = separateUnits(measures, letterMatch);
  let fractionlessMeasures = convertFraction(measureArray);
  let linkedIngredMeasure = correlate(ingredients, fractionlessMeasures);
  let standardizedMeasures = convertMeasures(linkedIngredMeasure, 1, 2);
  console.log(standardizedMeasures);

  let [shoppingItem, setShoppingItem] = useState(
    ingredientTracker([standardizedMeasures])
  );

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
