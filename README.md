# Demo React + TypeScript application

This is a simple demo application demonstrating some concepts for review & discussion.

The application loads a fake file-tree data from a GraphQL endpoint and renders it in the UI.

## Setup & Run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Install dependencies

Run `yarn` in the project root.

### Configure

The app requires GraphQL endpoint to be configured using `.env` files. Use `<Project root>/.env` file as a template and refer to [Adding Development Environment Variables In `.env`](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env) for more details about how to call your copy of the `.env` configuration file.

### Run

Available scripts:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

#### `yarn lint`

Run static code analysis.

#### `yarn format`

Format source code using Prettier.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from the project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into the project to provide full control over them.
