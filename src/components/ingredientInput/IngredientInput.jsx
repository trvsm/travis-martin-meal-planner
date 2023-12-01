export default function IngredientInput({ ingredientNum }) {
  return (
    <div className="ingredient-item">
      <label htmlFor={`strIngredient${ingredientNum}`}>
        Ingredient:
        <input
          type="text"
          id={`strIngredient${ingredientNum}`}
          placeholder="ingredient name eg carrot"
        />
      </label>
      <label htmlFor={`strMeasure${ingredientNum}`}>
        Quantity:
        <input
          type="number"
          id={`strMeasure${ingredientNum}`}
          placeholder={1}
          min={1}
        />
      </label>
      <select name="unit" id={`strUnit${ingredientNum}`}>
        <option value="unit">unit</option>
        <option value="ml">ml</option>
        <option value="g">g</option>
        <option value="lb">lb</option>
        <option value="oz">oz</option>
        <option value="other">other</option>
      </select>
    </div>
  );
}
