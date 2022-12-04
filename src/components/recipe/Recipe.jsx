
export default function Recipe(props){
console.log(props)
    return (
      <>
        <h3 className="recipe__title">{props.props[0].strMeal}</h3>
        <h5 className="recipe__label">source:</h5>
        <a href={props.props[0].strSource} className="recipe__source">
          {props.props[0].strSource}
        </a>
        <div className="recipe__specs">
          <h5 className="recipe__label">cuisine:</h5>
          <p className="recipe__cuisine">{props.props[0].strArea}</p>
          <h5 className="recipe__label">category:</h5>
          <p className="recipe__category">{props.props[0].strCategory}</p>
        </div>
        <h5 className="recipe__label">instructions:</h5>
        <p className="recipe__description">
          {props.props[0].strInstructions}
        </p>
        <ul className="recipe__recipe-ingredients">
          Ingredients
          <li className="recipe__ingredient">ingredient</li>
          <li className="recipe__ingredient">ingredient</li>
          <li className="recipe__ingredient">ingredient</li>
          <li className="recipe__ingredient">ingredient</li>
          <li className="recipe__ingredient">ingredient</li>
          <li className="recipe__ingredient">ingredient</li>
        </ul>
      </>
    );
}