import React from 'react';
import PropTypes from 'prop-types';
import ecopointsRequest from '../../../helpers/data/ecopointsRequest';

const defaultEcopoint = {
  name: '',
  points: 0,
  category: '',
  uid: '',
};


class AddForm extends React.Component {
    static propTypes = {
      onSubmit: PropTypes.func,
      isEditing: PropTypes.bool,
      editId: PropTypes.string,
    }

    state = {
      newEcopoint: defaultEcopoint,
    }

    formSubmitEvent = (newEcopoint) => {
      ecopointsRequest.postRequest(newEcopoint)
        .then(() => {
          ecopointsRequest.getRequest()
            .then((ecopoints) => {
              this.setState({ ecopoints });
            });
        })
        .catch(err => console.error(err));
    }

    render() {
      const { ecopoints } = this.state;
      return (
      <div className="add-form col">
        <AddForm onSubmit= {this.formSubmitEvent}/>
      </div>
      );
    }
}

export default AddForm;
