This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Information
The frontend of a full-stack application, the backend can be found here: https://github.com/tonidenevv/martial-art-events-backend
* The main idea of the app is for users to be able to find new martial art events.
* Full Stack React Application with authentication using JWT, MongoDB database, Node with Express for backend, functionality to see, create, edit and delete events as well as attend them and comment under events.
* Guests are able to view all events, see details about them, see comments, as well as login or register.
* Users are able to create events and also comment under events or decide to attend them in case they are not the owner of that event. They are also able to edit and delete events in case they are the owner of that event. They can also access their own profile where they can see all of the events they've created as well as all of the events they will be attending.

## How To Run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Change the BASE_URL's in the eventService.js and userService.js to http://localhost:{PORT}/{endpoint} where PORT is the port you choose in the .env file in the backend application and endpoint is either '/users' or '/events' based on which service it is.

However, it will work only when the server is started.
To start the server, follow the instructions in my backend repository: https://github.com/tonidenevv/martial-art-events-backend


