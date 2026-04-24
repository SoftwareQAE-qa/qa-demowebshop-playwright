# Petstore API Automation (Postman)

This folder contains a separate Postman deliverable for:

- `POST https://petstore.swagger.io/v2/pet`
- `GET https://petstore.swagger.io/v2/pet/{petId}`

## File

- `Petstore_API_Automation.postman_collection.json`

## Included Scenarios

1. Create pet (positive)
2. Get created pet by id (positive)
3. Get non-existing pet id (negative)
4. Get invalid pet id format (negative)

## How to Run

1. Open Postman
2. Import `Petstore_API_Automation.postman_collection.json`
3. Run the full collection in Collection Runner (top to bottom order)

The collection auto-generates a unique `petId` and `petName` in pre-request script, then reuses them for validation.
