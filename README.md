# Stickies ( Sticky Notes )

## Intro
**Stickies** is a simple, On The Go, 170 characters note taking app. No login/signup is needed.
And all the data is stored in your own browswer and no data is sent to the server. 

## Pictures


## Dev
React does the main job here, it is coupled with Django in the backend. 
npm is used for managing the front-end dependencies.
Webpack is used for the bundling job with Babel for transpiling ES6 JS/JSX to ES5 code. 
I have used the localStorage API to save all the notes in the browser.

## How to run
1. Clone my Github repo and create a virtual environment
2. `pip install -r requirements.txt`
3. `npm install`
4. `./node_modules/.bin/webpack --config webpack-prod.config.js` (use webpack.config.js for development bundle)
5. `./manage.py runserver`
