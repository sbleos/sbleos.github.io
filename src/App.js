import React from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Projects from './pages/Projects';
import Board from './pages/Board';
// import Dashboard from './pages/Dashboard';
import NoMatch from './pages/NoMatch';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'


function App() {
  return (
  	<Router>
      <Layout className="App">
        <Switch>
    	    <Route exact path="/" component={Home} />
    	    <Route path="/about" component={About} />
          <Route path="/mission" component={Mission} />


          <Route exact path="/projects" component={Projects} />
          {/*THIS IS HOW TO REDIRECT AN INTERNAL ROUTE TO AN EXTERNAL LINK*/}
          <Route path='/projects/leo5krun' component={() => {
            window.location.href = 'https://runsignup.com/Race/NJ/MonmouthJunction/Leo5KRun';
            return {Home};
          }}/>
          <Route path='/projects/covid-19' component={() => {
            window.location.href = 'https://charity.gofundme.com/';
            return {Home};
          }}/>
          {/*THIS IS HOW TO REDIRECT AN INTERNAL ROUTE TO AN EXTERNAL LINK*/}

          <Route path="/board" component={Board} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
    	    <Route component={NoMatch}/>
        </Switch>
      </Layout>
    </Router>
  );


}

export default App;
