import PropTypes from 'prop-types';

const ecousersShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
});

export default { ecousersShape };
