import React from 'react';

// import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../helpers/data/authRequests';
import ecousersRequest from '../../helpers/data/ecousersRequests';

import googleButton from '../images/googlebutton.png';


class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then((results) => {
      ecousersRequest.getEcoUserByUid(results.user.uid)
        .then((ecouserObject) => {
          if (!ecouserObject) {
            const newUserObject = {
              userName: `${results.user.displayName}`,
              points: 0,
              uid: `${results.user.uid}`,
            };
            ecousersRequest.createUser(newUserObject).then(() => {
              this.props.ecouserCreated();
            });
          } else {
            this.props.ecouserCreated();
          }
        });
    }).catch(err => console.error('there was an error with auth', err));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-danger" onClick={this.authenticateUser}>
          <img src={googleButton} alt="google login button" />
        </button>
      </div>
    );
  }
}

export default Auth;
