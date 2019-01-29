import PropTypes from 'prop-types';

const ecousersShape = PropTypes.shape({
  userName: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
});

export default { ecousersShape };
