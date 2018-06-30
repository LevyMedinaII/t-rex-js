# t-rex-js
```t-rex-js``` allows quick development of full-stack web applications using ```react```, ```express```, and ```sequelize```. It also uses ```socket.io``` to support real-time dynamic interfaces.

![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)

## Installation
```
npm install -g t-rex-js
```
## Quickstart
Create a project and open the project:
```
t-rex create
cd <project_name>
```
Install server and client dependencies (from project root directory):
```
t-rex install
```
Provide a valid database url in `config.json`:
```
"db_url" : <valid database url>
```
Start the application (from project root directory):
```
t-rex run
```
## Usage
### Creating a project
```
t-rex create
```
The `create` command creates a `t-rex` project in the current working directory. Project details will be prompted by the CLI.

### Install project dependencies
```
t-rex install
```
Installs all required packages for both the server and a client. This command is a macro for the following:
```
yarn install
cd client
yarn install
```
This command is currently available only in the root directory of the project.

### Run project
```
t-rex run
```
Runs the express server (backend) and the webpack development server for the react frontend. This command is a macro for the following:
```
yarn run start
cd client
yarn run start
```
This command is currently available only in the root directory of the project.

### config.json
This file contains all of the editable system defaults supported by t-rex.

### Adding a resource
```
t-rex add
```
The `add` command creates the ff:
- A resource located in the `/resources/<resource_name>` folder containing a dummy model for the resource
- A react component in `/client/src/components` which displays all instances of the model associated with the resource  
  
NOTE: If there is no valid `db_url` in `config.json`, running your application after adding a resource causes the Express server to crash.


## Future Developments
1. `add` creates selected resources (GET, DELETE, POST, UPDATE)
2. Create and run test cases
3. `delete` resource command
4. Client template interfaces for resources

## Contact Details
Name: Levy V. Medina II  
Email: levymedina3@gmail.com  
Mobile: (+63) 915 326 0223

