
[![GitHub issues](https://img.shields.io/github/issues/joeyschroeder/code-the-way-2023.svg)](https://github.com/joeyschroeder/code-the-way-2023/issues)
[![GitHub stars](https://img.shields.io/github/stars/joeyschroeder/code-the-way-2023.svg)](https://github.com/joeyschroeder/code-the-way-2023/stargazers)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# 🌈 code-the-way-2023
An application using [React](https://reactjs.org/) and [Material UI](https://mui.com/) designed to be used as a starting point for the 2023 [Code The Way](https://www.codetheway.org/) program.

- [🌈 code-the-way-2023](#-code-the-way-2023)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
      - [Node.js \& Node Package Manager (npm)](#nodejs--node-package-manager-npm)
    - [Installation](#installation)
  - [Development](#development)
    - [Webpack Dev Server](#webpack-dev-server)
      - [Hot Reloading](#hot-reloading)
    - [ESLint and Prettier.io](#eslint-and-prettierio)
      - [Fix ESLint and Prettier errors/warnings on Save](#fix-eslint-and-prettier-errorswarnings-on-save)
    - [Committing](#committing)
  - [Scripts](#scripts)
    - [`build`](#build)
    - [`clean`](#clean)
    - [`eslint`](#eslint)
    - [`eslint:fix`](#eslintfix)
      - [`start`](#start)
    - [`stylelint`](#stylelint)
    - [`stylelint:fix`](#stylelintfix)
  - [Authors](#authors)
  - [Acknowledgments](#acknowledgments)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development. See deployment for notes on how to deploy the project on a production environment.

### Prerequisites
#### Node.js & Node Package Manager (npm)
You'll need to download and install [Node.js](https://nodejs.org) to install dependencies and run the scripts in this project to develop, test, and deploy this project. This project requires **Node.js** version 16 or higher along with **Node Package Manager (npm)**. npm is installed automatically when Node.js is installed. Download the latest version of Node.js [here](https://nodejs.org/en/download/) and install it to your development machine.

### Installation
After **Node.js** and **npm** are installed, you'll need to _clone_ this repository to your working directory on your local machine, then install the project dependencies using npm through the command line.

First, navigate to your working directory:
```
cd path/to/your/working/directory
```

Then clone this repository to your working directory.

Then, clone the repository:
```
git clone https://github.com/joeyschroeder/code-the-way-2023.git
```

After cloning is complete, navigate inside the newly cloned repository:
```
cd code-the-way-2023
```

Finally, run `npm install` to install all project dependencies:
```
npm install
```

**NOTE:**  _Occasionally, depending on your user permissions and peer dependency versions, you may need to force npm to install dependencies. If errors occur while running `npm install`, you can do this by running `npm install --force` instead._

## Development
This project uses multiple tools to speed development and improve code quality. When developing locally, and instance will run instance of this project application will run from your machine, which can then be opened in browser.  This instance will automatically update to reflect saved changes in the source code.  Additionally, _linting_ tools are configured and can be run from your code editor to highlight warnings and errors in your code.

### Webpack Dev Server
During development, this application will run inside a local web browser using [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/). To start the application in a web browser, navigate to the root of the project directory in the command line and run `npm run start`. This command will print out a URL which can be opened in a web browser.

First, navigate to the root of the project:
```
cd path/to/your/working/directory/code-the-way-2023
```

Then start the application:
```
npm run start
```

After Webpack Dev Server has compiled the development bundle, it will print out something similar to the following:

```
[webpack-dev-server] Project is running at:
[webpack-dev-server] Loopback: http://localhost:9090/, http://127.0.0.1:9090/
[webpack-dev-server] Content not from webpack is served from '/path/to/your/working/directory/code-the-way-2023/public' directory
[webpack-dev-server] 404s will fallback to '/index.html'
```

Open the URL [http://localhost:9090/](http://localhost:9090/) in your web browser.  You will see the application running.

#### Hot Reloading
This project is equipped with [Webpack Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/). This means that while Webpack Dev Server is running the documentation application, you can make changes to the files and those changes will automatically be reflected in the web browser.

**NOTE:** _Occasionally, the web browser may need a manual refresh if you're changes affect application state or changes outside of the React life-cycle._

### ESLint and Prettier.io
This project is equipped with [ESLint](https://eslint.org/) and [Prettier.io](https://prettier.io/) to ensure a homogeneous code-style and prevent JavaScript syntactical errors.

During development, you can run `npm run eslint:fix` in the root of the project to automatically fix any fixable [ESLint errors/warnings](.eslintrc), and format your JavaScript [Prettier standards](https://prettier.io/).

#### Fix ESLint and Prettier errors/warnings on Save
⚠️ This documentation is under construction. ⚠️

### Committing
To ensure the commit history of this project remains helpful, please use the commit rules outlined [here](https://chris.beams.io/posts/git-commit/) when committing.

To making following these rules easier, this project is equipped with a [Git commit template](commit.template.txt):

```
# <type>: (If applied, this commit will...) <subject> (Max 50 char)
# |<---- Using a Maximum Of 50 Characters ---->|

# Explain why this change is being made
# |<---- Try To Limit Each Line to a Maximum Of 72 Characters ---->|

# Provide links or keys to any relevant tickets, articles or other resources
# Example: JIRA issue #23

# --- COMMIT END ---
# Type can be
# breaking (changes that break previous implementations)
# feat (new feature)
# fix (bug fix)
# refactor (refactoring production code)
# revert (changes that revert a previous commit)
# style (formatting, missing semi colons, etc; no code change)
# docs (changes to documentation)
# test (adding or refactoring tests; no production code change)
# chore (updating grunt tasks etc; no production code change)
# other (changes that do not fit in above categories)
# --------------------
# Remember to
# Capitalize the subject line
# Use the imperative mood in the subject line
# Do not end the subject line with a period
# Separate subject from body with a blank line
# Use the body to explain what and why vs. how
# Can use multiple lines with "-" for bullet points in body
# --------------------
```

To enable this Git commit template, run the following command from the root of the project:

```
git config --global commit.template commit.template.txt
```

It's recommended developers run `npm run eslint:fix` often during development to prevent any failures from code-style or JavaScript syntactical errors.

## Scripts

### `build`
This command runs `webpack` in "production" mode. It uses the `src/index.js` file as its entry point, and generates a JavaScript `main.js` and `vendor.js` file in `dist/`.

### `clean`
This command deletes the `dist/` directory.

### `eslint`
This command runs `eslint src/`. It prints eslint warnings and errors in the command line.

### `eslint:fix`
This command runs `eslint --fix src/`. It attempts to fix any eslint warnings/errors then prints the remaining warnings and errors in the command line.

#### `start`
This command runs `webpack-dev-server` in "development" mode on the documentation. Hot reloading is enabled. Once running, you can access the documentation running locally at [localhost:9090/](http://localhost:9090/).

### `stylelint`
This command runs `stylelint 'src/**/*/*.scss`. It prints stylelint warnings and errors in the command line.

### `stylelint:fix`
This command runs `stylelint --fix 'src/**/*/*.scss`. It attempts to fix any stylelint warnings/errors, then prints the remaining warnings and errors in the command line.

## Authors
-  **Joey Schroeder** - _Initial work_

See also the list of [contributors](https://github.com/joeyschroeder/code-the-way-2023/contributors) who participated in this project.

## Acknowledgments
Hat tip to anyone whose code was used! 🤠
