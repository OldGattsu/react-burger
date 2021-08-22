import propTypes from 'prop-types';

const ingredientsPropTypes = propTypes.shape({
  name: propTypes.string,
  price: propTypes.number,
  image: propTypes.string,
  image_large: propTypes.string,
  calories: propTypes.number,
  proteins: propTypes.number,
  fat: propTypes.number,
  carbohydrates: propTypes.number,
})

export default ingredientsPropTypes