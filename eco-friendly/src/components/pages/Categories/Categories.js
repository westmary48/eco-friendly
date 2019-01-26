import React from 'react';
import PropTypes from 'prop-types';
import ecopointsShape from '../../../helpers/propz/ecopointShape';
import CategoryItem from '../CategoryItem/CategoryItem';
import './Categories.scss';

class Categories extends React.Component {
  static propTypes = {
    ecopoints: PropTypes.arrayOf(ecopointsShape.ecopointsShape),
    deleteSingleEcopoint: PropTypes.func,
    passPointToEdit: PropTypes.func,
  }

  render() {
    const {
      ecopoints,
      deleteSingleEcopoint,
      passEcopointToEdit,
      onEcopointSelection,

    } = this.props;
    const ecopointItemComponents = ecopoints.map(ecopoint => (
      <CategoryItem
        ecopoint={ecopoint}
        key={ecopoint.id}
        deleteSingleEcopoint={deleteSingleEcopoint}
        onSelect={onEcopointSelection}
        passEcopointToEdit={passEcopointToEdit}
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
