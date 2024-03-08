import { useState } from "react";

export default function IngredientInput({ ingredientNum, buttonClick }) {
  const [formVals, setFormVals] = useState({
    ingredient: "ingredient name",
    quantity: 1,
    unit: "unit",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormVals({ ...formVals, [name]: value });
  };
  return (
    <form
      action="submit"
      className="ingredient-item"
      onSubmit={(e) => {
        e.preventDefault();
        buttonClick(formVals);
      }}
    >
      <label htmlFor={`strIngredient${ingredientNum}`}>
        Ingredient:
        <input
          onChange={handleInputChange}
          type="text"
          id={`strIngredient${ingredientNum}`}
          name="ingredient"
          value={formVals.ingredient}
        />
      </label>
      <label htmlFor={`strMeasure${ingredientNum}`}>
        Quantity:
        <input
          onChange={handleInputChange}
          type="number"
          id={`strMeasure${ingredientNum}`}
          placeholder={1}
          min={1}
        />
      </label>
      <select
        onChange={handleInputChange}
        name="unit"
        id={`strUnit${ingredientNum}`}
      >
        <option value="unit">unit</option>
        <option value="ml">ml</option>
        <option value="g">g</option>
        <option value="lb">lb</option>
        <option value="oz">oz</option>
        <option value="tsp">tsp</option>
        <option value="tbsp">tbsp</option>
        <option value="other">other</option>
      </select>
      <input
        type="submit"
        className="ingredient-item__button"
        value={"Add Current Ingredient"}
      />
    </form>
  );
}
