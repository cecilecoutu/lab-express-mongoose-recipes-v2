const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
const mongoose = require("mongoose");
// DATABASE CONNECTION
// app.js
//...

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route

// Import your Recipe model
const Recipe = require("../models/Recipe");

// POST /recipes route
router.post("/recipes", async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    // Create a new recipe document
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
    });

    // Save the recipe to the database
    await newRecipe.save();

    // Respond with a success status code and the created recipe
    res.status(201).json(newRecipe);
  } catch (error) {
    // Handle errors, respond with a 500 status code and an error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the router for use in your main application file
module.exports = router;

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res) => {
  Recipe.find().then((allRecipes) => {
    res.status(200).json(allRecipes);
  });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while getting a single recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updateRecipe) => {
      res.status(200).json(updateRecipe);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while updating a single recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ message: "Error while deleting a single recipe" });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
