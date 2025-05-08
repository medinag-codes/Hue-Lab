# Hue Lab

Hue Lab is a full-stack CRUD application that empowers users to create personalized foundation formulas based on their unique skin tone. Using a combination of real-time camera input, color detection technology, and cosmetic formulation logic, the app extracts a representative hex color from the user’s face and converts it into a customized blend of cosmetic pigments. Users can then name their shade, save their custom formula, and manage their collection—all stored securely in a MongoDB database. This application combines frontend interactivity with backend data persistence, offering a seamless user experience for personalized beauty.

**Link to project:** 

![alt tag]()

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node, EJS

JavaScript (Frontend & Backend): JavaScript powers both the client-side interactivity (capturing video, detecting color, rendering UI) and the server-side logic (handling routes, processing data, and managing CRUD operations).

EJS (Embedded JavaScript Templates): EJS is used to dynamically render server-side content in the browser, allowing seamless updates to user profiles and custom formulas.

Node.js & Express: These handle the backend logic, routing, and integration between the frontend, database, and external libraries like Chroma.js for color manipulation.

MongoDB: A NoSQL database used to store user accounts, hex values, pigment formulas, and custom shade names, enabling persistent and scalable data storage.

Built with Node.js, Express, MongoDB, and EJS, Hue Lab features full CRUD functionality:

Create: Capture a hex color and generate a personalized pigment formula with a user-defined shade name

Read: View previously saved formulas in a user profile

Update: Edit shade names or adjust saved formulas

Delete: Remove saved foundation matches from the profile

## Lessons Learned:

*Color Data Is Complex*

Working with image data and color models made me appreciate the complexity of translating pixels into usable, accurate color values. I learned how to leverage tools like chroma.js and manipulate canvas data to extract precise skintone shades.

*Full Stack = Full Ownership*

From frontend UI to backend routes and MongoDB queries, I learned how to own and build out each layer of a full stack application. Debugging issues across these layers made me a stronger problem solver.

*The Power of User-Centered Design*

Building Hue Lab taught me how essential it is to center the user's real-world needs. Observing how hard it is for people to find their foundation match helped me focus on solving a meaningful problem with tech.

## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `node server.js`
2. Navigate to `localhost:2000`

## Credit

Modified from Scotch.io's auth tutorial
