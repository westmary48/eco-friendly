import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connections';
import Auth from '../components/Auth/Auth';
import authRequests from '../helpers/data/authRequests';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Category from '../components/pages/Category/Category';
import Categories from '../components/pages/Categories/Categories';
import ecoPointsRequest from '../helpers/data/ecopointsRequest';
import AddForm from '../components/pages/AddForm/AddForm';

class App extends Component {
 state = {
   authed: false,
   ecopoints: [],
 }


 componentDidMount() {
   connection();
   ecoPointsRequest.getRequest()
     .then((ecopoints) => {
       this.setState({ ecopoints });
     })
     .catch(err => console.error('error with ecopoint GET', err));

   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({
         authed: true,
       });
     } else {
       this.setState({
         authed: false,
       });
     }
   });
 }

 componentWillUnmount() {
   this.removeListener();
 }

 isAuthenticated = () => {
   this.setState({ authed: true });
 }

 render() {
   const logoutClickEvent = () => {
     authRequests.logoutUser();
     this.setState({ authed: false });
   };

   if (!this.state.authed) {
     return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
        <div className="row">
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      </div>
     );
   }
   return (
    <div className="App">
      <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent} />
      <div className="row">
        <Categories ecopoints={this.state.ecopoints}/>
        <Category />
      </div>
      <div className="row">
        <AddForm />
      </div>
    </div>
   );
 }
}

export default App;
