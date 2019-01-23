import React from 'react';
import './Home.scss';
import firebase from 'firebase';
import ecopointsRequest from '../../helpers/data/ecopointsRequest';
import authRequests from '../../helpers/data/authRequests';


class Home extends React.Component {
  state = {
    authed: false,
    ecopoints: [],
    ecousers: [],
    isEditing: false,
    editId: '-1',
    selectedEcopointId: -1,
  }

    changeView = (e) => {
      const view = e.currentTarget.id;
      this.props.history.push(`/${view}`);
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
render ()
