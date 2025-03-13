# Favorite Movie Search

This project is a web application that allows users to search for their favorite movies using The Movie Database (TMDb) API. It offers filters by release date, genre, rating, and certification, including searches based on the Spanish certification standard.

## Features

- **Movie Search**: Filter movies by release date, genre, rating, and certification.
- **Favorites**: Mark movies as favorites.
- **Translation**: Uses Google Translate to translate the page into different languages.

## Project Structure

- `index.html`: Main application page.
- `result.html`: Search results page.
- `style.css`: CSS styles for the application.
- `script.js`: Main script that handles the application logic.
- `js/`: Folder containing JavaScript scripts organized into subfolders:
- `components/`: UI components.
- `services/`: Data services and APIs.
- `utils/`: Utilities and configuration.
- `init/`: Initialization functions.

## Installation

1. Clone this repository to your local machine.
```bash
git clone https://github.com/armanghazi/Favorite-Movie-Search.git
```
2. Navigate to the project directory.
```bash
cd Favorite-Movie-Search
```
3. Open `index.html` in your browser to see the application in action.

## Usage

- Select the desired filters on the main page and click "Search Movies" to view the results.
- Mark movies as favorites by clicking the heart button.
- Change the page language using the Google Translate widget.

## Configuration

- Make sure you have a valid TMDb API key and configure it in `js/utils/config.js`.

## Contributions

Contributions are welcome. Please open an issue or pull request to discuss any changes you'd like to make.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
