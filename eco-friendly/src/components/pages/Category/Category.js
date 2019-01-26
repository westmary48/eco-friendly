import React from 'react';
import ecopointShape from '../../../helpers/propz/ecopointShape';


class CategoryItem extends React.Component {
  static propTypes = {
    ecopoint: ecopointShape,
  }

  render() {
    const { ecopoint } = this.props;
    return (
        <li className="listing-item text-center">
          <span className="col-3">{ecopoint.name}</span>
          <span className="col-3">{ecopoint.category}</span>
          <span className="col-3">{ecopoint.points}</span>

        </li>
    );
  }
}

export default CategoryItem;
