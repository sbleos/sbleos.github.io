# South Brunswick Leo Club Website

The South Brunswick Leo Club website is hosted at [sbleos.org](https://sbleos.org) and contains a dashboard built so members can see their hours on their own for the first time. The website is a more efficient way to share information about to the youth of South Brunswick and allows quick registration. Members only have access to the meetings and events they have attended, not those of other members. The board has access to the entire club on the dashboard, and can edit the members' hours and dues on a built-in spreadsheet. They can also create events and meetings for the entire club to see. The attendance at events and meetings as well as the growth of the club is graphed on the dashboard.

## Table of Contents
- [Usage (Leos)](#usage-leos)
- [Usage (Developers)](#usage-developers)
    - [Scripts](#scripts)
        - [Development Mode](#npm-start)
        - [Deploy to Production](#npm-run-deploy)
    - [Dependencies](#dependencies)
        - [React](#react)
        - [Redux](#redux)
        - [Firebase](#firebase)
        - [react-redux-firebase](#react-redux-firebase)
        - [Bootstrap](#bootstrap)
        - [DevExtreme React Grid](#devextreme-react-grid)
        - [Victory](#victory)
        - [FontAwesome](#fortawesome-fontawesome)
        - [Google Domains](#google-domains)
    - [Project Structure](#project-structure)
        - [Assets](#assets)
            - [Board](#board)
        - [Components](#components)
            - [Dashboard](#----dashboard)
                - [Charts](#--------charts)
                    - [AttendanceChart.js](#------------attendancechartjs)
                    - [MembershipChart.js](#------------membershipchartjs)
                - [Create](#--------create)
                    - [CreateEvent.js](#------------createeventjs)
                - [Update](#--------update)
                    - [UpdatePassword.js](#------------updatepasswordjs)
                    - [UpdateProfile.js](#------------updateprofilejs)
                - [Events.js](#--------eventsjs)
                - [Meetings.js](#--------meetingsjs)
                - [Members.js](#--------membersjs)
                - [NavDash.js](#--------navdashjs)
                - [Overview.js](#--------overviewjs)
                - [Profile.js](#--------profilejs)
                - [Spreadsheet.js.js](#--------spreadsheetjs)
            - [BoardMember.js](#boardmemberjs)
            - [Events.js](#eventsjs)
            - [Footer.js](#footerjs)
            - [Header.js](#headerjs)
            - [Layout.js](#layoutjs)
                - [Breadcrumb.js](#breadcrumbjs)
                - [Link](#link)
            - [Notification System](#----notificationsystem)
                - [Notification.js](#----notificationsystem)
                - [Notifications.js](#----notificationsystem)
            - [SignIn.js](#signinjs)
            - [SignUp.js](#signupjs)
        - [Pages](#pages)
            - [About.js](#aboutjs)
            - [Board.js](#boardjs)
                - [BoardDescription.js](#boarddescription)
            - [Dashboard.js](#dashboardjs)
            - [Home.js](#homejs)
            - [Mission.js](#missionjs)
            - [NoMatch.js](#nomatchjs)
            - [Projects.js](#projectjs)
        - [Store](#store)
            - [Actons](#----actions)
                - [authActions.js](#--------authactionsjs)
                    - [signIn](#------------signin)
                    - [signOut](#------------signout)
                    - [signUp](#------------signup)
                    - [sendPasswordResetEmail](#------------sendpasswordresetemail)
                    - [updatePassword](#------------updatepassword)
                - [eventActions.js](#--------eventactionsjs)
                    - [createEvent](#------------createevent)
                    - [getImage](#------------getimage)
                    - [updateEvent](#------------updateevent)
                    - [deleteEvent](#------------deleteevent)
                    - [getUsers](#------------getusers)
                - [notificationActions.js](#--------notificationactionsjs)
                    - [createNotification](#------------createnotification)
                    - [removeNotification](#------------removenotification)
                - [profileActions.js](#--------profileactionsjs)
                    - [updateProfile](#------------updateprofile)
                - [userActions.js](#--------useractionsjs)
                    - [updateUser](#------------updateuser)
                    - [getYears](#------------getyears)
                    - [getActiveMembership](#------------getactivemembership)
            - [Reducers](#----reducers)
        - [Utils](#utils)
        - [App.js](#appjs)
            - [Routes](#routes)
        - [firebase.js](#firebasejs)
        - [index.js](#indexjs)
        - [library.js](#libraryjs)

## Usage (Leos)

These are general instructions on how to use the website properly. Feel free to modify how the website looks and the information of the website, but be careful when entering data in the dashboard. The forms will only accept valid data, but the spreadsheet does not have the same level of data validation.

Be sure to share [sbleos.org](https://sbleos.org) to your friends so they can join! One of the main reasons for this website is to reach more people and quickly sign them up! The homepage contains a sign up form requiring a name, email and password. When signed up, new users are directed to the dashboard but only have access to their profile because they are unverified. They are recommended to fill out their profile so the board can verify them faster, but it also helps when registering them in MyLCI.

> :warning: You should only delete users if they are not actually joining the club. Only verify them after they have turned in their registration form and have been accepted to the club on MyLCI (you need their Member ID to verify them). There is no built in functionality for deleting users for security reasons. To delete a user, ask the current developer to delete them from the Firebase Console. Only do this for new users or when absolutely necessary!

Members only have limited access to the dashboard. The main purpose of this website is so members can see their own hours and events they have attended. However, they will not be able to edit any data besides their own profile information. On the other hand, board members have complete access to the entire club's data, can edit hours volunteered, and can see club metrics.

> :information_source: Once again, members can only see the events and meetings they have attended and hours earned. The rest of the instructions pertain only to the board.

> :information_source: **Spreadsheet usage**: The Members, Events, and Meetings tab use spreadsheets. Each cell of the spreadsheet is editable, unless otherwise specified, by double clicking on it. Only those with admin privileges can edit the cells. Each column can be sorted in ascending or descending order by clicking on its header. Additionally, each column has a search bar above the header to search values in that column. The entire spreadsheet has a search bar as well in the toolbar to search in the entire dataset provided. Certain are hidden from the grid by default (only the important information is shown at first), and the user can see more or less columns by clicking the 'eye' icon and enabling or disabling the column. You can also filter the members by fiscal year using the dropdown menu.

The next step is verifying new members. On the Members tab of the dashboard, you will see all unverified users identified by a yellow "UNVERIFIED" text underneath their `ID`. Once the new member is accepted to MyLCI, the board should enter their Member ID to verify them, which gives them access to the rest of the dashboard.

When verifying a new member of the board, remember to change their `position` so they can have admin privileges.

This is also when you should fill out any extra information the club already has about the user. You will not be able to change any profile information, but you can edit the rest. For example, when editing the dues, fill out the amount paid under each fiscal year (only the number value, do not include the `$` sign). All empty values will read "Not Paid" in red. If the member was not in the club, type in "Not in club" which will be printed in blue. The sum of the total amount collected in dues in that fiscal year will be at the bottom.

The `developer` attribute reads "No" and has a value of false, but if you want to give someone admin privileges, especially if they are not on the board, change it to true. This should be given to the people who are developing the website.

:exclamation: **Important things to know**
- `joinDate` uses the date the users signed-up on the website. If you have the actual date stored (either on MyLCI, Google Sheets, or their registration form), you should **absolutely** use that date instead of the date the person signed up on the website. **This is especially important if the member was in the club before the website was created**.
- A member's `start` feature is by default the fiscal year according to the date they signed up on the website, but if he or she was in the club before, update the `start` fiscal year accordingly. Similarly, `end` is left blank (and is rendered as "Present" on the spreadsheet), but if the member graduated from the club, update their fiscal year to their last year in the club.

> :information_source: **The fiscal year is from July 1st to June 30th and should be written in the form "2019-2020".**

:exclamation: **RECAP!!**
`joinDate`, `start`, and `end` should be properly updated because it **affects the functionality of the entire dashboard!!** Don't forget to update `end` when a member leaves the club.

When logging in to the website, use the username and password you signed up with. If you forgot your password, you can send yourself a password reset email. You can also change your password in your profile. You are redirected to the Overview dashboard page, which has two line charts with special functionality.

> :information_source: Members are redirected to the events page to see their hours, which is more important to them, and unverified users are redirected to their profile.

These are two time series line charts that help visualize trends in the club. The first chart shows trends in the number of people going to events and or meetings, and the second chart displays the number of active memberships at any given time. It is useful to visualize the growth of the club.

> :information_source: **Chart usage**: Each chart consists of a main chart and a mini chart. The main chart has tooltips that are visible on hover. You are also able to zoom by scrolling to see a specific region of the chart in more depth. You can pan through different regions by dragging left or right. The mini chart has a "brush" that allows you to drag and select a region, and "brushing" across the chart to changes the domain. The domains are synced, so a change in one of the charts changes the other. To quickly reset the domain, click outside of the shaded brush area.

The remaining tabs on the dashboard are the Events and Meetings tab, that have nearly the same functionality. You can create a new event or meeting by clicking the respective button. In both forms, a title and date is required. Also, there are optional fields to specify a description of the event, a link, and the link description. The link can be used for a Google Form to sign up as to volunteer.

There are additional features when creating an event. You can choose the type of event (default is "Community", a more general type, or there are other options such as the global causes set by LCIF). You can also upload an image. If the event type is anything other than community, you have an option to use the icon that corresponds to the type of event.

A new event or meeting is immediately added to the spreadsheet and will also show up on the home page. The number of events and total number of hours of each member is located at the footer. Admins can also delete events, which will remove it from the spreadsheet and the homepage. When entering attendance of a meeting, simply enter `1` for present (unless if the board decides to give hours for meetings, then enter the number of hours earned) and leave the cell blank for absent.

> :warning: Deleting events will also delete the hours earned by volunteers. Once an event is delete, you cannot recover it and will have to create it again.

Everything below this is for developers! If you only wanted to know how to use the website, there's no need to go any further. If you are interested in maintaining the website, all of the instructions are below!

## Usage (Developers) 

This website was created with React.js. It uses Redux to manage state (don't worry, we will get into this soon), and Firebase for authentication, to store the database, and to store images. Small updates are just adding little bits here and there and consists mainly of copy and pasting and changing the words around. You actually do not really need to know how to code to do this. 

If you plan on doing more than that to change the website, you may need to know a little HTML and JavaScript. 

## Scripts

Before you run any of the scripts, make sure you have the `node_modules/` directory in your project. If it is your first time running the project, then it may not be there because it is blocked by the gitignore. If you do not have the directory, run `npm install`. By the way, if you are not sure where to run this command, this is done in the command line. The command line may seem complicated, but it is very useful and a simple tutorial can show you how to use it. If you do not have npm installed, then install [Node.js](https://nodejs.org), as it comes with npm.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run deploy`

Builds the app for production and publishes it to [sbleos.org](https://sbleos.org/).<br>
This will optimize the build for the best performance.
.<br>
Your app is ready to be deployed!

> :information_source: Note to developers: The project is set up so the dev branch is the default branch which contains all the code and the master branch is the production branch which contains the published project. You should be in the dev branch at all times, because `npm run deploy` handles everything in the master branch, including pushing the changes to GitHub. It may take over 10 minutes for the changes to show up on the website.

#### RECAP!!

The following commands take place in the command line, and require npm. If you just cloned the project, make sure to run `npm install` before anything else. When editing, run `npm start` to see the changes to the code in a development server. When ready to publish the new site, run `npm run deploy`.

After you edit the project and are ready to push the changes to GitHub so one day another Leo can change the website, you should run these commands.
```
git add .
git commit -m "INCLUDE MESSAGE HERE"
git push
```

## Dependecies

Check out the links for more information about the dependencies used in this project! They are all interesting and explain their usage better than I can. It also helps to look at their documentation! The website domain is from Google Domains.

### [React](https://reactjs.org/)

React is a component based JavaScript library that makes writing front-end code more logical. The components are very simple to be reusable, using separate JavaScript components instead of writing everything allows you to manage the `state` of the app. Another important thing is conditional rendering based on certain values, meaning that you can choose when a component looks and functions differently. Often, these values are taken in as input data called `props`.

The syntax of React components is [JSX](https://reactjs.org/docs/introducing-jsx.html), which is JavaScript that renders the HTML inside. Read the [main concepts](https://reactjs.org/docs/hello-world.html) of React to quickly learn it.

> :warning: Since JSX is closer to JavaScript than HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names, which is in `snake-case`. For example, `class` becomes `className`, and `font-family` becomes `fontFamily`.

> :information_source: React tip: if style is a variable, you can set a components style with `style={style}`, with `style` being an object . To set styles inline, you can use something link `style={{display:"block",fontFamily:"Lato"}}`. Remember to use camel case and not dashes like regular CSS. You can also use `className="d-block"` by using Bootstrap classes or from a CSS file. Inline styles are not the best for performance because the CSS is compiled each time the component re-renders.

##### [React Router](https://reactrouter.com/)

This project Client-Side Routing and is a Single Page React App, meaning that everything is rendered on one HTMl file. React Router allows us to render different pages of our app using [predefined routes](#routes) based on the URL.

> :information_source: Fun fact: since the app uses React and React Router, changing the page does not load a new HMTL page, but just swaps the component. This means that clicking links in the header instantly changes the page, but the header stays in place. It is a small, cool thing once yoo notice how fast it is!

##### [React Helmet](https://github.com/nfl/react-helmet)

Create React APP, the method used to create this project, uses CSR. The limitations of this is that the client retrieves an empty `index.html` page and then JavaScript from the host, and is required to compile everything on the client computer. This is slower because it makes multiple requests and takes time to build the web page. Time is a valuable resource that web crawlers do not have. Due to the structure of CSR, Create React APP does not function too well for SEO (this can be simply thought as "getting to the front page on search engines"). We can use React Helmet to add meta data to the document head, which greatly improves SEO.

> :information_source: Fun fact: react-helmet was made by the NFL!)

A way around the limitations of Create React APP is to use Server-Side Rendering, which does all the work on the server and sends the compiled HTML file (servers cost money), or to prerender the application with a package from npm or alternatives to Create React APP, such as Gatsby.js.

### [Redux](https://react-redux.js.org/)

Redux is a "a predictable state container for JS apps", and `react-redux` is basically Redux for React.

So how does Redux work? An important concept in programming, especially web development, is "seperation of concerns". We like to generally keep data manipulation and state management outside of the component, and solely use the component for rendering.

Redux has a central data store for the application where all components can retreive the state. For example, instead of connecting too Firebase Auth in a top-level component, such as App.js, and passing it all the way down to two unrelated components, those two components can subscribe to the the Redux store and retreive the state itself. The first step is for a component to subscribe to changes, which is sent to the component as props from `mapStateToProps`. An example of this is reading the events and rendering them in a component. If we want to change the state, such as adding or deleting an event, the component can dispatch an action (this is also passed to the component as props in `mapDispatchToProps`). This action (and the optional payload) is manipulated in the action creator and then passed to the reducer, which updates the central state.

##### [Redux Thunk](https://github.com/reduxjs/redux-thunk)

Redux store allows dispatching simple synchronous updates by dispatching an action. Redux Thunk allows you to extend this functionality to middleware to write async logic. It allows us to interact with Firebase with `react-redux-firebase` in the action creator.


> :information_source: Fun fact: redux-thunk is only [14 lines of code](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)

### [Firebase](https://firebase.google.com/)

Firebase is used for Authentication, Cloud Firestore, and Storage.

Authentication is simple with Firebase as it provides secure sign-in functionality. It connects with Firestore, a serverless NoSQL database. In this project, Firestore holds the user and event data. Firestore's free tier allows 50k document reads, 20k writes, and 20k deletes. Firebase storage provides 5GB storage that this project uses to serve event images.

### [react-redux-firebase](https://react-redux-firebase.com/)

Rather than components interacting directly with Firebase, this package connects Redux state to Firebase. We enable it to connect Auth with Firestore and automatically load the user profile to the state.

Check out the [React, Redux, & Firebase App Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3) playlist for more information on integrating everything together. Redux can be a little confusing at first, but he explains it very well.

### [Bootstrap](https://getbootstrap.com/)

This project users Bootstrap 4 using a CDN found in `public/index.html`. You can add classNames to HTML tags inside your components to style them. Bootstrap is a really useful way to include quick styles to a project as well as make your project responsive (compatible with different screen sizes). I highly recommend looking at the documentation to become familiar with the styles.  It also (unfortunately) use jQuery and Popper.js for js functions like the dropdown menus and responsive header.

### [Formik](https://formik.org/)

Formik is used to create forms for the web page. It is a simple and reusable interface that handles the state so you do not have to code a React form yourself.

> :information_source: Many functions, such as signing up, are incredibly fast with Formik forms which make it feel like the form did not even work. To give the form submission user experience a better feel, I added a brief delay.

##### [Yup](https://github.com/jquense/yup)

Yup is custom validation that interacts very well with Formik.

### [DevExtreme React Grid](https://devexpress.github.io/devextreme-reactive/react/grid/)

DevExtreme React Grid is a component that can integrate with Redux state and allows us to edit user data inside the dashboard. [Spreadsheet.js](#--------spreadsheetjs) is a reusable component that uses this component.

### [Victory](https://formidable.com/open-source/victory/)

Victory is a charting library for React.js built on [d3](https://d3js.org/), a very powerful JavaScript data visualization library. This project uses [2 line charts](#--------charts) with Victory.

### [FortAwesome (FontAwesome)](https://fortawesome.com/)

We can use svg icons using FontAwesome, a popular icon library, with React. This is a lot better than loading the entire icon set with a CDN because it only loads the icons used in the project. See [library.js](#libraryjs).

### [Google Domains](https://domains.google.com/)

Google Domains isn't a dependency, but the domain name is registered from there. A domain name gives us some extra features:

**If you want to have a subdomain redirect to an external link**, you have to set it up on Google Domains (where the domain is hosted). Look at a tutorial to redirect a subdomain to an external URL with Google Domains.<br>
For example,`example.sbleos.org` could redirect to `https://example.com/path/to/really/long/link`.

**Any name `@sbleos.org` gets redirected to the club email.** For example, `hello@sbleos.org`, `info@sbleos.org`, etc. all redirect to the club email. You can also set up to 100 addresses with `@sbleos.org` that redirect to a personal email (you may have to remove the wildcard `*@sbleos.org` that makes *any* email redirect to the club email). For example, you can set `advisor@sbleos.org` to redirect to the current club advisor.

## Project Structure

### Assets

The `src/assets` folder is where any local assets are kept, including images, PDFs, JSON files, etc. Each directory in `src/assets` corresponds to the images in its respective page. `src/assets/logos` is used as logos for certain parts of the front-end of the app, but many of the logos are rendered in the Upcoming or Previous Events when it is a property of that specific event. `src/assets/board` has a unique structure and is gone over in further detail.

##### Board

The directory `src/assets/board` is split up into directories named by fiscal years. Each subdirectory has the images of that fiscal year's board. `board.json` contains the data of each board that is rendered on the Board page.

One of the tasks of the developers is to add the images of the current year's board and update `board.json`. Remember, the images must be centered and square-cropped or else they will appear stretched.

Each member object has the following properties:
- `name`: First and Last Name
- `relativeImageURL`: image file name only (ex. "john.jpg")
- `description`: Description provided by each member

Follow this template for how each object with the key of the fiscal year should look in `board.json`.

```json
"2019-2020": {
  "president" : {
    "name": "",
    "relativeImageURL": "",
    "description": ""
  },
  "vicePresident" : {
    "name": "",
    "relativeImageURL": "",
    "description": ""
  },
  "secretary" : {
    "name": "",
    "relativeImageURL": "",
    "description": ""
  },
  "treasurer" : {
    "name": "",
    "relativeImageURL": "",
    "description": ""
  },
  "executiveMembers": [
    {
      "name": "",
      "relativeImageURL": "",
      "description": ""
    },
    {
      "name": "",
      "relativeImageURL": "",
      "description": ""
    },
    {
      "name": "",
      "relativeImageURL": "",
      "description": ""
    }
  ]
}
```

In the end, `board.json` should look something like this:
```json
{
    "2019-2020": { },
    "2020-2021": { }
}
```

#### Components

Instead of editing the entire project, React allows you to edit reusable components. Components are basically organized HTML with its own JavaScript functionality.

#### --- Dashboard

> :mag: This is a directory for the components of the dashboard. If you are looking for the page `Dashboard.js`, go to [`pages/Dashboard.js`](#dashboardjs).

#### --- --- Charts

These are two time series line charts created with the victory package. Each chart consists of a main chart and a mini chart. The main chart has tooltips that are visible on hover. You are also able to zoom to see a specific region of the chart in more depth. You can pan through different regions by dragging left or right. The mini chart has a "brush" that allows you to select a region and "brushing" across the chart to change the domain. The domains are synced, so a change in one of the charts changes the other. To quickly reset the domain, click outside of the shaded brush area.

The charts are responsive and are rendered as svg components for the highest resolution.

#### --- --- --- AttendanceChart.js

AttendanceChart displays the number of people going to meetings or volunteering at events.

The component is connected to the `Events` Firestore collection and splits into eventData and meetingData to create two different lines on the chart.

#### --- --- --- MembershipChart.js

MembershipChart displays the number of active memberships at any given time. It is useful to visualize the growth of the club.

Unlike AttendanceChart, there is more logic required to create the data, which is a running total, so this is done in[ `getActiveMembership`](#------------getactivemembership) in the user action creator.

#### --- --- Create

#### --- --- --- CreateEvent.js

This is a form in a popup modal that is triggered by a button in the toolbar of the spreadsheet in `dashboard/Events.js` or `dashboard/Meetings.js`. The functionality is nearly the same to create an event or a meeting, but there are a few more options when creating a meeting. Both add a new element to a document of the fiscal year of event in the `Events` Firestore collection.

In both forms, a title and date is required. Also, there are optional fields to specify a description of the event, a link, and the link description. The link can be used for a Google Form to sign up as to volunteer.

There are additional features when creating an event. You can choose the type of event (default is "Community", a more general type, or there are other options such as the global causes set by LCIF). You can also upload an image. If the event type is anything other than community, you have an option to choose the icon that corresponds to the type of event (the icons are from LCIF and are located locally in `src/assets/logos`).

#### --- --- Update

Profile.js contains two components: UpdateProfile and UpdatePassword.

#### --- --- --- UpdatePassword.js

The user inputs their current password, new password, and confirms the new password.

The password validation should be the same as [`SignIn.js`](#signinjs).

#### --- --- --- UpdateProfile.js

The user can update some aspects of his or her profile, which makes it easier for the board to input their information in MyLCI. To avoid excessive calls to Firestore, the profile is only updated when the information is actually changed, not just when the "Save Changes" button is pressed.

#### --- --- Events.js

Events uses `Spreadsheet.js` to render a DevExtreme React Grid of all of the events in the Firestore `events` collection, which can also be filtered by fiscal year. In addition to the basic event details (the rest is hidden by default, but can be displayed if chosen), all of the users in the current fiscal year (or all if unfiltered) is displayed as a header. The value of each member at each event is the number of hours earned by that member. If the field is blank, 0 is displayed.

The events are sorted by default in ascending order by date. The number of events and total number of hours of each member is located at the footer. There is also a delete button that triggers an "Are you sure you want to delete this event" alert.

:exclamation: **Do not delete an event using the Firestore console unless if you absolutely know how the code works and imitate it perfectly. The code deletes it from the proper document by year. Just use the code!**

If the currently logged-in user does not have admin privileges (their position is "Member"), then they can only see their own hours, not those of other users, and he or she will not be able to edit the spreadsheet.

#### --- --- Meetings.js

Meetings is the same as Events, but consists of meetings and not volunteering events.

Mark a member "Present" with a 1 (unless the club decides to give hours for meetings, then mark the number of hours), and leave the field for absent members blank.

#### --- --- Members.js

Members uses `Spreadsheet.js` to render a DevExtreme React Grid of all of the users in the Firestore `users` collection, which can also be filtered by fiscal year. The members are sorted by default by first name. The footer displays the number of users at the selected time as well as the total value of dues collected in a year.

> :information_source: Only the board has access to the Members tab

**There are three important things to know:**
1. If a members ID is blank, it will read "UNVERIFIED" in yellow. This means that he or she does not have access to any of the dashboard (besides profile) and cannot see their hours. You must add their Leo Member ID number from MyLCI to give them access.
2. A user will only have admin privileges if his or her `position` attribute is not "Member" (ex. "President", "Vice President", "Secretary", "Treasurer", "Advisor") or if the `developer` attribute is `true`. (The `developer` attribute is in case you want to give anyone not on the board or any graduated members admin access).
3. :exclamation: **Do not delete a user using the Firebase console (both in Firebase Auth and Firestore `users` collection unless if the user is new and unverified (there is a reason there is no delete user functionality).**

`developer` takes in `true` or `false` and is displayed as either "Yes" or "No".

You can also enter in a value for the number of dues for a certain year, which will be displayed with a currency format in green (enter without the dollar sign `$`). If the field is blank, the field will read "Not Paid" in red. Any other text will be in blue, so use this to specify if the user was "Not in club" in that year.

A member's name, email address, home address, phone number, and date of birth cannot be changed by an admin.

:exclamation: **Even more important things to know**
- `joinDate` uses the date the users signed-up on the website. If you have the actual date stored (either on MyLCI, Google Sheets, or the registration form), you should **absolutely** use that date instead of the date the person signed up on the website. **This is especially important if the member was in the club before the website was created**.
- A member's `start` feature is by default the fiscal year according to the date they signed up on the website, but if he or she was in the club before, update the `start` fiscal year accordingly. Similarly, `end` is left blank (and is rendered as "Present" on the spreadsheet), but if the member graduated from the club, update their fiscal year to their last year in the club.

:exclamation: **RECAP!!**
`joinDate`, `start`, and `end` should be properly updated because it **affects the functionality of the entire dashboard!!** Don't forget to update `end` when a member leaves the club.

#### --- --- NavDash.js

The navigation menu of the dashboard takes up part of the left of the screen, and has links to each of the dashboard tabs. If the user is unverified, the only tab is Profile. Once the user is verified, he or she gains access to Events and Meetings. Admins also have access to Overview and Members.

The links to each tab use [nested, dynamic routes](https://reactrouter.com/web/example/nesting), meaning that if the name of the declared route in App.js changes, it should still work.

#### --- --- Overview.js

Overview is the default dashboard page for admins and functions as a summary of the club's metrics (attendance and membership growth). It contains two line charts, [AttendanceChart](#------------attendancechartjs) and [MembershipChart](#------------membershipchartjs) [(see `components/dashboard/charts`)](#--------charts).

> Only admins have access to Overview

#### --- --- Profile.js
Profile.js is one of the tabs in the dashboard. It gets `profile` passed down 
as a prop from `Dashboard.js`, and passes it down to the two components, `UpdateProfile and UpdatePassword. When the user is not verified, Profile is the only accessible tab of the dashboard. Profile also uses the notification system to alert the user of successful (or unsucccessful) changes to their profile.

#### --- --- Spreadsheet.js

Spreadsheet.js is a reusable spreasheet component built from [DevExtreme React Grid](https://devexpress.github.io/devextreme-reactive/react/grid/). The backend components that interact with the React state is from `@devexpress/dx-react-grid` and the rendered components are from `@devexpress/dx-react-grid-bootstrap4`, meaning that they use Bootstrap classNames.

Each cell of the spreadsheet is editable, unless otherwise specified, by double clicking on it. Only those with admin privileges can edit the cells. Each column can be sorted in ascending or descending order by clicking on its header. Additionally, each column has a search bar above the header to search values in that column. The entire grid has a search bar as well in the toolbar to search in the entire dataset provided. The developer can choose which columns are hidden from the grid by default, and the user can see more or less columns by clicking the 'eye' icon and enabling or disabling the column. Infite scrolling is enabled by `<VirtualTable />`.

DevExtreme React Grid follows the data piping principle, meaning that the data is processed in the same order as defined in the grid. For example, the a plugin that manages state or processes data should come before the UI plugin that is linked to that component.

Props:
- `rows`: The row data that is rendered. It should be an array of the inidividual object data.
- `headers`: An array of objects of the columns. The format of each object should be `{ name: referenceOfProperty, title: 'Actual Property Name' }`
    - ex. `{ name: 'memberID', title: 'ID' }`
- `commitChanges`: A function that is called when a cell is changed. The parameters of the function are destructured as `added`, `changed`, and `deleted`. `added` is not used in the project, and `deleted` is only used when necessary.
    - ex.
    ```jsx
    const commitChanges = ({ changed, deleted }) => {
      // instead of passing 'events' to the action creator, we get it from Firestore since this copy may be modified
      if(changed) {
        // changed[event.id] is the cell that was changed
        events.forEach(event => changed[event.id] ? updateEvent({...event, ...changed[event.id]},event.date) : event)
      }
      else if(deleted) {
        new Set(deleted).forEach(id => {
          let idx = events.findIndex(event => {return event.id === id});
          deleteEvent(events[idx],null)
        })
      }
    }
    ```
- `defaultSorting`: An array of objects of the columns that should be sorted by default. Each object in the array should have the properties `columnName`, the reference to the data property, and `direction`, which can be either "asc" or "desc".
- `disableSorting`: The columns that cannot be sorted. This is not used in the project. Refer to the docs if needed.
- `disableColumns`: The columns that cannot be edited. Similar to `defaultSorting`, it uses the properties `columnName`, the reference to the data property, and `editingEnabled`, which should be `false`.
- `disableFiltering`: The columns that cannot be filtered. This is not used in the project. Refer to the docs if needed.
- `multilineColumnNames`: Some values of the data may be too long and will be cut off unless double clicked to expand. However, to see the entire value, `multilineColumnNames` should be an array of the column reference names.
- `columnBands`: This can be used to group certain columns together and title the band of columns. It is an array of objects with properties `title`, the title of the group, and `children`, and array of objects with only the `columnName` property.
- `defaultHiddenColumnNames`: It is cleaner and more efficient to only show the important columns at first and view the when needed. `defaultHiddenColumnNames` is an array of the column reference names that should be hidden by default.
- `customProviders`: Sometimes, a cell looks better when it is rendered in the way humans perceive the value. For example, true and false can be rendered as Yes or No, or Date objects can be rendered as a string. These cells retain their original value when double clicked.
    - Use the example provided to understand this prop
    ```jsx
    const DateTimeFormatter = ({ value }) => new Date(value).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
    const LinkFormatter = ({ value }) => <a href={value}>{value}</a>;

    const customProviders = [
      { formatter: DateTimeFormatter, for: ['date'] },
      { formatter: LinkFormatter, for: ['imgURL','formLink'] },
    ]
    ```
- `plugins`: You can add additional plugins to the toolbar using the core package `@devexpress/dx-react-core`. So far, the plugins this project uses is `ToolbarButton` and `ToolbarDropdown` from `src/components/dashboard/plugins/plugins.js`. See either Events or Meetings in the Dashboard or look at the docs for more usage.
- `canDelete`: If you want to be able to delete a row, simply add `canDelete={true}` as a prop, and it will add a delete button to each row. When clicked, it will create an "Are you sure you wish to delete this row" alert.
- `summaryColumnNames`: You can display a summary of a column at the footer of the grid. Send an object array with properties `columnName` and `type`, the summary type. Options used in the project are "count", a simple count of the number of rows, and `sum`, the sum of all values in the column. See the docs for more options. *Note: "sum" was overridden in Spreadsheet.js to ignore NaN values.*
- `leftColumns`: An array of the column reference names that represent the columns that are frozen on the left, meaning that as you scroll, the columns will not scroll with the rest of the data. It is useful if there are properties of the data that are relevant to the rest of the data, like the name of the member or the event title.
- `rightColumns`: Same as `leftColumns` but on the right side of the grid.
- `hasAccess`: This is passed down from Dashboard.js and controls if the user can edit the data in the spreadsheet. It is a boolean.


#### BoardMember.js

This is used in the Board page. This creates an image, name, position, and description of the Board Member. Since there are 3 executive members, they will be in the same row, while the other members on the board are 2 per row. This is responsive, so as the screen size changes (on mobile devices), it adapts.

> :exclamation: The image must be centered and square-cropped!! Since the component renders the image as a circle, it will appear stretched if not done properly.

#### Events.js

The script parses the events from Firestore and sorts it by date. It creates a card with a color ring that represents which global cause it addresses. The event has a title, date, description, type (global cause), image, and form link.

Events have 2 props: `type` and `max`. The possible types are either "upcoming" or "previous", which shows the upcoming or previous events. If `type` is not specified, it will show all of the events. `max` takes an integer which sets a limit on how many events it will display. If `max` is not specified it will show all of the events (filtered by `type`);

```jsx
<Events type="upcoming" max={4}/>
```

#### Footer.js

This is only used in the Layout component. Look at the source code if you need to add anything. To modify the footer, you should be comfortable with HTML and CSS.

#### Header.js

This is only used in the Layout component. This is where the navbar code is located. The navigation relies completely on Bootstrap. Look at the source code of Header.js and the documentation of Bootstrap's Navbar to learn more, such as how to use extra features such as a dropdown menu.

#### Layout.js

Layout wraps the entire application with a Header and a Footer. Generally, the rest of the project is wrapped in a container (`<div className="container"`) in each of its pages (you have to do this yourself). There is no footer on the dashboard.

##### Breadcrumb.js

This should be the first line when rendering any page. It is already wrapped in a container (`<div className="container"`), so do not wrap it again.

The only prop is `directory`, which takes an object with two properties, `path` and `name`.

`path` is a String of the route of the page, and `name` is the text displayed on the Breadcrumb. `name` is either an array of strings or a single string if the `path` is not nested. `path` can either be split by a slash `/` or question mark `?`. The length of the split `path` must be the same as the length of `name`.

When displaying the Breadcrumb, each `name` is linked to its respective URL except the last `name` element, which is the current path (the first part is always a link to the home page).

If you were on the page "Page", the Breadcrumb may look like this.
```jsx
<Breadcrumb directory={{path: "/path/to/route", name: ["Path", "To", "Page"]}} />
```
which renders `Home / Path / To / Page`

Breadcrumb.js also works with queries in the string (it is only tested with one query).
```jsx
<Breadcrumb directory={{path: "/board?year='2019-2020'", name: ["Board", "2019-2020"]}} />
```
renders `Home / Board / 2019-2020`

##### Link

This is from 'react-router-dom'. Look at the documentation for Link if you need more features.

**Link only works for internal routes! Use `<a>` for external links.**
```jsx
<Link to="/path/to/link" style={style} className="className">Text to display</Link>
```

### --- NotificationSystem

A reusable notification system.

Examples:
```jsx
dispatch(createNotification({
  title: "Created New Event",
  message: `Created Event "${event.title}"`,
  type: "success",
  delay: 5000
}))
```
```jsx
dispatch(createNotification({error}))
```

### --- --- Notification.js

An individual notification component that is rendered in the Notifications.js container. The prop is a `notification` object that has properties `id`, `title`, `message`, `delay`, `type`, `borderColor`, `error`.

A notification is created with `createNotification` in the notification action creator. This generates an ID which is used in `removeNotification` to remove it after a certain `delay` time or a default or 5 seconds, or when the notification is manually closed.

Props:
- `type`: Determines border color of notification, overwrites `borderColor`.
    - Options: "success" (green), "error" (red), "warning" (yellow), "info" (blue)
- `title`: Will display title of notification if specified.
- `message`: Will display message of notification if specified.
- `delay`: Milliseconds in which the notification is automatically closed.
    - Default: 5000 ms
- `error`: Easiest way to dispatch an error, especially from Firebase. Will use the error code as the `title`, error message as the `message`, and a red `borderColor` (`error` has higher priority than other props.

### --- --- Notifications.js

Wrapper that renders all notifications currently in `state.notification.notifications` from the notification reducer. It takes up the entire viewport. The prop `location` determines where in the viewport to display the notifications (options are "top-right", "top-left", "bottom-right", "bottom-left" and default is "top-right");

### SignIn.js

The sign in page at the route `/login` contains a Formik form and Yup validation. The password input field has a toggle visibility button.

If the user is already logged in, any attempt to access the route `/login` will be redirected to the route `/dashboard`.

There is a forgot password field where Firebase sends a password reset email to the given email address. The user can also change their password in his or her profile on the dashboard.

The sign in form uses the notification system, which is useful to show errors such as the email already is used by someone else. The browser can also save the credentials.

#### SignUp.js

This form allows people to sign up with a first name, last name, email, and password. If it is valid, then a new member is added to firestore.

The sign up form is located on the landing page (home page) and contains 3 useful links to people interested in joining the club. The first link is a PDF of the registration form new members must hand in to the board, the second link is a link to join the mailing list, which is currently a Google Group, and the third link is to join the Remind group to receive SMS notifications.

Password validation: The password must be between 8 and 16 characters. I would also like to add a regular expression (regex) that requires it to also have one uppercase, one lowercase, and one special character, but I could not find one that works.

> :information_source: When logged in, the sign in form will not render.

### Pages

These are all of the actual pages in the website. The components are meant to make the page files pretty simple.

#### About.js

Responsive page using Bootstrap informing about the club.

#### Board.js

The information of the board of each year is stored in `src/assets/board/board.json`.

It renders the latest fiscal year's board by default, and also can instead render a board by its fiscal year which is queried in the URL (only if that fiscal year is included in the `src/assets/board/board.json`).

##### BoardDescription.js

Renders the given year's <BoardMembers /> (default is latest fiscal year's board). If the year is not the latest fiscal year, the title of the window (on the tab) and the tile of the page informs the reader of the fiscal year of the board. The Breadcrumb also is determined by the fiscal year.

#### Dashboard.js

Redirects the user to the login page if not logged in.

Renders NavDash on the left (navigation menu), and the dashboard tab on the right. Dashboard.js connects to the Firebase profile (current user profile) with Redux, and has access to the URL with `withRouter` from `react-router-dom`. Both are passed to the component as props.

Renders each tab using [nested, dynamic routes](https://reactrouter.com/web/example/nesting), meaning that if the name of the declared route in App.js changes, it should still work. Based on the relative URL, it renders one of the tabs. The default tab for admins is Overview, the default tab for verified members is Events, and the default tab for unverified members is Profile.

### Home.js

Contains the [sign up form](#signupjs) with useful links. The form only renders if the user is not logged in, so there is a quick links section at the bottom of the page as well. The landing page also shows upcoming and previous events that are from the `events` Firestore collection.

### Mission.js

Responsive page using Bootstrap informing about the mission of the club and Lions Clubs as an international organization.

### NoMatch.js

The 404 page that is rendered when the URL does not match with any of the routes.

### Projects.js

Responsive page using Bootstrap informing about the projects of the club.

### Store

This is the central Redux store used to manage the state of the application.

#### --- Actions

Actions, found in action creators, are simply functions that allow you to manipulate payload from the dispatch, which then is passed to the reducer. We can also interact with Firebase in the action creators.


#### --- --- authActions.js

#### --- --- --- signIn

Sign in to Firebase Auth and creates a notification based on success or error.

Parameters:
- `credentials` object with properties `email` and `password`

#### --- --- --- signOut

Logout current user from Firebase and deletes all data from the store.

#### --- --- --- signUp

Creates a new Firebase Auth user, sends a verification email, and creates a new user in the `users` Firestore collection with default user fields used in the project. Creates a notification based on success or error.

Parameters:
- `newUser` object that contains the data the user provided from the sign up form, such as `email`, `password`, `firstName`, and `lastName`.

#### --- --- --- sendPasswordResetEmail

Firebase sends a password reset email to the given email, and the app creates a notification.

Parameters:
- `emailAddress`: email address of the user to send a password reset email.

#### --- --- --- updatePassword

Reauthenticates user with a `firebase.auth.EmailAuthProvider.credential` object, updates the password, and then creates a notification.

Parameters:
- `currentPassword`: user's current password
- `newPassword`: user's new password

#### --- --- eventActions.js

#### --- --- --- createEvent

If an image is given, it is uploaded to Firebase Storage. The image URL returned by uploading the image to Firebase Storage is saved to the event object. The action then adds the event object to the events array in the proper document by fiscal year in the `events` collection. Creates a notification.

Parameters:
- `event`: object with event data

#### --- --- --- getImage
Since the image is accessible by The Firebase Storage image URL that is saved to Firestore, there is no need to download it from Firebase. An image object consisting of the image path and URL is added to the state.

Parameters: `imgsrc`: The path of the image located in the Firebase Storage bucket.

#### --- --- --- updateEvent

Updates the event details.

Reshapes attendees of the event to an object and only changes the hours of each attendee if it is a number greater than 0. The action then determines which document to store the new event in based on the fiscal year of the event. If date is in the same fiscal year, then the updated event replaces the old event. Otherwise, it creates a new event with the updated event details and deletes the old event. This is because the event will be moved to a different document because the fiscal year is changed.

Parameters:
- `updatedEvent`: object containing the details of the event that was edited
- `originalDate`: date of the event before it was updated used to determine which document it is found in from the `events` Firestore collection.

#### --- --- --- deleteEvent

Deletes an event. Gets the document reference from the fiscal year of `deletedEvent.date` if `originalDate` is null, or uses `originalDate`. Removes the event object from the array in its respective collection. If the event has an image, it is deleted from the Firebase Storage bucket.

Parameters:
- `deletedEvent`: object of the deleted event
- `originalDate`: null if deleting the event, or a date if event is updated from `updateEvent`

#### --- --- --- getUsers

Adds all of the members in the given `fiscalYear` to the state. If `fiscalYear` is null, it adds all of the members in the club to the state.

Parameters: `fiscalYear` String of the fiscal year

#### --- --- notificationActions.js

See [Notification System](#----notificationsystem) for usage.

#### --- --- --- createNotification

Adds the notification to the state with a ten-digit ID used to delete the notification.

Parameters:
- `notification`: object

#### --- --- --- removeNotification

Removes the notification with the `id`.

Parameters:
- `id`: Integer

#### --- --- profileActions.js

#### --- --- --- updateProfile

Updates the profile and the Firestore document that is linked to the profile in the `users` collection using React Redux Firebase `updateProfile`. See their docs for more information. Creates a notification.

Parameters:
- `updatedProfile`: object

#### --- --- userActions.js

#### --- --- --- updateUser

Updates the member in the `user` Firestore collection. Used in Members dashboard tab for an admin to update the user. Reshapes dues to an object of dues labeled with the fiscal year, removes any dollar signs from dues, and casts dues as an integer.

Parameters:
- `updatedUser`: object

#### --- --- --- getYears

Gets all the years the club has existed and adds it to the state.

#### --- --- --- getActiveMembership

Gets the number of active members from each year the club has existed using the `user.joinDate` and `user.end`.

> :warning: This is a very useful function to track the growth of the club and display it as a graph, but it may be more intensive.


#### --- Reducers

Each action creator has its own designated reducer. All of the reducers are combined in the rootReducer. These reduces allow you to determine changes in the state of the central Redux store.

### Utils

This is where you will store any static files you need to serve, such as any images or PDF's. If you need to upload files (maybe for a picture of an upcoming event), you should use Firebase.

#### --- getFiscalYear

Gets the fiscal year of `date`. Fiscal year starts on July 1st and ends on June 30th.

Parameters:
- `date`: String or Date

Returns a string of the fiscal year (ex. "2019-2020").

#### --- generateID

Generate a random ID of length `len`.

Parameters:
- `len`: length of ID to generate

Returns a random integer of length `len`.

#### --- getDateArray

Generates an array of Date objects of every single day since July 1st of the specified year.

Parameters:
- `date` Date from user.joinDate 

Returns an array of Dates.

#### --- isActive

Check if a user is active at a specific date.

Parameters:
- `joinDate` Date joined
- `endYear` String ending fiscal year
- `date` Date to be checked with

Returns true if date is between joinDate and June 30th of `endYear`.

### App.js

Top-level App component. React Helmet makes the window have a default title, and uses a title template for Helmet in page components to change part of the title.

Wraps the App in `BrowserRouter`, and creates Routes for the pages of the application.

> :information_source: Normally, the web page is rendered before Firebase Auth is connected. This does not look good because a logged-in user is first redirected to `/login` because Auth is not loaded, and then redirected back to the dashboard. This results in a quick "flash" which is prevent by the function AuthIsLoaded.

#### Routes

Inside src/App.js, the <Route> is inside a <Switch> so all files that are not declared will display a 404 page.

If you need to declare a new route, follow this structure
```jsx
<Route path="/path" component={Component} />
```
with path being the exact route Component being the page you want to render. Be sure to import the Component (add `import Component from './pages/Component';` to the top) and keep it in curly braces.

If a route ("/route") has a subroute ("/route/subroute" ), add `exact` to the route tag:
```jsx
<Route exact path="/path" component={Component} />
```

#### Redirect to External Link

This is very useful if there is a long link you want to shorten so people remember it.


**If you want to have a route redirect to an external link**, use this format:
```jsx
<Route path='/example' component={() => {
    window.location.href = 'https://example.com/path/to/really/long/link';
    return {Home};
}}/>
```
For example,`sbleos.org/example` could redirect to `https://example.com/path/to/really/long/link`.


> :information_source: Note to developers: We return {Home}, but it actually redirects the client to the link instead of first taking them to the home page. It can be any component, but don't worry about touching this (it is only so it doesn't render an empty page before redirecting them).

**If you want to have a subdomain redirect to an external link**, you have to set it up on Google Domains (where the domain is hosted). Look at a tutorial to redirect a subdomain to an external URL with Google Domains.<br>
For example,`example.sbleos.org` could redirect to `https://example.com/path/to/really/long/link`.

### firebase.js

Imports Firebase, Firestore, Auth, and Storage. Initializes firebaseConfig taken from the firestore console. Initializes firebase app as well as Firestore, Auth, and Storage.

> Do not worry that the apiKey is exposed on GitHub. It is just a reference to the firebase app that only this app can access.

### index.js

This is where the React App starts. Wraps `<App />` in a providers from  to connect Firebase to the Redux store. Firebase Auth and user profile is connected to the Firestore `users` collection. The Redux store is created from the rootReducer and is supplied with an extra argument of firebase with `redux-thunk`. The service worker is also registered for offline usage.

### library.js

Instead of importing FontAwesome icons into each component, they are imported only once in library.js to be used across the entire app. It is useful when using the same icon more than once and it is a lot cleaner to separate the imports for the icons in library.js.

Instead of
```jsx
// Component1.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

<FontAwesomeIcon icon={faEye} />
<FontAwesomeIcon icon={faInstagram} />

// Component2.js
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

<FontAwesomeIcon icon={faEye} />
```
we can use
```jsx
// library.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(
  faInstagram,
  faEye
);

// Layout.js
import "../library";

// Component1.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<FontAwesomeIcon icon="eye"/>
<FontAwesomeIcon icon={["fab","instagram"]}

// Component2.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

<FontAwesomeIcon icon="eye"/>
```
