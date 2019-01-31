import React from 'react';
import './User.scss';
import ecousersShape from '../../../helpers/propz/ecouserShape';


class EcoUser extends React.Component {
  static propTypes = {
    ecouser: ecousersShape.ecousersShape,
  }

  render() {
    return (
        <div className = "userPoints">
        <h1>{this.props.ecouser.email}</h1>
        <h1>{this.props.ecouser.userName}</h1>
        <h1>{this.props.ecouser.points}</h1>

        </div>
    );
  }
}

export default EcoUser;
