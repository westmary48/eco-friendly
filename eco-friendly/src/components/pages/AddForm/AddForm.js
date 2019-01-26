import React from 'react';
import './AddForm.scss';
import ecopointsRequest from '../../../helpers/data/ecopointsRequest';
import Home from '../../Home/Home';

class AddTrip extends React.Component {
  state= {
    ecopoints: [],
    authed: false,
    isEditing: false,
    editId: '-1',
  }

   formSubmitEvent = (newEcopoint) => {
     ecopointsRequest.postRequest(newEcopoint)
       .then(() => {
         ecopointsRequest.getTripData()
           .then((ecopoints) => {
             this.setState({ ecopoints });
           });
       })
       .catch(err => console.error(err));
   }

   render() {
     const {
       ecopoints,
       isEditing,
       editId,
     } = this.state;

     return (
      <div>
      <h2>AddForm Component</h2>
      <div className="row">
        <Home onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId}/>
      </div>
      </div>
     );
   }
}

export default AddTrip;
