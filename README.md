# YouTube Video Bookmarking App

This is a React-based web application that allows users to browse popular YouTube videos, view video details, and bookmark their favorite videos for later access. The app utilizes the YouTube API to fetch trending videos, and it includes bookmarking functionality for easy management of saved videos.
## Deployment

The application has been deployed, and you can access it using the following link:

[Deployed Application](https://you-tube-internship.vercel.app/)

### Important Note

This application requires a valid YouTube Data API key to function correctly. Since API keys cannot be uploaded publicly for security reasons, the application will only work after you set up your own API key.


## Features

- Browse trending YouTube videos.
- View video details on a separate page.
- Bookmark videos to save them for later.
- Toggle between bookmarked and unbookmarked states.
- Responsive layout for different screen sizes.

## Technologies Used

- **React** - Frontend framework for building the user interface.
- **React Router** - For navigating between pages.
- **Axios** - For making HTTP requests to the YouTube API.
- **Moment.js** - To format and display video publish dates.
- **React Icons** - For displaying icons (e.g., bookmark icon).
- **Tailwind CSS** - For styling and creating a responsive layout.
- **Yarn** - For managing project dependencies.

## Installation

To get started with this project, follow these steps:

### 1. Clone the Repository

``` https://github.com/harithatony/YouTube_Internship.git```

### 2. Navigate to the Project Directory

``` cd youtube```

### 3.Install Dependencies Using Yarn

```yarn install```
```yarn add axios```
```yarn add moment```
```yarn add react-icons```
### 4.Set Up YouTube API Key
To fetch data from the YouTube Data API, you need a valid YouTube API key.

- Steps to obtain an API key:
-Go to the Google Developer Console.
-Create a new project.
-Enable the YouTube Data API v3 for your project.
-Generate an API key.
-Add the API Key to the Project
-Replace REPLACE_YOUR_API_KEY in .env file with your API key:

### 5. Run the Application
Start the development server:

```yarn start```



### Dependencies
-react
-react-router-dom
-axios
-react-icons
-moment
-yarn



### Acknowledgments
-YouTube Data API
-React
-Moment.js
-React Icons
