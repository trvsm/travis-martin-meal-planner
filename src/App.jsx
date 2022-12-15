import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Landing from "./pages/landing/Landing";
import List from "./pages/list/List";
import Options from "./pages/options/Options";

const BACK_END = process.env.REACT_APP_BACK_END;

function App() {
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
    const checked = [];
    for (let index = 1; index < event.target.length; index++) {
      if (event.target[index].checked) {
        checked.push(event.target[index].id);
      }
    }
    // will this work with spread operator, or start with checked = selected above?
    setFiltered(
      recipes.filter((recipe) => checked.indexOf(recipe.idMeal) === -1)
    );
    setSelected(
      recipes.filter((recipe) => checked.indexOf(recipe.idMeal) !== -1)
    );
  };
  const buttonHandler = () => {
    setFiltered(recipes);
    setSelected([]);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/meals"
          element={
            <Options
              filtered={filtered}
              selected={selected}
              activeRecipe={activeRecipe}
              recipes={recipes}
              clickHandler={clickHandler}
              submitHandler={submitHandler}
              buttonHandler={buttonHandler}
            />
          }
        />
        <Route path="/list" element={<List selected={selected} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
