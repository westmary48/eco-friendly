import React from 'react';
import './Home.scss';
import ecopointsRequest from '../../helpers/data/ecopointsRequest';
import authRequests from '../../helpers/data/authRequests';
import EcoPoints from '../pages/EcoPoints/EcoPoints';


class Home extends React.Component {
  state = {
    ecopoints: [],
  }

  getAllPoints() {
    const uid = authRequests.getCurrentUid();
    ecopointsRequest.getAllEcopoints(uid)
      .then((ecopoints) => {
        this.setState({ ecopoints });
      })
      .catch(err => console.error('error in getAllPoints', err));
  }

  componentDidMount() {
    this.getAllPoints();
  }

  render() {
    const printEcoPoints = this.state.ecopoints.map(ecopoint => (
        <EcoPoints
          ecopoint={ecopoint}
          key={ecopoint.id}
        />
    ));
    return (
  <div className="home col">
  <h2>ecopoints</h2>
  <ul>{printEcoPoints}</ul>
</div>
    );
  }
}
export default Home;
