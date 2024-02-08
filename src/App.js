import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRouters";
import Header from "./Header";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Header />
          <div className="content">
            <AppRoutes />
          </div>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
