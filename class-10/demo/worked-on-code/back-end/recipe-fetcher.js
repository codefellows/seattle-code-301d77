const axios = require('axios');
const inMemoryDB = require('./cache');

async function getRecipes(request, response) {
  const ingredient = request.query.ingredient;


  // has the given ingredient already been fetched?
  if (inMemoryDB[ingredient]) {
    console.log('cache hit', ingredient);
    response.send(inMemoryDB[ingredient]);
    return;
  }

  console.log('cache miss', ingredient);

  const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;

  try {
    const searchResponse = await axios.get(url);

    const recipeArr = searchResponse.data.hits.map(recipe => new Recipe(recipe.recipe));

    inMemoryDB[ingredient] = recipeArr;

    response.status(200).send(recipeArr);

  } catch (err) {
    console.error('error', err);
    response.status(500).send('error', err);
  }
}

class Recipe {
  constructor(recipe) {
    this.uri = recipe.uri;
    this.label = recipe.label;
    this.image_url = recipe.image;
    this.ingredients = recipe.ingredientLines;
    this.totalTime = recipe.totalTime;
  }
}

module.exports = getRecipes;