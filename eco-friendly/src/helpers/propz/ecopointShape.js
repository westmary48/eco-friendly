import PropTypes from 'prop-types';

const ecopointsShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
});

export default ecopointsShape;
