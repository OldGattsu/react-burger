//файл селекторов ингредиентов
import { createSelector } from "reselect";

export const getIngredients = (store) => store[name].data;

export const getIngredientById = (id) => (store) => store[name].data.find(item => item._id === id);

export const getBuns = createSelector(getIngredients, (ingredients) =>
  ingredients.filter((item) => item.type === "bun")
);

export const getMains = createSelector(getIngredients, (ingredients) =>
  ingredients.filter((item) => item.type === "main")
);

export const getSauces = createSelector(getIngredients, (ingredients) =>
  ingredients.filter((item) => item.type === "sauce")
);