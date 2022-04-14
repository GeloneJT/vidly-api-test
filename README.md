# Vidly API Demo

## Description

Node.js project utilizing Mongoose MongoDB connection and CRUD methods to simulate a movie rental application.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Credit](#credit)
- [Tests](#tests)
- [GitHub](#github)
- [Email](#email)
- [Questions](#questions)
- [License](#license)

## Installation

To start using this code follow these instructions: <br>
Install the required dependencies using the follow command in the terminal under to root file directory.

```
npm i
```

## Usage

A MongoDB database profile must be made in order for data to be saved/retrieved.<br>
Once your MongoDB profile is set up run the following command in your terminal IDE to launch the server.

```
nodemon
```
If met with the error...
```
[nodemon] app crashed - waiting for file changes before starting...
 ```
 ...the enviromental variable for the server key must be set based on your OS.<br>

macOS/Linux:
 ```
 export vidly_jwtPrivateKey={yourPrivateKey}
 ```
 Windows:
 ```
 set vidly_jwtPrivateKey={yourPrivateKey}
 ```
## Credit

None

## Tests

N/A

## GitHub

[GeloneJT](https://github.com/GeloneJT)

## Email

eyeglass0324@gmail.com

## Questions

GitHub / Email

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
