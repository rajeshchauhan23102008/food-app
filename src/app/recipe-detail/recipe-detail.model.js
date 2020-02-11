import axios from 'axios';
import Ingredient from '../common/ingredient.model';

export default class RecipeDetailModel {
  // https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

  async getRecipeDetail(recipeId) {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      );

      if (response && response.data && response.data.meals) {
        return response.data.meals[0] ? response.data.meals[0] : null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  formatRecipeIngredients(recipe) {
    // format recipe ingredients from individual 20 variables to an array.

    /* Sample data:

    Ingredient Name variable samples

    strIngredient1: "soy sauce",
    strIngredient2: "water",

    Ingredient Quantity and Measurement Unit.

    strMeasure1: "3/4 cup",
    strMeasure2: "1/2 cup",

    NOTE: variables with blank and null values should be ignore.

    */

    const ingredients = [];

    const ingredientsName = [];
    const ingredientQtyAndUnit = [];

    for (let key in recipe) {
      if (key.includes('strIngredient') && recipe[key]) {
        // can also use key.startWith('strIngredient') method
        // console.log(key);
        ingredientsName.push(recipe[key]);
      } else if (key.includes('strMeasure') && recipe[key]) {
        // console.log(key);
        ingredientQtyAndUnit.push(recipe[key]);
      }
    }

    for (let i = 0; i < ingredientsName.length; i++) {
      ingredients.push(
        new Ingredient(ingredientsName[i], ingredientQtyAndUnit[i])
      );
    }

    // console.log(ingredients);

    return ingredients;
  }
}
