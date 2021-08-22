import propTypes from 'prop-types';

const ingredientsPropTypes = propTypes.shape({
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  image: propTypes.string.isRequired,
  image_large: propTypes.string.isRequired,
  calories: propTypes.number.isRequired,
  proteins: propTypes.number.isRequired,
  fat: propTypes.number.isRequired,
  carbohydrates: propTypes.number.isRequired,
})

export default ingredientsPropTypes