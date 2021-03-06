fetch(
  "https://api.spoonacular.com/recipes/complexSearch?apiKey=cb1c464d94f142c08b156c5beddade8b&cuisine=european&number=10&addRecipeNutrition=true"
)
  .then((response) => response.json())
  .then((data) => {
    let recipeHtml = "";

    data.results.forEach((recipe) => {
      let ingredientsHtml = createIngredientsHtml(recipe.nutrition.ingredients);

      let nutrientsHtml = createNutrientsHtml(recipe.nutrition.nutrients);

      recipeHtml += createRecipeHtml(recipe, ingredientsHtml, nutrientsHtml);
    });

    setRecipeHtml(recipeHtml);
  });

function createIngredientsHtml(ingredients) {
  let ingredientsHtml = "";

  ingredients.forEach((ingredient) => {
    ingredientsHtml +=
      "<li>" +
      ingredient.name +
      ": " +
      ingredient.amount +
      " " +
      ingredient.unit +
      "</li>";
  });

  return ingredientsHtml;
}

function createNutrientsHtml(nutrients) {
  let nutrientsHtml = "";

  for (let i = 0; i < 9; i++) {
    const nutrient = nutrients[i];

    nutrientsHtml +=
      "<li>" +
      nutrient.title +
      ": " +
      nutrient.amount +
      nutrient.unit +
      "</li>";
  }

  return nutrientsHtml;
}

function createRecipeHtml(recipe, ingredientsHtml, nutrientsHtml) {
  let recipeHtml = "";

  recipeHtml += "<article>";
  recipeHtml += "<h2>" + recipe.title + "</h2>";
  recipeHtml += '<section class="summary">';
  recipeHtml += '<img src="' + recipe.image + '" alt="recipe thumbnail" />';
  recipeHtml += recipe.summary + "</section>";
  recipeHtml += '<section class="ingredientsAndNutrients">';
  recipeHtml += '<div class="ingredients">';
  recipeHtml += "<h3>Ingredients</h3>";
  recipeHtml += "<ul>";
  recipeHtml += ingredientsHtml;
  recipeHtml += "</ul>";
  recipeHtml += "</div>";
  recipeHtml += '<div class="nutrients">';
  recipeHtml += "<h3>Nutrients</h3>";
  recipeHtml += "<ul>";
  recipeHtml += nutrientsHtml;
  recipeHtml += "</ul>";
  recipeHtml += "</div>";
  recipeHtml += "</section>";
  recipeHtml += "</article>";

  return recipeHtml;
}

function setRecipeHtml(recipeHtml) {
  let main = document.querySelector("main");

  main.innerHTML = recipeHtml;
}
