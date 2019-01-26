import React from 'react';
import './Home.scss';
import ecopointsRequest from '../../helpers/data/ecopointsRequest';
import EcoPoints from '../pages/EcoPoints/EcoPoints';
import Category from '../pages/Category/Category';
import Categories from '../pages/Categories/Categories';


class Home extends React.Component {
  state = {
    ecopoints: [],
    isEditing: false,
    editId: '-1',
  }

  componentDidMount() {
    ecopointsRequest.getAllEcopoints()
      .then((ecopoints) => {
        this.setState({ ecopoints });
      })
      .catch(err => console.error('error with ecopoints GET', err));
  }

 updateEcoPoints = (ecopointId, isCompleted) => {
   ecopointsRequest.updateEcopoint(ecopointId, isCompleted)
     .then(() => {
       ecopointsRequest.getAllEcopoints()
         .then((ecopoints) => {
           EcoPoints.sort((x, y) => x.isCompleted - y.isCompleted);
           this.setState({ ecopoints });
         });
     })
     .catch(err => console.error(err));
 }

 deleteEcoPoints = (ecopointId) => {
   ecopointsRequest.deletePoint(ecopointId)
     .then(() => {
       ecopointsRequest.getAllEcopoints()
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
      <div className="row">
        <Categories
          ecopoints={ecopoints}
          deleteSingleEcopoints={this.deleteOne}
          passPointToEdit={this.passPointToEdit}
        />
      </div>
    </div>
   );
 }
}

export default Home;
