// import axios from '../../../node_modules/axios/lib/axios.js';
import axios from 'axios';

export class RecipeSearchListModel {
  async searchRecipe(recipeName) {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeName}`
      );

      localStorage.setItem('recipes', JSON.stringify(response.data.meals));
      window.recipes = response.data.meals;
    } catch (error) {
      console.log(error);
    }
  }
}
