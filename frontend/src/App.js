import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import ShowNote from "./pages/ShowNote";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <AddNote />
          </Route>
          <Route exact path="/:_id">
            <ShowNote />
          </Route>
          <Route path="/:_id/edit">
            <EditNote />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
