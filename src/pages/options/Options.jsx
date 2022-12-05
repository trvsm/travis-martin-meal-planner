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
  // when a recipe is clicked on, set to active
  const [selected, setSelected] = useState([]);

  const [activeRecipe, setActiveRecipe] = useState({});

  useEffect(() => {
    // on page load get recipes.  May end up moving this state up to app if search implemented; landing will set state and pass down
    axios.get(`${BACK_END}/recipes`).then((response) => {
      setRecipes(response.data);
    });
  }, []);

  // don't invoke handler on element; it will run when element renders
  const clickHandler = (event) => {
    const clicked = event.target.id;
    // find the recipe that matches id of clicked recipe and set to state to display
    setActiveRecipe(recipes.filter((recipe) => recipe.idMeal === clicked));
  };

  // TODO: submithandler function that will set all selected meals to state
  const submitHandler = (event) => {
    event.preventDefault();
    // array to hold ids of checked recipes
    let checked = [];
    for (let index = 1; index < event.target.length; index++) {
      // if a checkbox is checked add id to checked array
      if (event.target[index].checked) {
        let checkMeal = {}
        checkMeal.id = event.target[index].id;
        // make sure there's a name accessible through event
        checkMeal.name = null;
        // push the object, not just property
        checked.push(checkMeal);
      }
    }
    // set all checked ids to state
    // is checked an array of objects? if so name and id
    // if I can get name and ID that's all i need for list sections
    setSelected(checked);
  };
  // TODO: add useEffect to set selected meals when checked is updated
  useEffect(()=>(selected.forEach(id => {
// for each id look at list if match add to array 

    console.log(id);
  })),[selected]);

  return (
    <>
      <div className="options__wrapper">
        <div className="options__left">
          {/* list of search results or default meals */}
          <div className="options__meals">
            <h3 className="options__meals-title">Meals to choose from</h3>
            {/* will map through options to generate this list */}
            {Object.keys(recipes).length > 0 ? (
              <MealOptions
                props={recipes}
                clickHandler={clickHandler}
                submitHandler={submitHandler}
              />
            ) : (
              <p>no meal options available, start over?</p>
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
