import React from 'react';
import PropTypes from 'prop-types';
import ecopointsShape from '../../../helpers/propz/ecopointShape';
import authRequests from '../../../helpers/data/authRequests';


class CategoryItem extends React.Component {
  static propTypes = {
    ecopoint: ecopointsShape.ecopointsShape,
    deleteSingleEcopoint: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleEcopoint, ecopoint } = this.props;
    deleteSingleEcopoint(ecopoint.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passEcopointToEdit, ecopoint } = this.props;
    passEcopointToEdit(ecopoint.id);
  }

  EcopointClick = (e) => {
    e.stopPropagation();
    const { ecopoint, onSelect } = this.props;
    onSelect(ecopoint.id);
  }

  render() {
    const { ecopoint } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (ecopoint.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <li className="listing-item text-center" onClick={this.listingClick}>
        <span className="col-7">{ecopoint.name}</span>
        <span className="col-7">{ecopoint.category}</span>
        <span className="col-3">{ecopoint.points}</span>
        {makeButtons()}
      </li>
    );
  }
}

export default CategoryItem;
