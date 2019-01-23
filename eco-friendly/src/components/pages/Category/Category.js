import React from 'react';
import ecopointsShape from '../../../helpers/propz/ecopointShape';
import './Category.scss';

class Category extends React.Component {
  static propTypes = {
    ecopoints: ecopointsShape,
  }

  render() {
    const { ecopoints } = this.props;
    return (
      <div className="card border-secondary">
        <div className="card-body">
        <h5 className="card-title">{ecopoints.name}</h5>
        <p className="card-text">{ecopoints.points}</p>
        <p className="card-text">{ecopoints.category}</p>
        </div>
      </div>
    );
  }
}

export default Category;
