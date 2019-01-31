import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../../helpers/data/connections';
import Auth from '../Auth/Auth';
import authRequests from '../../helpers/data/authRequests';
import MyNavbar from '../MyNavbar/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from '../pages/Categories/Categories';
import ecoPointsRequest from '../../helpers/data/ecopointsRequest';
import AddForm from '../pages/AddForm/AddForm';
import EcoUser from '../pages/Users/User';
import ecousersRequest from '../../helpers/data/ecousersRequests';

class App extends Component {
 state = {
   authed: false,
   ecouser: {
     userName: '',
     points: 0,
   },
   ecopoints: [],
   isEditing: false,
   editId: '-1',
   selectedEcopointId: -1,
 }

 ecopointSelectEvent = (id) => {
   this.setState({
     selectedEcopointId: id,
   });
 }

 getEcouser = () => {
   const currentUid = authRequests.getCurrentUid();
   ecousersRequest.getEcoUserByUid(currentUid)
     .then((ecouser) => {
       this.setState({ ecouser });
     })
     .catch((error) => {
       console.error('error on users', error);
     });
 }

 getEcoPoints = () => {
   const currentUid = authRequests.getCurrentUid();
   ecoPointsRequest.getRequest(currentUid)
     .then((ecopoints) => {
       this.setState({ ecopoints });
     })
     .catch(err => console.error('error with ecopoint GET', err));
 }

 // Add UID
 componentDidMount() {
   connection();

   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({
         authed: true,
       });
       this.getEcoPoints();
       this.getEcouser();
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

 deleteOne = (ecopointId) => {
   ecoPointsRequest.deletePoints(ecopointId)
     .then(() => {
       ecoPointsRequest.getRequest()
         .then((ecopoints) => {
           this.setState({ ecopoints });
         });
     })
     .catch(err => console.error('error with delete single', err));
 }

formSubmitEvent = (newEcopoint) => {
  const { isEditing, editId } = this.state;
  if (isEditing) {
    ecoPointsRequest.putRequest(editId, newEcopoint)
      .then(() => {
        ecoPointsRequest.getRequest()
          .then((ecopoints) => {
            this.setState({ ecopoints, isEditing: false, editId: '-1' });
          });
      })
      .catch(err => console.error('error with ecopoints post', err));
  } else {
    ecoPointsRequest.postRequest(newEcopoint)
      .then(() => {
        const pointTotal = newEcopoint.points + this.state.ecouser.points;
        ecousersRequest.updateEcoUser(this.state.ecouser.id, { points: pointTotal })
          .then(() => {
            this.getEcouser();
          })
          .catch(err => console.error('error with ecopoints post', err));
        ecoPointsRequest.getRequest()
          .then((ecopoints) => {
            this.setState({ ecopoints });
          });
      })
      .catch(err => console.error('error with ecopoints post', err));
  }
}

passEcopointToEdit = ecopointId => this.setState({ isEditing: true, editId: ecopointId });

render() {
  const {
    authed,
    ecopoints,
    isEditing,
    editId,
  } = this.state;

  const logoutClickEvent = () => {
    authRequests.logoutUser();
    this.setState({ authed: false });
  };

  if (!authed) {
    return (
      <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
        <div className="row">
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent} />
      <div className="row">
        <Categories
        ecopoints={ecopoints}
        deleteSingleEcopoint={this.deleteOne}
        passEcopointToEdit={this.passEcopointToEdit}
        onListingSelection={this.ecopointSelectEvent}
        />
      </div>
      <div className="row">
        <AddForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>/>
      </div>
    <div className="row">
    <EcoUser
    ecouser={this.state.ecouser}
    />
    </div>
    </div>
  );
}
}

export default App;
