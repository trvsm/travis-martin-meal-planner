import IngredientInput from "../../components/ingredientInput/IngredientInput";
import { useState } from "react";
const ingredPlaceholder = {
  strIngredient: "placeholder",
  strMeasure: "placeholder",
};

// support user writing recipe with ingredients by line, write to database
export default function AddRecipe() {
  const [ingredientNum, setIngredientNum] = useState([]);
  return (
    <>
      {/** Required fields:
       * @strMeal name of recipe
       * @strArea cuisine: dropdown option?
       * @strCategory protein label: chicken, beef, veg, breakfast. dropdown?
       * @strInstructions textarea for instructions. try to support formatting with line breaks
       * Heavy lifting:
       *  @strIngredient & @strMeasure up to 20 linked ingredients:
       * @strIngredient a string
       *
       * @strMeasure two part str. part1: number part 2: dropdown:
       * unit, ml, tsp, tbsp, cup, lb, gram
       */
      /** Essential fields filled by server:
       * @idMeal a unique identifier: generate on server via UUID
       * @strMealThumb an image to display: set this to a simple placeholder
       * @strSource link to recipe source: set this to simply "User uploaded recipe"
       */}
      <form className="add-recipe__form">
        <section className="add-recipe__top">
          <input placeholder="Recipe Name" type="text" className="strMeal" />
          <select className="strArea">
            <option disabled selected value="">
              Culinary Region:
            </option>
            <option value="African">African</option>
            <option value="American">American</option>
            <option value="Brazilian">Brazilian</option>
            <option value="Chinese">Chinese</option>
            <option value="French">French</option>
            <option value="Indian">Indian</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
          {/* Beef Dishes Breakfast Dishes Chicken Dishes Casserole Dishes Grilled
          Dishes Lamb Dishes Noodle Dishes Pasta Dishes Pork Dishes Rice Dishes
          Sandwiches and Wraps Seafood Dishes Soup and Stew Dishes Vegan Dishes
          Vegetarian Dishes */}
          <select className="strCategory">
            <option value="" disabled selected>
              Category:
            </option>
            <option value="Beef">Beef</option>
            <option value="Break">Break</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Chicken">Chicken</option>
            <option value="Casserole">Casserole</option>
            <option value="Grill">Grill</option>
            <option value="Handheld">Handheld</option>
            <option value="Lamb">Lamb</option>
            <option value="Noodle">Noodle</option>
            <option value="Pork">Pork</option>
            <option value="Rice">Rice</option>
            <option value="Seafood">Seafood</option>
            <option value="Soup">Soup</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
          <textarea
            className="strInstructions"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </section>
        {/* an array of ingredients
        onclick of plus button add another
        pass props to build unique ingredients

        */}
        {ingredientNum.length ? (
          ingredientNum.map((_ingredientSlot, index) => {
            return <IngredientInput key={index} ingredientNum={index} />;
          })
        ) : (
          <p>Click the button to add up to 20 ingredients</p>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIngredientNum([...ingredientNum, ingredPlaceholder]);
          }}
        >
          Add another ingredient
        </button>
      </form>
    </>
  );
}
