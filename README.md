# South Brunswick Leo Club Website


## Usage (Leos)



Everything below this is for developers! If you only wanted to know how to use the website, there's no need to go any further. If you are interested in maintaining the website, all of the instructions are below!

## Usage (Developers) 

This website was created with React.js. Small updates are to add little bits here and there and consists mainly of copy and pasting and changing the words around. You actually do not really need to know how to code to do this. 

If you plan on doing more than that to change the website, you may need to know a little HTML and JavaScript. 

### Available Scripts

Before you run any of the scripts, make sure you have node_modules/ in your project. If it is your first time running the project, then it may not be there because it is blocked by the gitignore. If you do not have the directory, run `npm install`. By the way, if you are not sure how to code, this is done in the command line. It may seem complicated, but a simple tutorial can show you how to use it. [https://www.npmjs.com/get-npm](Get npm here if you do not have it).

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run deploy`

Builds the app for production and publishes it to [https://sbleos.org/](https://sbleos.org/).<br>
This will optimize the build for the best performance.
.<br>
Your app is ready to be deployed!

*Note to developers: The project is set up so the dev branch is the default branch which contains all the code and the master branch is the production branch which contains the published project. You should be in the dev branch at all times, because* `npm run deploy` *handles everything in the master branch, including pushing the changes to GitHub. Also, the master branch will always be behind the dev branch because it will always stay its own branch so GitHub Pages publishes from the master branch.*

#### RECAP!!

When editing, run `npm start` to see the changes to the code. When ready to publish the new site, run `npm run deploy`.

After you edit the project and are ready to push the changes to GitHub so one day another Leo can change the website, you should run these commands.
```
git add .
git commit -m "INCLUDE MESSAGE HERE"
git push
```

### Assets

This is where you will store any static files you need to serve, such as any images or PDF's. If you need to upload files (maybe for a picture of an upcoming event), you should use Firebase.

### Components
This project is styled with Bootstrap.

Instead of editing the entire project, React allows you to edit reusable components. These components are found in src/components. These are explanations of each component so it is easier to understand its purpose when editing the website.

#### BoardMember

This is used in the Board page. This creates an image, name, position, and description of the Board Member. Since there are 3 executive members, they will be in the same row, while the other members on the board are 2 per row. This is responsive, so as the screen size changes (on mobile devices), it adapts. Be sure to wrap each row of board members in `<div className="row">`.

#### Calendar

This is if you want to use FullCalendar from Google Calendar because it looks nicer. However, it does not work for some reason.

#### DashFrame

This is the container for the different applicationsi in the Dashboard.

#### Events

Right now, the events are hardcoded in this file, but it will soon be taken from Firestore instead of changing the code and deploying a new build every time you want to add a new event, you can just change it from the admin dashboard on the website.

The script parses the events and sorts it by date. It creates a card with a color ring that represents which global cause it addresses. The event has a title, date, description, type (global cause), image, and form link.

Events have 2 props: `type` and `max`. The possible types are either "upcoming" or "previous", which shows the upcoming or previous events. If `type` is not specified, it will show all of the events. `max` takes an integer which sets a limit on how many events it will display. If `max` is not specified it will show all of the events (filtered by `type`);
```html
<Events type="upcoming" max={4}/>
```

#### Footer

This is only used in the Layout component. Look at the source code if you need to add anything. To modify the footer, you should be comfortable with HTML and CSS.

#### Header

This is only used in the Layout component. This is where the navbar code is located. The navigation relies completely on Bootstrap. Look at the source code of this project's Header and the documentation of Bootstrap's Navbar to learn more, such as how to use extra features such as a dropdown menu.

#### Layout

Layout wraps the entire application with a Header and a Footer. Generally, the rest of the project is wrapped in a a container (`<div className="container"`) in each of its pages.

##### Breadcrumb

This should be the first line when rendering any page. It is already wrapped in a container (`<div className="container"`), so do not wrap it again.

The only prop is `directory` and takes in an array of `path`, which is the actual relative URL of the page, and `name`, which is the  
Breadcrumb displays the directory path (first is always Home, next are directories, and last is the current page). So if you were on page Directory, a Breadcrumb would look like this:
```html
<Breadcrumb directory={[{"path":"/path/to/directory","name":"Path/To/Directory"}]} />
```
which renders `Home / Path / To / Directory`

#### Link

This is from 'react-router-dom'. Look at the documentation for Link if you need more features.

**Link only works for internal routes! Use `<a>` for external links.**
```html
<Link to="/path/to/link" style={style} className="className">Text to display</Link>
```

*React tip: if style is a variable, you can set a components style with* `style={style}` *. To set styles inline, you can use something link* `style={{display:"block",fontFamily:"Lato"}}`. *Remember to use camel case and not dashes like regular CSS.*

##### ImageLink

This is a wrapper for Link so you can display an image that is also a link.
```html
<ImageLink className="className" to="/path/to/link" src={require("../assets/image.png")} width="50" height="50" alt="link" />
```

##### Section

*This is deprecated. Personally, this style is outdated and should probably not be used. As of now, it only works for one paragraph per header.*

Use only with `<div className="container">` so the text is not on the edge of the screen. Otherwise, uncomment the paddingLeft and change {margin: "4rem 0"} to {margin: "4rem"}

Props: `pos`: either "right", which is header on the left and paragraph on the right, or "left", which is the opposite. `h`: header text. `p`: paragraph text.

*Once again, you should just use HTML instead of this React component because it is much easier to read and has better functionality.*

#### SignupForm

This is a responsive form that is created with Formik to handle the React Hooks and Yup to handle validation. It allows people to sign up with a first name, last name, email, and password. If it is valid, then a new member is added to firestore.

There are no props, so you can just call `<SignupForm />`.

### Pages

These are all of the actual pages in the website. The components are meant to make the page files pretty simple.

#### Routes

Inside src/App.js, the <Route> is inside a <Switch> so all files that are not declared will display a 404 page.

If you need to declare a new route, follow this structure
```html
<Route path="/path" component={Component} />
```
with path being the exact route Component being the page you want to render. Be sure to import the Component (add `import Component from './pages/Component';` to the top) and keep it in curly braces.

If a route ("/route") has a subroute ("/route/subroute" ), add `exact` to the route tag:
```html
<Route exact path="/path" component={Component} />
```

#### Redirect to External Link

This is very useful if there is a long link you want to shorten so people remember it.


**If you want to have a route redirect to an external link**, use this format:
```html
<Route path='/example' component={() => {
    window.location.href = 'https://example.com/path/to/really/long/link';
    return {Home};
}}/>
```
For example,`sbleos.org/example` could redirect to `https://example.com/path/to/really/long/link`.


*Note to developers: We return {Home}, but it actually redirects the client to the link instead of first taking them to the home page. It can be any component, but don't worry about touching this (it is only so it doesn't render an empty page before redirecting them).*

**If you want to have a subdomain redirect to an external link**, you have to set it up on Google Domains (where the domain is hosted). Look at a tutorial to redirect a subdomain to an external URL with Google Domains.<br>
For example,`example.sbleos.org` could redirect to `https://example.com/path/to/really/long/link`.
