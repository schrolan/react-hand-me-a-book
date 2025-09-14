#AWS Deployed site

http://3.144.161.54:3001/

# Hand me a Book

Hand me a Book is a comprehensive React application that enables users to search for and save books based on specific criteria: subject, author, and title. This application returns three random books based on those criteria. This application also allows users to create an account and save books that they may want to check out at a later date.

## Features

User Authentication: Create an account and log in to access personalized features.
Book Search: Find books by subject, author, or title using the Open Library API.
Profile Management: Save books to your profile and view details at any time.
Detailed Book Information: View book titles, authors, cover images, and publication years.

## Deployed site

This site was deployed using heroku and can be found at the following url: https://royal-chesterfield-46958-9ef8e8cd4235.herokuapp.com/
This site was also deployed using an AWS instance. That can be found here: http://3.22.112.97/

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Ensure you have the following installed:

    Node.js
    npm (Node Package Manager)

Installation

    1. Clone the repository:

            git clone https://github.com/your-username/hand-me-a-book.git
            cd hand-me-a-book

    2. Install dependencies:

            npm install

## Running the Application

In the project directory, you can run:

    Development Mode:

        npm start
        Opens http://localhost:3000 to view in the browser. The page reloads when changes are made, and you may also see lint errors in the console.

Running Tests:

    npm test
    Launches the test runner in interactive watch mode. See more about running tests.

Building for Production:

    npm run build
    Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and filenames include hashes. The app is ready to be deployed!

Ejecting:

    npm run eject
    Note: This is a one-way operation. Once you eject, you can’t go back! It copies all configuration files and dependencies (webpack, Babel, ESLint, etc.) into your project for full control.

## Learn More

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

[React documentation](https://reactjs.org/)

## Additional Resources

[Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

[Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

[Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

[Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

[Deployment](https://facebook.github.io/create-react-app/docs/deployment)

[Troubleshooting npm run build failures](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## API

This project uses the [Open Library API](https://openlibrary.org/dev/docs/api/search) to search for books.
