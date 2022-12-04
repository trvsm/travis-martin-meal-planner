import "./options.scss";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "../../components/recipe/Recipe";

const BACK_END = process.env.REACT_APP_BACK_END;

export default function Options() {
  const [recipes, setRecipes] = useState([]);
  // when a recipe is clicked on, set to active
  const [activeRecipe, setActiveRecipe] = useState({});

  useEffect(() => {
    // on page load get recipes.  May end up moving this state up to app if search implemented; landing will set state and pass down
    axios.get(`${BACK_END}/recipes`).then((response) => {
      setRecipes(response.data);

      // for testing set active to first item
      // setActiveRecipe(response.data[0]);
    });
  }, []);

  // don't invoke handler on element; it will run when element renders
  // there's a rerender that's clearing state

  
  const clickHandler = (event)=>{
    const clicked = event.target.id;
    // is setting correct recipe to state for a moment before cleared
    setActiveRecipe({});
    setActiveRecipe(recipes.filter((recipe) => recipe.idMeal === clicked));}

  return (
    <div className="options__wrapper">
      <div className="options__left">
        {/* list of search results or default meals */}
        <div className="options__meals">
          <h3 className="options__meals-title">Meals to choose from</h3>
          {/* will map through options to generate this list */}
          <>
            <fieldset className="options__meals-list">
              {Object.keys(recipes).length > 0 ? (
                recipes.map((recipe) => (
                  <label
                    htmlFor={recipe.idMeal}
                    onClick={clickHandler}
                    key={recipe.idMeal}
                  >
                    {recipe.strMeal}
                    <input
                      type="checkbox"
                      id={recipe.idMeal}
                      placeholder={recipe}
                      className="options__meals-item"
                    ></input>
                  </label>
                ))
              ) : (
                <label>loading...</label>
              )}
            </fieldset>
          </>
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
        {Object.keys(activeRecipe).length > 0 ? (
          <Recipe props={activeRecipe}/>
        ) : (<>
          <h3 className="options__recipe-title">
            Click a recipe to view details
          </h3>
        </>
        )}
        <Link to={"/list"}>
          <div className="options__link">Get Your Shopping List {">"}</div>
        </Link>
      </div>
    </div>
  );
}
