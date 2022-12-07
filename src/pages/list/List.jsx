import './list.scss';

import { Link } from 'react-router-dom';

export default function List() {
  // list will get passed a bunch of arrays, sum them then map through all ingredients
  let ingredients =
 [ [ 'Chicken Stock', 711, 'mL' ],
  [ 'Salt', 1.25, 'mL' ],
  [ 'Sugar', 1.25, 'mL' ],
  [ 'Pepper', 0.31, 'mL' ],
  [ 'Sesame Seed Oil', 5, 'mL' ],
  [ 'Peas', 79, 'mL' ],
  [ 'Mushrooms', 79, 'mL' ],
  [ 'Cornstarch', 15, 'mL' ],
  [ 'Water', 30, 'mL' ],
  [ 'Spring Onions', 59.25, 'mL' ]
]
    return (
      <div className="list__wrapper">
        <h2 className="list__title">Your Shopping List</h2>
        <ul className="list__output">
          {Object.keys(ingredients).length>0?(
            ingredients.map((ingredient)=>(
            <li key={ingredient[0]} className='list__item'>{ingredient[0]}: {ingredient[1]} {ingredient[2]}</li>))
          ):(
            <li>loading...</li>
          )}
        </ul>
        <Link to={"/"}>
          <div className="list__restart">
            Start Over {">"}
          </div>
        </Link>
      </div>
    );

}