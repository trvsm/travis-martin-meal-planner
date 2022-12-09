// while populating combined list if there is a missing key populate with 1

// setup regular expressions for matching object fields and measurement terms
export const ingredientMatch = /ingredient/i;
export const measurementMatch = /measure/i;

// match any letters to separate unit from quantity
const letterMatch = /[a-z]/;

// to match dicrete quantities eg: carrot: 1, egg(s): 1

// const noLetterMatch = /[^a-z]/gi;
/* ??Do I want to leave discrete unconverted??  */

// ensure cases where conversions are in measure just take first instance

// match pinch. I see examples with simply pinch or 1 pinch... any case for 2?  probably simply convert to ml

// match "can"

// case where there's numbers & letters but no matched unit eg: bread: 8 slices
// strip letters and compute as discrete

// to match pure descriptive terms eg: sprinkle, to serve
// TODO: unused, remove?

// const noNumberMatch = /[^0-9^/^.]/;

/**
 * Takes an array, uses a regular expresssion to locate a group of similarly named keys, add them to a target output array
 * @param {an array, likely result of Object.entries() featuring a number of keys with similar names to extract values} inputArray
 * @param {a regular expression to match desired entries} targetKey
 * @param {a destination for the values associated with each instance of targetKey} outputArray
 */
export const mapNonEmpty = (inputArray, targetKey) => {
  const output = [];
  inputArray.map((entry) => {
    if (entry[0].match(targetKey)) {
      if (entry[1]) {
        // if truthy; if field is not empty push the value to output.  Since this is a flattened object desired value should always be index 1.
        output.push(entry[1]);
      }
    }
  });
  return output;
};

/**
 * Separate array string entries of combined quantity and unit so numerical quantity can be computed
 * @param {string[]} valuePlusUnit with string entries containing quantity followed by unit
 * @param {RegExp} matchExpression: a regular expression to determine where to separate field; often will match on /[a-z]/ to separate units with english letter names
 */
const separateUnits = (valuePlusUnit, matchExpression) => {
  let output = [];
  valuePlusUnit.forEach((element, index) => {
    // exec method returns an object including index of match
    let execOutput = matchExpression.exec(element);
    // slice from start of string to index to return number. May include fractions eg 3/4.  will compute fraction to number later

    let value;
    let unit;
    // need a condition here if execOutput falsy
    if (!execOutput) {
      value = element;
      unit = "";
      output[index] = [value.toString(), unit];
      return;
    }
    // if no number is returned set value to 1, eg; clove => 1 clove
    if (!element.slice(0, execOutput.index)) {
      value = 1;
    } else {
      value = element.slice(0, execOutput.index);
    }
    // slice from index to end of string to return unit
    // if the first character is a letter should be a discrete measure eg: pinch
    if (execOutput.index === 0) {
      unit = element;
    } else {
      unit = element.slice(execOutput.index);
    }
    output[index] = [value.toString(), unit];
  });
  return output;
};
/**
 *
 * @param {Array} nameArray  with name of field eg: <ingredient name>
 * @param {Array} valueArray with value corresponding to name above
 */

const correlate = (nameArray, valueArray) => {
  let output = [];
  for (let i = 0; i < nameArray.length; i++) {
    // if value array is empty here set value to one eg: cinnamon stick
    if (!valueArray[i]) {
      output.push([nameArray[i], 1, ""]);
    } else {
      output.push([nameArray[i], valueArray[i][0], valueArray[i][1]]);
    }
  }
  return output;
};
const convertFraction = (inputArray) => {
  let output = [];
  let value;
  inputArray.forEach((element) => {
    let quantity = element[0];
    if (quantity.match(/[/]/g)) {
      let execOutput = /[/]/g.exec(quantity);
      let leadingInteger;
      let numerator;
      let denominator;
      // execOutput.index > 1 means character 0 should be integer
      if (execOutput.index > 1) {
        leadingInteger = quantity[0];
        // character at index preceeding / (execOutput.index) is top of fraction
        numerator = quantity[execOutput.index - 1];
        denominator = quantity[execOutput.index + 1];
        value = leadingInteger + numerator / denominator;
      }
      if (execOutput.index === 1) {
        numerator = quantity[execOutput.index - 1];
        denominator = quantity[execOutput.index + 1];
        value = numerator / denominator;
      }
    } else {
      value = quantity;
    }
    output.push([value, element[1]]);
  });
  return output;
};

// this function takes an array with a number of non-standardized food measurements and converts as many as possible to mL
// cases more specific to more general: kg then g, tbsp then tsp
const convertMeasures = (arrayWithMeasures, indexOfValue, indexOfUnit) => {
  let output = [];
  arrayWithMeasures.forEach((element) => {
    let name = element[0];
    const quantity = element[indexOfValue];
    const unit = element[indexOfUnit];
    let value;
    if (unit === "") {
      // discrete quantity; call spoonacular for a conversion using ingredient name
      return console.log(`call Spoonacular for ${name}`);
    }
    if (unit.match(/pinch/i)) {
      value = quantity * 0.31;
      output.push([name, value, "ml"]);
      return output;
    }
    if (unit.match(/[lp][bo]/ig)) {
      value = quantity * 454;
      output.push([name, value, "ml"]);
      return output;
    }
    if (unit.match(/cup/gi)) {
      value = quantity * 237;
      output.push([name, value, "ml"]);
      return output;
    }
    if (unit.match(/t[ab][bls]/gi)) {
      // expression to match tablespoon: tbs, tbsp, tblsp
      value = quantity * 15;
      output.push([name, value, "ml"]);
      return output;
    }
    if (unit.match(/g(?:ram)?(?!r)/gi)|| unit.match(/m[il]/ig)) {
      // expression to match teaspoon: tsp, teaspoon
      value = quantity;
      output.push([name, value, "ml"]);
      return output;
    } else {
      // add item to an array that will be returned to user to ask what to do
      console.log(element);
    }
    // output.push([name, value, "ml"]);
  });
  return output;
};
// possibly improve this by populating an empty array instead of messing with an existing one

// success!  all ingredients converted to mL.  This is not perfectly accurate but will serve to build a reasonable shopping list!
// console.log(correlatedIngredients);

export const ingredientTracker = (recipeList) => {
  let shoppingList = [];
  for (let recipeIndex = 0; recipeIndex < recipeList.length; recipeIndex++) {
    // for each remaining ingredients compare to what's in output array
    // if match add to existing, else create new entry
    let ingredients = recipeList[recipeIndex];
    ingredients.forEach(
      //comparison: an ingredient in a recipe
      (ingredient) => {
        let currentList = [];
        // add each ingredient name in output to new array to check against
        shoppingList.forEach((element) => {
          currentList.push(element[0]);
        });
        // if current ingredients contains ingredient add ingredient quantity to existing quantity
        if (currentList.find((element) => element === ingredient[0])) {
          //   for each entry in output array, if element[0](ingredient name) matches ingredient[0] add quantity
          shoppingList.forEach((element) => {
            if (element[0] === ingredient[0]) {
              // element[1] & ingredient[1] hold logged and current quantities of ingredient respectively
              element[1] += ingredient[1];
            }
          });
        } else {
          // if entry doesn't exist add it to output
          shoppingList = [...shoppingList, ingredient];
        }
      }
    );
  }
  return shoppingList;
};

export const recipeToIngredients = (recipe) => {
  const entries = Object.entries(recipe);
  const ingredients = mapNonEmpty(entries, ingredientMatch);
  const measures = mapNonEmpty(entries, measurementMatch);
  const measureAndUnit = separateUnits(measures, letterMatch);
  const fractionFree = convertFraction(measureAndUnit);
  const matchIngredMeas = correlate(ingredients, fractionFree);
  const standardizedMeas = convertMeasures(matchIngredMeas, 1, 2);
  return standardizedMeas;
};

export const allSelectedIngredients = (meals) => {
  let output = [];
  meals.forEach((meal) => {
    output.push(recipeToIngredients(meal));
  });
  return output;
};

// console.log(something(pair));
