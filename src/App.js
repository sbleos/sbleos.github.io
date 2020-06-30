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
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { Helmet } from 'react-helmet';

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div></div>;
    return children;
}

/* TODO
 *  - Make Breadcrumbs work recursively for subdirectories
 *  - Add keywords to React Helmet
 *  - Add Attendance and Meeting graphs to Overview.js
 *  - Improve front-end
 *  - Add 2020-2021 Board
 */


function App() {
  return (
    <div>
       <Helmet titleTemplate="%s | SB Leo Club" defaultTitle="SB Leo Club">
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="author" content="Sarang Mohaniraj" />
        </Helmet>
    	<Router>
        <AuthIsLoaded>
          <Layout className="App">
            <Switch>
        	    <Route exact path="/" component={Home} />
        	    <Route path="/about" component={About} />
              <Route path="/mission" component={Mission} />


              <Route exact path="/projects" component={Projects} />
              {/* THIS IS HOW TO REDIRECT AN INTERNAL ROUTE TO AN EXTERNAL LINK
                * AKA set up custom subdirectory routes "example.com/custom"
                * you can also set up subdomains that redirect to a link on Google Domains "custom.example.com"
                */}
              <Route path='/leo5krun' component={() => {
                window.location.href = 'https://runsignup.com/Race/NJ/MonmouthJunction/Leo5KRun';
                return {Home};
              }}/>
              {/*^^^^^ THIS IS HOW TO REDIRECT AN INTERNAL ROUTE TO AN EXTERNAL LINK ^^^^^^*/}

              <Route path="/board" component={Board} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/login" component={SignIn} />
        	    <Route component={NoMatch}/>
            </Switch>
          </Layout>
          </AuthIsLoaded>
      </Router>
    </div>
  );


}

export default App;
