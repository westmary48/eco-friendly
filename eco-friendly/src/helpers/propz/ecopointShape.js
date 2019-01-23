import PropTypes from 'prop-types';

const ecopointsShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  points: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
});

export default ecopointsShape;
