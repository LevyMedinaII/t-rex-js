# t-rex-js (pre-alpha)
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
npm install
cd client
npm install
```
This command is currently available only in the root directory of the project.

### Run project
```
t-rex run
```
Runs the express server (backend) and the webpack development server for the react frontend. This command is a macro for the following:
```
npm start
cd client
npm start
```
This command is currently available only in the root directory of the project.

### Adding a resource
```
t-rex add
```
The `add` command creates a `socket.io` enabled resource. Command currently available only in the root directory of the project. (To be improved)


## Future Developments
1. `add` creates selected resources (GET, DELETE, POST, UPDATE)
2. Create and run test cases
3. `delete` resource command
4. Client template interfaces for resources

## Contact Details
Name: Levy V. Medina II  
Email: levymedina3@gmail.com  
Mobile: (+63) 915 326 0223

