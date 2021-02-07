import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Home from "./ui/Home";
import Add from "./ui/Add";
import Edit from "./ui/Edit";
import Country from "./ui/Country";
import Countries from "./ui/Countries";
import NotFound from "./ui/NotFound";

function App() {
  return (
    <Router>
      <Route path="/" component={Navbar} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/countries/add" component={Add} />
        <Route exact path="/countries/:code/edit" component={Edit} />
        <Route exact path="/countries/:code" component={Country} />
        <Route exact path="/countries" component={Countries} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
