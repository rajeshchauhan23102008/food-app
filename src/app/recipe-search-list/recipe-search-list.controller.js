import { RecipeSearchListModel } from './recipe-search-list.model';
// import { recipeName, displayRecipes } from './recipe-search-list.view';
import * as RecipeSearchListView from './recipe-search-list.view';
import { DOMElements } from '../common/common.view';

export const RecipeSearchListModule = (() => {
  window.addEventListener('load', () => {
    window.recipes = [];
    const recipes = localStorage.getItem('recipes');

    if (recipes) {
      window.recipes = JSON.parse(recipes);
      RecipeSearchListView.displayRecipes(window.recipes);
    }
  });

  DOMElements.recipeListEl.addEventListener('click', e => {
    RecipeSearchListView.highlighter(e.target);
  });

  DOMElements.paginationEl.addEventListener('click', e => {
    const paginationBtn = e.target.closest('button');

    if (paginationBtn) {
      const pageNumber = parseInt(paginationBtn.dataset['goto']);

      RecipeSearchListView.displayRecipes(window.recipes, pageNumber);
    }
  });

  DOMElements.searchBtnEl.addEventListener('click', async e => {
    e.preventDefault();

    RecipeSearchListView.clearRecipeList();
    const recipeSearchListModel = new RecipeSearchListModel();

    RecipeSearchListView.displayLoader();

    await recipeSearchListModel.searchRecipe(
      RecipeSearchListView.getRecipeName()
    );

    RecipeSearchListView.hideLoader();

    if (window.recipes) {
      RecipeSearchListView.displayRecipes(window.recipes);
    }
  });
})();
