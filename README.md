[![GitHub issues](https://img.shields.io/github/issues/joeyschroeder/code-the-way-2023.svg)](https://github.com/joeyschroeder/code-the-way-2023/issues)
[![GitHub stars](https://img.shields.io/github/stars/joeyschroeder/code-the-way-2023.svg)](https://github.com/joeyschroeder/code-the-way-2023/stargazers)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# 🌈 code-the-way-2023

An application using [React](https://reactjs.org/) and [Material UI](https://mui.com/) designed to be used as a starting point for the 2023 [Code The Way](https://www.codetheway.org/) program.

## Table of Contents

1. [Getting Started](#getting-started)
  1. [Prerequisites](#prerequisites)
      1. [Node.js \& Node Package Manager (npm)](#nodejs--node-package-manager-npm)
      2. [Recommended Tools](#recommended-tools)
  2. [Installation](#installation)
2. [Development](#development)
  1. [Webpack Dev Server](#webpack-dev-server)
      1. [Hot Reloading](#hot-reloading)
  2. [ESLint and Prettier.io](#eslint-and-prettierio)
      1. [Fix ESLint and Prettier errors/warnings on Save](#fix-eslint-and-prettier-errorswarnings-on-save)
  3. [Committing](#committing)
3. [Deployment](#deployment)
4. [Scripts](#scripts)
  1. [`build`](#build)
  2. [`eslint`](#eslint)
  3. [`eslint:fix`](#eslintfix)
  4. [`start`](#start)
  5. [`stylelint`](#stylelint)
  6. [`stylelint:fix`](#stylelintfix)
5. [Authors](#authors)
6. [Acknowledgments](#acknowledgments)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development. See deployment for notes on how to deploy the project on a production environment.

### Prerequisites

#### Node.js & Node Package Manager (npm)

You'll need to download and install [Node.js](https://nodejs.org) to install dependencies and run the scripts in this project to develop, test, and deploy this project. This project requires **Node.js** version 16 or higher along with **Node Package Manager (npm)**. npm is installed automatically when Node.js is installed. Download the latest version of Node.js [here](https://nodejs.org/en/download/) and install it to your development machine.

#### Recommended Tools

There's some additional tools that are recommended to help speed development.
* [Git](https://git-scm.com/) - A free and open source distributed version control system.
* [SourceTree](https://www.sourcetreeapp.com/) - A free Git GUI client for Windows and macOS.
* [Visual Studio Code](https://code.visualstudio.com/) - A lightweight code editor with built-in support for JavaScript, TypeScript, and Node.js.
* [Google Chrome](https://www.google.com/chrome/) - A fast, free, and open-source web browser developed by Google.
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) - A Chrome DevTools extension for the open-source React JavaScript library.

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

**NOTE:** _Occasionally, depending on your user permissions and peer dependency versions, you may need to force npm to install dependencies. If errors occur while running `npm install`, you can do this by running `npm install --force` instead._

## Development

This project uses multiple tools to speed development and improve code quality. When developing locally, and instance will run instance of this project application will run from your machine, which can then be opened in browser. This instance will automatically update to reflect saved changes in the source code. Additionally, _linting_ tools are configured and can be run from your code editor to highlight warnings and errors in your code.

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
[webpack-dev-server] Loopback: http://localhost:8080/, http://127.0.0.1:8080/
[webpack-dev-server] Content not from webpack is served from '/path/to/your/working/directory/code-the-way-2023/public' directory
[webpack-dev-server] 404s will fallback to '/index.html'
```

Open the URL [http://localhost:8080/](http://localhost:8080/) in your web browser. You will see the application running.

#### Hot Reloading

This project is equipped with [Webpack Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/). This means that while Webpack Dev Server is running the documentation application, you can make changes to the files and those changes will automatically be reflected in the web browser.

**NOTE:** _Occasionally, the web browser may need a manual refresh if you're changes affect application state or changes outside of the React life-cycle._

### ESLint and Prettier.io

This project is equipped with [ESLint](https://eslint.org/) and [Prettier.io](https://prettier.io/) to ensure a homogeneous code-style and prevent JavaScript syntactical errors.

During development, you can run `npm run eslint:fix` in the root of the project to automatically fix any fixable [ESLint errors/warnings](.eslintrc), and format your JavaScript [Prettier standards](https://prettier.io/).

#### Fix ESLint and Prettier errors/warnings on Save

If you're using [Visual Studio Code](https://code.visualstudio.com/) as your code editor, you can configure ESLint and Prettier to automatically fix errors and warnings on save.  To do this, you'll first need to install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code.  Then you'll need to configure your Visual Studio Code [settings.json](https://code.visualstudio.com/docs/getstarted/settings) file.

First, install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code.

Then, open your Visual Studio Code [settings.json](https://code.visualstudio.com/docs/getstarted/settings) file.  You can do this by opening the command palette (`CMD + SHIFT + P` on Mac, `CTRL + SHIFT + P` on Windows), and searching for "settings.json".  Select "Preferences: Open Settings (JSON)" from the command palette.

Finally, add the following to your Visual Studio Code [settings.json](https://code.visualstudio.com/docs/getstarted/settings) file:

```
"editor.codeActionsOnSave": {
  "source.fixAll": true,
},
```

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

## Deployment

This application is currently setup to run on [GitHub Pages](https://joeyschroeder.github.io/code-the-way-2023/). To deploy the application, you'll need to build the application and commit the build to the `docs/` directory to the `master` branch.

## Scripts

### `build`

This command runs `webpack` in "production" mode. It uses the `src/index.js` file as its entry point, and generates your application in a  the `docs/` directory.  This bundled application can then be committed and will appear on [GitHub Pages](https://joeyschroeder.github.io/code-the-way-2023/).

### `eslint`

This command runs `eslint ./`. It prints eslint warnings and errors in the command line.

### `eslint:fix`

This command runs `eslint ./ --fix`. It attempts to fix any eslint warnings/errors then prints the remaining warnings and errors in the command line.

### `start`

This command runs `webpack-dev-server` in "development" mode on the documentation. Hot reloading is enabled. Once running, you can access the application running locally at [localhost:8080/](http://localhost:8080/).

### `stylelint`

This command runs `stylelint '**/*.scss'`. It prints stylelint warnings and errors in the command line.

### `stylelint:fix`

This command runs `stylelint '**/*.scss' --fix`. It attempts to fix any stylelint warnings/errors, then prints the remaining warnings and errors in the command line.

## Authors

- **Joey Schroeder** - _Initial work_

See also the list of [contributors](https://github.com/joeyschroeder/code-the-way-2023/contributors) who participated in this project.

## Acknowledgments

Hat tip to anyone whose code was used! 🤠
