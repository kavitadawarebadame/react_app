import React from 'react';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';

import Products from './pages/Products';
import Addproduct from './pages/Addproduct';
import Editproduct from './pages/Editproduct.js';


function App() {
  return (
    <Router>
      <Switch>
        
        <Route exact path="/" component={Products} ></Route>
        <Route exact path="/addproduct" component={Addproduct} ></Route>
        <Route exact path="/editproduct/:id" component={Editproduct} ></Route>
        
      </Switch>
    </Router>
  );
}

export default App;
