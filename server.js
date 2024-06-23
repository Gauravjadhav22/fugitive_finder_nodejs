import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { cities, vehicles } from "./data.js"
import { getResult, getSelections, postSelections, resetResult } from "./controller.js"

dotenv.config();

// Initialize the app
export const app = express();
const port = process.env.PORT || 5550;

// Middleware
app.use(cors());
app.use(express.json());



// Endpoints

// Get all cities
app.get('/cities', (req, res) => {
  res.status(200).json(cities);
});

// Get all vehicles
app.get('/vehicles', (req, res) => {
  res.status(200).json(vehicles);
});

// Submit cop selections
app.get('/selections', getSelections);
app.post('/selections', postSelections);

// Determine if fugitive is captured
app.get('/result', getResult);
app.get('/reset', resetResult);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
