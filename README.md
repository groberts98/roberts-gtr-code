### The D-Stress Application
The application is hosted online and is available at https://d-stress.herokuapp.com/.
 
### Running the Code
In order to run this application locally in development mode, you will require Node.js and npm. In the d-Stress-frontend file, run 'npm start'. The application should build and be available at http://localhost:3000. This local version of the application will be communicating with the live D-Stress backend.
 
### Running the Tests
In order to run tests, use the command npm test.
 
### Explanation of the Code
The code is separated into two folders, one containing the frontend code and the other the backend code.
 
Within the frontend section, the public, node-modules and build folders each contain files ensuring the functionality of the system. The package.json file defines the external packages used. Code defining the D-Stress React app is contained in the src folder. This has been further subdivided: the pages folder contains the PageRouter component and the core pages of the application, the components folder contains smaller components utilised by these pages, and the resources folder contains images used within the application.
 
Contained within the api folder of the backend section, the dbConnect.php file connects the backend to the database served via Heroku. Further down, in the stressor folder, is the various endpoints used by the D-Stress system. 
