import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactState from './context/contact/contactState';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import './App.css';

const App = () => (
  <ContactState>
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </>
    </Router>
  </ContactState>
);

export default App;
