import PropTypes from 'prop-types';

const ecopointsShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
});

export default { ecopointsShape };
