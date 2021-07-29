import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grafica from './components/grafica';
import Navigation from './components/navigation';
import 'bootswatch/dist/lux/bootstrap.min.css';
import Covid from './components/covid';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <div className="container p-4">
        <Switch>
          <Route exact path={["/", "/grafica"]} component={Grafica} />
          <Route path="/covid" component={Covid} />
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
