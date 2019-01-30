import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
// import PropTypes from 'prop-types';
import './Auth.scss';
import SignUp from '../Register/Register';
import authRequests from '../../helpers/data/authRequests';

// import googleButton from '../images/googlebutton.png';

const defaultUser = {
  email: '',
  password: '',
};

class Auth extends React.Component {
  state = {
    existingUser: defaultUser,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    const { existingUser } = this.state;
    const emailInput = existingUser.email;
    const passwordInput = existingUser.password;
    authRequests.authenticate(emailInput, passwordInput);
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempUser = { ...this.state.existingUser };
    tempUser[name] = e.target.value;
    this.setState({ existingUser: tempUser });
  }

  emailChange = e => this.formFieldStringState('email', e);

  passwordChange = e => this.formFieldStringState('password', e);

  render() {
    const { existingUser } = this.state;
    return (
      <div className="Auth">
       <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="enter your email"
            value={existingUser.email}
            onChange={this.emailChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="enter your password"
            value={existingUser.password}
            onChange={this.passwordChange}
          />
        </FormGroup>
        <Button className="btn btn-dark mt-4" onClick={this.authenticateUser}>Login</Button>
        </Form>
        <SignUp />
      </div>
    );
  }
}

export default Auth;
//   static propTypes = {
//     isAuthenticated: PropTypes.func,
//   };

//   authenticateUser = (e) => {
//     e.preventDefault();
//     authRequests
//       .authenticate()
//       .then(() => {
//         this.props.isAuthenticated();
//       })
//       .catch(err => console.error('there was an error with auth', err));
//   };

//   render() {
//     return (
//       <div className="Auth">
//         <button className="btn btn-danger" onClick={this.authenticateUser}>
//           <img src={googleButton} alt="google login button" />
//         </button>
//       </div>
//     );
//   }
// }
