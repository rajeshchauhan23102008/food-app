import RecipeDetailModel from './recipe-detail.model';
import * as RecipeDetailView from './recipe-detail.view';
import { DOMElements } from '../common/common.view';
import * as LikesView from '../likes/likes.view';

export const RecipeDetailModule = (() => {
  DOMElements.recipeDetailEl.addEventListener('click', e => {
    if (e.target.matches('.recipe-like, .recipe-like *')) {
      const recipeId = parseInt(window.location.hash.substr(1));

      if (!window.likes) {
        window.likes = [];
      }

      const recipeIndex = window.likes.indexOf(recipeId);
      let isLiked;
      // check if recipe is not in the list.
      if (recipeIndex === -1) {
        window.likes.push(recipeId);
        isLiked = true;
        //likes view.
        if (window.currentRecipe) {
          // const recipe = window.recipes.find(
          //   recipe => parseInt(recipe.idMeal) === recipeId
          // );
          LikesView.addRecipeLike(window.currentRecipe);
        }
      } else {
        window.likes.splice(recipeIndex, 1);
        isLiked = false;
        //likes view.
        LikesView.removeRecipeLike(recipeId);
      }

      // find element and set is like.
      const useEl = document.querySelector('.svg-like use');
      const hrefValue = isLiked
        ? 'content/img/icons.svg#icon-heart-solid'
        : 'content/img/icons.svg#icon-heart-regular';

      useEl.setAttribute('href', hrefValue);
    }
  });

  ['hashchange', 'load'].forEach(event => {
    window.addEventListener(event, async e => {
      const recipeId = parseInt(window.location.hash.substring(1));

      let recipeDetailModel = new RecipeDetailModel();

      const recipe = await recipeDetailModel.getRecipeDetail(recipeId);

      // get Recipe LIke;
      let isLiked = false;
      if (window.likes) {
        isLiked = window.likes.indexOf(recipeId) === -1 ? false : true;
      }

      if (recipe) {
        window.currentRecipe = recipe;
        const ingredients = recipeDetailModel.formatRecipeIngredients(recipe);
        RecipeDetailView.displayRecipeDetail(recipe, ingredients, isLiked);
      }
    });
  });
})();
