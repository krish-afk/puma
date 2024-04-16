import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import Map from './components/Map';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
                                             
  return (
   <div>
    <Router>
      <Routes>
        <Route 
        exact
        path="/"
        element={<Home/>}
        />
        <Route 
        exact
        path="/search"
        element={<Search/>}
        />
        <Route
        exact
        path='/map/:query'
        element={<Map/>}
        /> 
      </Routes>
    </Router>
   </div>
  );
}

export default App;


