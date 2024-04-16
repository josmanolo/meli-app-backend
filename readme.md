# Express Server for MercadoLibre API Integration

This project is an Express.js server designed to interface with the MercadoLibre API. It provides functionality for searching items, fetching item details, and managing cache for better performance.

## Features

- Search items using MercadoLibre's search API.
- Fetch detailed information about a specific item, including its category and description.
- Caching of category and seller information to reduce API calls and improve response times.
- Error handling to manage API and internal server errors.
- Compression middleware to reduce the size of the API responses.

## Installation

To get started with this project, follow these steps:

1.  Clone the repository:

    `git clone https://github.com/josmanolo/meli-app-backend.git`

2.  Navigate to the project directory:

    `cd meli-app-backend`

3.  Install dependencies:

    `npm install`

4.  Start the server:

    `npm start`

## API Endpoints

- Search Items
  - GET `/api/items?query=<search_query>&limit=<limit>`
  - Retrieves a list of items based on a search query. The limit parameter is optional.
- Get Item Details
  - GET `/api/items/:id`
  - Fetches detailed information about an item, including its description and category.

## Error Handling

The server includes a comprehensive error handling middleware which captures and responds with appropriate status codes and messages based on different errors encountered during API requests or internal processing.

## Caching

- Caches categories and seller information using `node-cache`.
- Cached data helps in reducing the number of API calls to MercadoLibre and speeds up the response time for users.

## Dependencies

- Express.js - The server framework used.
- Axios - For making HTTP requests to the MercadoLibre API.
- Node-Cache - A simple caching module to store API responses.
- Compression - Middleware to compress responses.

## Configuration

Ensure that the `baseURL` for Axios is set correctly to point to the MercadoLibre API in the `apiConfig.js` file. Adjust cache settings as needed in the caching setup.

## Running the Server

The server can be started with the following command, which will listen on the specified port as configured in your environment or default to 3002:

`npm start`
