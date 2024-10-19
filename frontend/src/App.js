import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CustomLayout from "./resources/routes/layout";
import ScrollToTop from "./resources/components/general/ScrollTop";
import { ToastContainer } from "react-toastify";
import routes from "./routes";
import ProtectedRoute from "./resources/components/app/ProtectedRoute";

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // Duration of the splash screen in milliseconds

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return <Splash />;
  // }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<CustomLayout />}>
            {routes.map((route, index) => {
              const { path, element, protected: isProtected } = route;

              if (isProtected) {
                return (
                  <Route
                    key={index}
                    path={path}
                    element={<ProtectedRoute>{element}</ProtectedRoute>}
                  />
                );
              } else {
                return <Route key={index} path={path} element={element} />;
              }
            })}
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        theme="light"
      />
    </>
  );
}

export default App;
