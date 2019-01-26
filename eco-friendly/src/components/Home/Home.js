import React, * as react from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import connection from '../../helpers/data/connections';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from '../pages/Categories/Categories';
import ecoPointsRequest from '../../helpers/data/ecopointsRequest';
import AddForm from '../pages/AddForm/AddForm';

class App extends react.Component {
 state = {
   authed: false,
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

 passEcopointToEdit = ecopointId => this.setState({ isEditing: true, editId: ecopointId });

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
        ecoPointsRequest.getRequest()
          .then((ecopoints) => {
            this.setState({ ecopoints });
          });
      })
      .catch(err => console.error('error with ecopoints post', err));
  }
}

render() {
  const passEcopointToEdit = (ecopointId) => {
    this.setState({ isEditing: true, editId: ecopointId });
  };
  const {
    ecopoints,
    isEditing,
    editId,
  } = this.state;
  return (
    <div className="Home">
        <Categories
        ecopoints={ecopoints}
        deleteSingleEcopoint={this.deleteOne}
        passEcopointToEdit={this.passEcopointToEdit}
        onListingSelection={this.ecopointSelectEvent}
        />
      ));
       <div className="row">
        <AddForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
        </div>
      </div>
  );
}
}

export default App;
