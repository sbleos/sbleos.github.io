import React from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Projects from './pages/Projects';
import Board from './pages/Board';
import Dashboard from './pages/Dashboard';
import SignIn from './components/SignIn';
import NoMatch from './pages/NoMatch';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { Helmet } from 'react-helmet';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div></div>;
    return children;
}

/**
 * TODO:
 *  - Improve front-end
 *  - Find a working password validation regular expression
 *  - Add keywords to React Helmet
 *  - Get add a white background to the favicon and generate an icon set (better contrast on dark backgrounds and able to use as apple touch icon)
 *  - ADVANCED: Create a wrapper component for <Link> that requires the user to be logged in if true, or is a regular link if false.
 *
 *  - Lazy Load/Blur up images
 *  - Currently, all styles are set inline. This is bad for performance because everytime a component re-renders, the CSS compiles again.
 *      Ways to fix it:
 *       - Declare the styles as an object outside of the component (in the global scope)
 *       - Use a CSS file and give classNames
 *       - Use styled-components (npm package)
 *      Either move all styles to variables declared outside of the component, to keep styles individual to each component,
 *      or move
 *  - robots.txt may not be working properly because it is a SPA
 *
 * Known Issues:
 *  - When viewing all the members in an incognito browser, the dues should initially be hidden, but they are sometimes not. This is not an issue in regular browsing for some reason.
 */


function App() {
  return (
    <React.Fragment>
       <Helmet titleTemplate="%s | SB Leo Club" defaultTitle="SB Leo Club">
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="author" content="Sarang Mohaniraj" />
        </Helmet>
    	<Router>
        <AuthIsLoaded>
          <Layout className="App">
            <Switch>

              {/**
                * Use 'exact' when there the path has a "sub-path"
                * Ex. "/" is the root so you use exact on the root, "/about" is the sub-path so there is no need for exact
                * UNLESS there is another route that is like "/about/me", then "/about" also needs exact
                */}
        	    <Route exact path="/" component={Home} />
        	    <Route path="/about" component={About} />
              <Route path="/mission" component={Mission} />
              <Route path="/projects" component={Projects} />

              {/**
                * THIS IS HOW TO REDIRECT AN INTERNAL ROUTE TO AN EXTERNAL LINK
                * AKA set up custom subdirectory routes "example.com/custom"
                * you can also set up subdomains that redirect to a link on Google Domains "custom.example.com"
                */}
              <Route path='/leo5krun' component={() => {
                window.location.href = 'https://runsignup.com/Race/NJ/MonmouthJunction/Leo5KRun';
                return {Home};
              }}/>


              <Route path="/board" component={Board} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/login" component={SignIn} />
        	    <Route component={NoMatch}/>
            </Switch>
          </Layout>
        </AuthIsLoaded>
      </Router>
    </React.Fragment>
  );


}

export default App;
