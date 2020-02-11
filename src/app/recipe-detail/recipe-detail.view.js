import { DOMElements } from '../common/common.view';
import Ingredient from '../common/ingredient.model';

export function displayRecipeDetail(recipe, ingredients, isLiked = false) {
  DOMElements.recipeDetailEl.innerHTML = '';

  DOMElements.recipeDetailEl.insertAdjacentHTML(
    'beforeend',
    getRecipeDetailInfoMarkup(recipe, isLiked)
  );
  DOMElements.recipeDetailEl.insertAdjacentHTML(
    'beforeend',
    getRecipeIngredientsMarkup(ingredients)
  );
}

function getRecipeDetailInfoMarkup(recipe, isLiked = false) {
  return `<div class="row detail-top">
  <div class="col-2 ">
    <button
        class="recipe-like btn btn-outline-light"
      >
        <svg class="svg-like">
          <use
            href="content/img/icons.svg#${
              isLiked ? 'icon-heart-solid' : 'icon-heart-regular'
            }"
          ></use>
        </svg>
      </button>
    
  </div>
  <div class="col-10 text-center text-uppercase">
    <blockquote class="blockquote text-center">
      <p class="">
        <h3>${recipe.strMeal}</h3>
      </p>
      
    </blockquote>
  </div>
  
</div>
<div class="row detail-img">
  <div class="col">
    <a
              class="text-light  "
              href="${recipe.strSource ? recipe.strSource : recipe.strYoutube}"
              target="_blank"
            >
            
            
    <img
      src="${recipe.strMealThumb}"
      alt="${recipe.strMeal}"
      class="recipe-img img-thumbnail img-fluid"
    />
  </a>
   
</div>
</div>`;
}
function getRecipeIngredientsMarkup(ingredients) {
  let ingredientMarkup = `<div class="row detail-ingredients">
  <div class="col">
    <div class="row">
      <div class="col mt-3">
        <h4>
          <span class="text-light"><u>Ingredients</u></span>
        </h4>
      </div>
    </div>
    <div class="row text-left">
      <div class="col">
        <div class="recipe-ingredients">
          <ul
            class="list-group recipe-ingredient-list"
          >##ingredient-list##
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>`;

  let ingItemArr = [];
  for (let item of ingredients) {
    ingItemArr.push(
      `<li class="recipe-item">
      <div class="">${item.quantity} ${item.name}</div>
    </li>`
    );
  }

  let output = ingredientMarkup.replace(
    '##ingredient-list##',
    ingItemArr.join('')
  );

  return output;
}
