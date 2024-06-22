Features
Post Selections

Endpoint: /api/selections
Method: POST
Description: Adds a new cop's selection to capture the fugitive.
Request Body:
cop: Name of the cop.
city: Name of the city to search in.
vehicle: Type of vehicle selected.
img_url: URL of the cop's image.
Response:
Success (200): Returns a success message.
Error (400): Returns an error message if the cop limit is exceeded, city is already selected, vehicle is not available, or vehicle range is insufficient.
Get Result

Endpoint: /api/result
Method: GET
Description: Retrieves the result of the fugitive search operation.
Response:
Success (200): Returns the success message with details if the fugitive is captured.
Failure (200): Returns a failure message if the fugitive is not captured.
Get Selections

Endpoint: /api/selections
Method: GET
Description: Retrieves the list of cop selections.
Response:
Success (200): Returns the list of cop selections.
Reset Result

Endpoint: /api/reset
Method: GET
Description: Resets the result and selections for a new search operation.
Response:
Success (200): Returns a success message after resetting.

Setup Instructions
Clone this repository to your local machine.
Navigate to the backend directory.
Install dependencies using npm install.
Start the server using npm start.
The server will run on port 5005 by default.


