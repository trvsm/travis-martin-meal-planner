import "./options.scss";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Recipe from "../../components/recipe/Recipe";
import MealOptions from "../../components/mealOptions/MealOptions";
import SelectedMeals from "../../components/selectedMeals/SelectedMeals";

const BACK_END = process.env.REACT_APP_BACK_END;

export default function Options() {
  const [recipes, setRecipes] = useState([]);

  // when checklist form submitted set all checked meals to state
  const [selected, setSelected] = useState([]);
  // filter recipes list displayed in options
  const [filtered, setFiltered] = useState([]);

  const [activeRecipe, setActiveRecipe] = useState({});

  useEffect(() => {
    // on page load get recipes.  May end up moving this state up to app if search implemented; landing will set state and pass down
    axios.get(`${BACK_END}/recipes`).then((response) => {
      setRecipes(response.data);
    });
  }, []);

  // don't invoke handler on the element using it, else it will run when element renders
  const clickHandler = (event) => {
    const clicked = event.target.id;
    // find the recipe that matches id of clicked recipe and set to state to display
    setActiveRecipe(recipes.filter((recipe) => recipe.idMeal === clicked));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // array to hold ids of checked recipes
    let checked = [];
    for (let index = 1; index < event.target.length; index++) {
      if (event.target[index].checked) {
        checked.push(event.target[index].id);
        console.log(checked);
      }
    }
    // will this work with spread operator, or start with checked = selected above?
    setFiltered(recipes.filter((recipe)=>checked.indexOf(recipe.idMeal)===-1))
    setSelected(recipes.filter((recipe)=>checked.indexOf(recipe.idMeal)!==-1))
  };


  return (
    <>
      <div className="options__wrapper">
        <div className="options__left">
          {/* list of search results or default meals */}
          <div className="options__meals">
            <h3 className="options__meals-title">Meals to choose from</h3>
            {/* will map through options to generate this list */}
            {Object.keys(filtered).length > 0 ? (
              <MealOptions
                props={filtered}
                clickHandler={clickHandler}
                submitHandler={submitHandler}
              />
            ) : (
              <MealOptions
                props={recipes}
                clickHandler={clickHandler}
                submitHandler={submitHandler}
              />
            )}
          </div>

          {/* list of user selected meals */}
          <div className="options__selected">
            <h3 className="options__selected-title">Selected Meals</h3>
            {/* will map through options to generate this list */}
            {Object.keys(selected).length > 0 ? (
              <SelectedMeals props={selected} clickHandler={clickHandler} />
            ) : (
              <p>please select meal options from above</p>
            )}
          </div>
        </div>

        {/* recipe for meal in focus */}
        <div className="options__recipes">
          {Object.keys(activeRecipe).length > 0 ? (
            <Recipe props={activeRecipe} />
          ) : (
            <>
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
    </>
  );
}
