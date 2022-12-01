import './list.scss';

import { Link } from 'react-router-dom';

export default function List() {
    return (
      <div className="list__wrapper">
        <h2 className="list__title">Your Shopping List</h2>
        <ul className="list__output">
          <li className="list__item">Milk 250ml</li>
          <li className="list__item">Eggs 6</li>
          <li className="list__item">Bread</li>
          <li className="list__item">Black Beans 783ml</li>
          <li className="list__item">Yogurt 550ml</li>
          <li className="list__item">Canned Tomatoes 1640ml</li>
        </ul>
        <Link to={"/"}>
          <div className="list__restart">
            Start Over {">"}
          </div>
        </Link>
      </div>
    );

}