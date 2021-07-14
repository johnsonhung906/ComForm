import './App.css';
import Graph  from './components/Graph/Graph';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import Home from './components/home/Home'
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
      </Switch>
    </Router>
  );
}

export default App;
