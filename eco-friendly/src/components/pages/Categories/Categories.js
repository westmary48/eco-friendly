import React from 'react';
import PropTypes from 'prop-types';
import ecopointsShape from '../../../helpers/propz/ecopointShape';
import Category from '../Category/Category';
import './Categories.scss';

class Categories extends React.Component {
  static propTypes = {
    ecopoints: PropTypes.arrayOf(ecopointsShape),
  }

  render() {
    const { ecopoints } = this.props;
    const ecopointItemComponents = ecopoints.map(ecopoint => (
      <Category
      ecopoints={ecopoints}
      key={ecopoints.id}
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
