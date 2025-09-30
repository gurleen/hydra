# Hydra: Broadcast graphics playout software

This repository contains the software used for insert graphics on [Drexel Dragons](https://drexeldragons.com) athletics broadcasts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Quick start](#quick-start)
* [License](#license)

## Introduction

There are two processes that make up this project:

- **The React-based frontend**, in which graphics are designed and rendered. It also provides a control UI.
- **The C#/ASP.NET server**, which provides a `SignalR` relay for communication between the control UI and the rendering browser. It also hosts an API for fetching data to hydrate graphics with.


## Installation

Not yet available.


## Quick start

Run the backend server:

```sh
cd src-server
dotnet watch
```

...and then host the frontend:

```sh
cd src-frontend
bun run dev
```

Go to `http://localhost:3000` to see the control UI.
Open `http://localhost:3000/renderer` in OBS, CasparCG, Vingester, etc. to see the program output.


## Contributing

This repository is open to contributions, but this software's role is primarily to support Drexel broadcasts.


## License

This source code is available under the terms of the [MIT license](https://opensource.org/licenses/MIT).