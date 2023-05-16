const Recipe = require('../models/Recipe')

module.exports = {
    getRecipes: async (req, res) => {
        try {
          const recipes = await Recipe.find({ user: req.user.id });
    
          res.json(recipes);
        } catch (err) {
          console.log(err);
        }
      },

      createRecipe: async (req, res) => {
        try {
          const recipe = await Recipe.create({
            title: req.body.title,
            ingredient: req.body.ingredient,
            instruction: req.body.instruction,
            userId: req.user.id,
          });
    
          recipe.save();
    
          res.json(recipe);
        } catch (err) {
          console.log(err);
        }
      },
      deleteRecipe: async (req, res) => {
        try {
          await Recipe.findByIdAndDelete(req.params.id);
    
          const recipe = await Recipe.find({ user: req.user.id });
    
          res.json(recipe);
        } catch (err) {
          console.log(err);
        }
      },
    };