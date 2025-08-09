const connectDB = require('./db');
const Recipe = require('./models/recipe');

connectDB();

const createRecipe = async () => {
    const newRecipe = new Recipe({
        title: 'Classic Tomato Soup',
        description: 'A simple and delicious homemade tomato soup.',
        ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable Broth', 'Olive Oil'],
        instructions: '1. Sauté onions and garlic. 2. Add tomatoes and broth. 3. Simmer and blend.',
        prepTimeInMinutes: 30
    });

    try {
        const savedRecipe = await newRecipe.save();
        console.log('Recipe Created:\n', savedRecipe);
    } catch (error) {
        console.error('Error creating recipe:', error.message);
    }
};

const findAllRecipes = async () => {
    try {
        const recipes = await Recipe.find();
        console.log('All Recipes:\n', recipes);
    } catch (error) {
        console.error('Error finding recipes:', error.message);
    }
};

const findRecipeByTitle = async (title) => {
    try {
        const recipe = await Recipe.findOne({ title });
        console.log(`Recipe with title "${title}":\n`, recipe);
    } catch (error) {
        console.error('Error finding recipe:', error.message);
    }
};

const updateRecipeDescription = async (title, newDescription) => {
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate(
            { title },
            { description: newDescription },
            { new: true } // Return the updated document
        );
        console.log('Updated Recipe:\n', updatedRecipe);
    } catch (error) {
        console.error('Error updating recipe:', error.message);
    }
};

const deleteRecipe = async (title) => {
    try {
        const result = await Recipe.findOneAndDelete({ title });
        if (result) {
            console.log(`Recipe "${title}" deleted successfully.`);
        } else {
            console.log(`Recipe "${title}" not found.`);
        }
    } catch (error) {
        console.error('Error deleting recipe:', error.message);
    }
};
