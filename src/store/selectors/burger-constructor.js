//файл селекторов конструктора
const getBun = (store) => store[name].bun;
const getIngredients = (store) => store[name].ingredients;

export const getConstructorItems = createSelector(getBun, getIngredients, (bun, ingredients) => ({
  bun,
  ingredients,
}));

export const getPrice = createSelector(getBun, getIngredients, (bun, ingredients) => {
  return (bun ? bun.price * 2 : 0) + ingredients.reduce((s, v) => s + v.price, 0);
});

//возвращает объект с количеством каждого ингредиента в конструкторе
export const getIngredientsCounters = createSelector(
  getConstructorItems,
  ({ bun, ingredients }) => {
    const counters = {};
    ingredients.forEach((ingredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }
);