import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../helpers/data/connections';
import Auth from '../components/Auth/Auth';
import authRequests from '../helpers/data/authRequests';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from '../components/pages/Categories/Categories';
import ecoPointsRequest from '../helpers/data/ecopointsRequest';
import AddForm from '../components/pages/AddForm/AddForm';
import EcoUser from '../components/pages/Users/User';
import ecousersRequest from '../helpers/data/ecousersRequests';
import Friends from '../components/Friends/Friends';
import smashRequests from '../helpers/data/smashRequests';

class App extends Component {
 state = {
   authed: false,
   ecouser: {
     userName: '',
     points: 0,
     undiscoveredFriends: [],
     pendingFriendships: [],
   },
   ecopoints: [],
   isEditing: false,
   editId: '-1',
   selectedEcopointId: -1,
   ecouserCreated: false,
 }


 ecouserCreated = () => {
   this.setState({
     ecouserCreated: true,
   });
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
   smashRequests.getPointsFromMeAndFriends(currentUid);
   ecoPointsRequest.getRequest(currentUid)
     .then((ecopoints, myFriends) => {
       this.setState({ ecopoints, myFriends });
     })
     .catch(err => console.error('error with ecopoint GET', err));
 }

 componentDidMount() {
   connection();

   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.setState({
         authed: true,
         pending: false,
       });
     } else {
       this.setState({
         authed: false,
         pending: false,
       });
     }
   });
 }

 componentWillUnmount() {
   this.removeListener();
 }

 componentDidUpdate(prevProps, prevState) {
   if (!prevState.ecouserCreated && this.state.ecouserCreated && this.state.authed) {
     this.getEcoPoints();
     this.getEcouser();
   }
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

 ecoAlerts = () => {
   const ecoUserAlerts = [];
   ecoUserAlerts[0] = 'Recycling one aluminum can save enough energy to run a TV for three hours.';
   ecoUserAlerts[1] = 'Around 25,000 trees are cut down each day just to produce toilet paper.';
   ecoUserAlerts[2] = 'Approximately five million tons of oil produced in the world each year ends up in the ocean.';
   ecoUserAlerts[3] = ' Seventy-eight percent of marine mammals are threatened by accidental deaths, such as getting caught in fishing nets.';
   ecoUserAlerts[4] = 'A glass bottle can take 4,000 years to decompose.';
   ecoUserAlerts[5] = 'Rainforests are being cut down at a rate of 100 acres per minute.';
   ecoUserAlerts[6] = 'he United States is the No. 1 trash-producing country in the world.';
   ecoUserAlerts[7] = '8. Ford Motor Company has said that 75 percent of every vehicle is recyclable.';
   ecoUserAlerts[8] = 'If the entire world lived like the average American, we’d need five planets to provide enough resources.';
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
          <Auth
          isAuthenticated={this.authenticateUser}
          ecouserCreated= {this.ecouserCreated}
          />
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
        ecoAlerts= {this.ecoAlerts}
        />
      </div>
      <div className="row">
        <AddForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
</div>
<div className="row">
    <EcoUser
    ecouser={this.state.ecouser}
    />
    </div>
<div className="row">
 <Friends
 friends= {this.state.authed}
 />
 </div>
    </div>
  );
}
}

export default App;
