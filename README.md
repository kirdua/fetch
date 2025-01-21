## Fetch App

This application is built with Vue 3 and Vite to provide a seamless and efficient development experience.

## About

The app connects to the Fetch API to search for dog information based on various filters like breed, zip code, and age. However, due to API constraints, sorting could not be implemented since the /dogs/search endpoint only returns IDs instead of full dog objects.

## Features

- Filter Dogs by breed, zip code, and age range.
- Built with:
  - **Vue 3** for the frontend framework.
  - **Vite** for fast builds and hot module replacement.
- Responsive and clean UI.

## Known Limitations

Sorting: Sorting functionality is not implemented. The /dogs/search API endpoint only returns IDs instead of full dog objects, making it infeasible to sort the results directly.

## Requirements

Recommended IDE: VSCode with the Volar extension (disable Vetur).

## Additional Notes

- Refer to the Vite Documentation for advanced configuration options.
- Contributions are welcome! Please follow best practices for Vue and Vite development.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
