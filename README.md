Horse Racing
============

This is a Vue.js project that generates and manages horse races. The application selects random horses, assigns them to races, and displays race results. This project uses Vuex for state management and Mocha + Chai for unit testing.

Table of Contents
-----------------

*   [Installation](#installation)
*   [Run the Application](#run-the-application)
*   [Build the Application](#build-the-application)
*   [Run Unit Tests](#run-unit-tests)
*   [Features](#features)
*   [Usage](#usage)
*   [State Management](#state-management)
*   [Testing](#testing)
*   [Folder Structure](#folder-structure)

Installation
------------

To get started with the project, clone the repository and install the necessary dependencies:

    
    git clone https://github.com/esraay/horse-race.git
    cd horse-race
    npm install
    

Run the Application
-------------------

To run the application in development mode:

    
    npm run serve
    

After running the above command, the application will be available at:

http://localhost:8080

Build the Application
---------------------

To build the project for production:

    
    npm run build
    

Run Unit Tests
--------------

To execute the unit tests with Mocha and Chai:

    
    npm run test:unit
    

Features
--------

*   Randomly generate horse races
*   Start and stop race animations
*   Update and display race results
*   Persistent Vuex state management
*   Comprehensive unit testing with Mocha and Chai

Usage
-----

Once the app is running, you can start races, generate horse selections, and see the results displayed. Click on the race buttons to trigger different actions.

State Management
----------------

The app leverages Vuex for managing global state. Horses, races, and results are managed in the Vuex store. Vuex allows centralized state control, making it easier to manage and test the application.

Testing
-------

Unit tests are written using Mocha and Chai. The tests cover Vuex actions, mutations, and component behavior.

Folder Structure
----------------

*   **/src** - Source files
*   **/src/store** - Vuex store configuration
*   **/src/components** - Vue components (e.g., Race.vue, Results.vue)
*   **/tests/unit** - Unit tests for components and store

------------