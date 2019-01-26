import React from 'react';
import PropTypes from 'prop-types';
import ecopointsShape from '../../../helpers/propz/ecopointShape';
import CategoryItem from '../CategoryItem/CategoryItem';
import './Categories.scss';

class Categories extends React.Component {
  static propTypes = {
    ecopoints: PropTypes.arrayOf(ecopointsShape.ecopointsShape),
    deleteSingleEcopoints: PropTypes.func,
    passPointToEdit: PropTypes.func,
  }

  render() {
    const { ecopoints } = this.props;
    const ecopointItemComponents = ecopoints.map(ecopoint => (
      <CategoryItem
        ecopoint={ecopoint}
        key={ecopoint.id}
      />
    ));
    return (
      <div className="col">
        <h5>Ecopoints</h5>
        {ecopointItemComponents}
      </div>
    );
  }
}

export default Categories;
