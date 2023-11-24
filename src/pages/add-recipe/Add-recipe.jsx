// support user writing recipe with ingredients by line, write to database
export default function AddRecipe() {
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
          <input placeholder="" type="text" className="strMeal" />
          <input placeholder="" type="text" className="strArea" />
          <input placeholder="" type="text" className="strCategory" />
          <textarea
            className="strInstructions"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </section>
      </form>
    </>
  );
}
