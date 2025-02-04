// this is more conventional list tool
// TODO: display list items with checkbox
// TODO: support adding entries directly to list
// TODO: save list to save to database
// TODO: export to markdown
// TODO: export to email

import { useState } from "react";
import IngredientInput from "../../components/ingredientInput/IngredientInput";
import axios from "axios";

// State I might need: list length, list contents

export default function ListTool() {
  const saveIngredToList = (values) => {
    console.log(values);
    setGrocList([...grocList, values]);
  };
  const [grocList, setGrocList] = useState([]);
  // need function to take contents and set to state, then clear contents

  return (
    <div className="contrast__output">
      <div>
        <h2>Build A Conventional Shopping List here</h2>
        <IngredientInput ingredientNum={0} buttonClick={saveIngredToList} />
      </div>
      <div>
        {grocList.length ? (
          grocList.map((item, index) => {
            return (
              <div key={index}>
                <input type="checkbox" />
                {`${item.quantity} ${item.unit} of: ${item.ingredient}`}
              </div>
            );
          })
        ) : (
          <p>Shopping List items will show here</p>
        )}
        {/* TODO: take current state, save to database
        database needs an endpoint that accepts post
        need some sort of value tied to database obj for retrieval
        need some ui to make this happen
        */}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          axios
            .post(
              "http://localhost:1024/save-list",
              //need an obj with key here
              { data: JSON.stringify(grocList) }
            )
            .then((res) => {
              console.log(res);
            });
          // console.log(JSON.stringify(grocList));
        }}
      >
        Save This Shopping List
      </button>
    </div>
  );
}
