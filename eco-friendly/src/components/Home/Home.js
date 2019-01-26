import React from 'react';
import './Home.scss';
import firebase from 'firebase';
import ecopointsRequest from '../../helpers/data/ecopointsRequest';
import Categories from '../pages/Categories/Categories';
import AddForm from '../pages/AddForm/AddForm';


class Home extends React.Component {
  state = {
    ecopoints: [],
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    ecopointsRequest.getRequest()
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

  deleteOne = (ecopointId) => {
    ecopointsRequest.deletePoints(ecopointId)
      .then(() => {
        ecopointsRequest.getRequest()
          .then((ecopoints) => {
            this.setState({ ecopoints });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

 formSubmitEvent = (newEcopoint) => {
   const { isEditing, editId } = this.state;
   if (isEditing) {
     ecopointsRequest.putRequest(editId, newEcopoint)
       .then(() => {
         ecopointsRequest.getRequest()
           .then((ecopoints) => {
             this.setState({ ecopoints, isEditing: false, editId: '-1' });
           });
       })
       .catch(err => console.error('error with ecopoints post', err));
   } else {
     ecopointsRequest.postRequest(newEcopoint)
       .then(() => {
         ecopointsRequest.getRequest()
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
     ecopoints,
     isEditing,
     editId,
   } = this.state;


   return (
    <div>
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
        />
      </div>
   );
 }
}

export default Home;
