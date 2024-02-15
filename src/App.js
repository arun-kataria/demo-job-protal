import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRouters";
import Header from "./Header";
import { UserProvider } from "./UserContext";
import ErrorBoundary from "./ErrorBoundary";
import "./mocks/mswConfig";

function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;
