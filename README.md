## Before pushing to github:

Step 1: git pull origin main\
 Step 2 : git checkout -b "YOUR BRANCH NAME"\
 Step 3: git add .\
 Step 4: git commit -m "Message"\
 Step 5: git push origin "YOUR BRANCH NAME"

## To start the server:

### Step 1. `npm install`

### Step 2: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

## Release Notes: 
How to install and run the software
- Input this URL into any browser:  https://main.d2jp4nrw4yv5qf.amplifyapp.com/
- Click the button on the homepage to sign up
- On the same page click the singup button and then click the sign in button do not click the back arrow
- Log into the website and search for any class in the drop down, but between searches do not click the back arrow, instead click  
  the search icon button at the top of the map page
  
Which commands are working: 
- The URL successfully takes users to the login page and allows them to navigate through our different features without needing to  
  do any local installation. 
- The signup command works well and creates a new student object that gets uploaded to our database. 
- Signing it accurately verifies if the user associated with the login information exists and if the username and password do not 
  exist in the same object in the database they will not be able to login. 
- Signing in successfully navigates a user to the search page where they can select any undergrad CS course to see a map for. 
- This selection seamlessly navigates to an interactive and accurate map of the course the user selected in the search.
  
A list of any known issues: 
- Menu tab on the search page is not functioning yet.
- Map is sometimes so large that it goes beyond the page, making the prerequisites appear incorrect.
- Map of prerequisites isn’t color-coded yet, and all the courses in the same list don’t have any indication of the same. 
- Some courses are not in our database, so a map for that course will not load.
- Some courses do not have clear prerequisites, so a mpa for that course will not load. 
- The link doesn’t work all the time.
- State isn’t saved (the user isn’t saved as ‘logged in’ even after logging in).
- Popups on the map only show the description of the class the user searched (clicking on any class in the resulting map will show 
  the same description as the one the user searched for regardless of the class they want info on)
- The upload transcript funtcion only works locally and currently does not work with the urls in the website so the transcripts are 
  not being saved to our database yet
- The signup feature allows multiple users to have the same username

