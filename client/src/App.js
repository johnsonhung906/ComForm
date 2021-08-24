import './App.css';
import Graph  from './page/Graph';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import MainPage from './page/MainPage';
import Home from './page/Home';
import View from './page/View';

import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" exact component={MainPage} />
        <Route exact path="/home" exact component={Home} />
        <Route exact path="/signin"  component={SignIn} />
        <Route exact path="/signup"  component={SignUp} />
        <Route exact path="/edit/:formid"  component={Graph} />
        <Route exact path="/view/:formid"  component={View} />
      </Switch>
    </Router>
  );
}

export default App;
