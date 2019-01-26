import React from 'react';
import PropTypes from 'prop-types';
import ecopointsRequest from '../../../helpers/data/ecopointsRequest';
import authRequests from '../../../helpers/data/authRequests';

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

    formFieldStringState = (name, e) => {
      e.preventDefault();
      const tempEcopoint = { ...this.state.newEcopoint };
      tempEcopoint[name] = e.target.value;
      this.setState({ newEcopoint: tempEcopoint });
    }

      formFieldNumberState = (name, e) => {
        const tempEcopoint = { ...this.state.newEcopoint };
        tempEcopoint[name] = e.target.value * 1;
        this.setState({ newEcopoint: tempEcopoint });
      }

      nameChange = e => this.formFieldStringState('name', e);

      categoryChange = e => this.formFieldStringState('category', e);

      pointsChange = e => this.formFieldNumberState('points', e);

      formSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const myEcopoint = { ...this.state.newEcopoint };
        myEcopoint.uid = authRequests.getCurrentUid();
        onSubmit(myEcopoint);
        this.setState({ newEcopoint: defaultEcopoint });
      }

      componentDidUpdate(prevProps) {
        const { isEditing, editId } = this.props;
        if (prevProps !== this.props && isEditing) {
          ecopointsRequest.getSinglePoint(editId)
            .then((ecopoint) => {
              this.setState({ newEcopoint: ecopoint.data });
            })
            .catch(err => console.error('error with getSingleEcopoint', err));
        }
      }

      // formSubmitEvent = (newEcopoint) => {
      //   ecopointsRequest.postRequest(newEcopoint)
      //     .then(() => {
      //       ecopointsRequest.getRequest()
      //         .then((ecopoints) => {
      //           this.setState({ ecopoints });
      //         });
      //     })
      //     .catch(err => console.error(err));
      // }
      render() {
        const { newEcopoint } = this.state;
        const { isEditing } = this.props;
        const title = () => {
          if (isEditing) {
            return <h2>Add New Ecopoint:</h2>;
          }
          return <h2>Add New Ecopoint:</h2>;
        };
        return (
              <div className="ecopointForm col">
              {title()}
                <form onSubmit={this.formSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Ate locally"
                      value={newEcopoint.name}
                      onChange={this.nameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">category</label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      placeholder="Food"
                      value={newEcopoint.category}
                      onChange={this.categoryChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="points">points</label>
                    <input
                      type="text"
                      className="form-control"
                      id="points"
                      placeholder="10"
                      value={newEcopoint.url}
                      onChange={this.pointsChange}
                    />
                  </div>
                  <button className="btn btn-danger">
                    Save Ecopoints
                  </button>
                </form>
              </div>
        );
      }
}
export default AddForm;
