// this is more conventional list tool
// TODO: display list items with checkbox
// TODO: support adding entries directly to list
// TODO: save list to save to database
// TODO: export to markdown
// TODO: export to email

import { useState } from "react";
import IngredientInput from "../../components/ingredientInput/IngredientInput";

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
                {`${grocList[index].quantity} ${grocList[index].unit} of: ${grocList[index].ingredient}`}
              </div>
            );
          })
        ) : (
          <p>Shopping List items will show here</p>
        )}
        {/* need input and plus button */}
      </div>
    </div>
  );
}
