import React from 'react';
import './User.scss';
import PropTypes from 'prop-types';
import ecousersRequest from '../../../helpers/data/ecousersRequests';
import authRequests from '../../../helpers/data/authRequests';
import ecousersShape from '../../../helpers/propz/ecouserShape';

const defaultUserProfile = {
  userName: '',
  points: 0,
  uid: '',
};

class EcoUser extends React.Component {
  static propTypes = {
    ecousers: PropTypes.arrayOf(ecousersShape.ecousersShape),
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    ecousers: [],
    isEditing: false,
    editId: '-1',
    newUser: defaultUserProfile,
  }

  formFieldStringUserState = (name, e) => {
    e.preventDefault();
    const tempEcouser = { ...this.state.tempEcouser };
    tempEcouser[name] = e.target.value;
    this.setState({ newUser: tempEcouser });
  }

    formFieldNumberState = (name, e) => {
      const tempEcouser = { ...this.state.newUser };
      tempEcouser[name] = e.target.value * 1;
      this.setState({ newUser: tempEcouser });
    }

    userNameChange = e => this.formFieldStringState('name', e);

    pointsUserChange = e => this.formFieldNumberState('points', e);

    formSubmit = (e) => {
      e.preventDefault();
      const { onSubmit } = this.props;
      const myAccount = { ...this.state.newUser };
      myAccount.uid = authRequests.getCurrentUid();
      onSubmit(myAccount);
      this.setState({ newUser: defaultUserProfile });
    }

    componentDidUpdate(prevProps) {
      const { isEditing, editId } = this.props;
      if (prevProps !== this.props && isEditing) {
        ecousersRequest.getSingleUser(editId)
          .then((ecouser) => {
            this.setState({ newUser: ecouser.data });
          })
          .catch(err => console.error('error with getSingleEcouser', err));
      }
    }

  getEcopoints = () => {
    const currentUid = authRequests.getCurrentUid();
    ecousersRequest.getUserByUid(currentUid)
      .then((ecousers) => {
        this.setState({ ecousers });
      })
      .catch((error) => {
        console.error('error on users', error);
      });
  }

  componentDidMount() {
    this.getEcopoints();
  }

  formSubmitPoints = (newUser) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      ecousersRequest.updateUser(editId, newUser)
        .then(() => {
          this.getUserByUid();
          this.setState({ isEditing: false, editId: '-1' });
        })
        .catch(err => console.error('error with ecousers post', err));
    } else {
      ecousersRequest.postUser(newUser)
        .then(() => {
          this.getUserByUid();
        })
        .catch(err => console.error('error with ecousers post', err));
    }
  };

  render() {
    const { newUser } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Add New User:</h2>;
      }
      return <h2>Add New User:</h2>;
    };
    return (
        <div className="ecopointForm col">
        {title()}
          <form onSubmit={this.formSubmitPoints}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Mary"
                value={newUser.userName}
                onChange={this.userNameChange}
              />
            <div className="form-group">
              <label htmlFor="userPoints">user points</label>
              <input
                type="text"
                className="form-control"
                id="points"
                placeholder="200"
                value={newUser.points}
                onChange={this.pointsUserChange}
              />
            </div>
            <button className="btn btn-danger">
              Save Points
            </button>
          </form>
          </div>
        </div>
    );
  }
  }

export default EcoUser;
