import "./options.scss";

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

const BACK_END = process.env.REACT_APP_BACKEND_URL

export default function Options() {
const [recipes, setRecipes] = useState([]);
// when a recipe is clicked on, set to active
// const [activeRecipe, setActiveRecipe] = useState('')

useEffect(()=>{
  // on page load get recipes.  May end up moving this state up to app if search implemented; landing will set state and pass down
  axios.get(`http://localhost:8080/recipes`)
  .then((response)=>{
    console.log(response.data)
    setRecipes(response.data);
    console.log(recipes)
  })
}, []);

  return (
    <div className="options__wrapper">
      <div className="options__left">
        {/* list of search results or default meals */}
        <div className="options__meals">
          <h3 className="options__meals-title">Meals to choose from</h3>
          {/* will map through options to generate this list */}
          <ul className="options__meals-list">
            {Object.keys(recipes).length > 0? 
            recipes.map((recipe)=>(
              <li key={recipe.idMeal} id={recipe.idMeal} className="options__meals-item">{recipe.strMeal}</li>
            ))
            :
            <li>loading...</li>}
            </ul>
        </div>

        {/* list of user selected meals */}
        <div className="options__selected">
          <h3 className="options__selected-title">Selected Meals</h3>
          {/* will map through options to generate this list */}
          <ul className="options__selected-list">
            <li className="options__selected-item">meal1</li>
            <li className="options__selected-item">meal2</li>
            <li className="options__selected-item">meal3</li>
            <li className="options__selected-item">meal4</li>
            <li className="options__selected-item">meal5</li>
            <li className="options__selected-item">meal6</li>
          </ul>
        </div>
      </div>

      {/* recipe for meal in focus */}
      <div className="options__recipes">
        <h3 className="options__recipe-title">Recipe Title -recipe in focus</h3>
        <p className="options__recipe-description">
          RECIPE DESCRIPTION: Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Maiores debitis dolores autem quia, voluptas quo!
        </p>
        <ul className="options__recipe-ingredients">
          Ingredients
          <li className="options__ingredient">ingredient</li>
          <li className="options__ingredient">ingredient</li>
          <li className="options__ingredient">ingredient</li>
          <li className="options__ingredient">ingredient</li>
          <li className="options__ingredient">ingredient</li>
          <li className="options__ingredient">ingredient</li>
        </ul>
        <ol className="options__recipe-instructions">
          Instructions
          <li className="options__step">step1</li>
          <li className="options__step">step2</li>
          <li className="options__step">step3</li>
          <li className="options__step">step4</li>
          <li className="options__step">step5</li>
        </ol>
        <Link to={"/list"}>
          <div className="options__link">
            Get Your Shopping List {">"}
          </div>
        </Link>
      </div>
    </div>
  );
}
