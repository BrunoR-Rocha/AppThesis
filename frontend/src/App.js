import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Landing from "./resources/routes/landing";
import About from "./resources/routes/about";
import Login from "./resources/routes/auth/login";
import CustomLayout from "./resources/routes/layout";
import Register from "./resources/routes/auth/register";
import Library from "./resources/routes/library";
import LibraryPage from "./resources/routes/library/pages";
import Posts from "./resources/routes/forums";
import ThreadPage from "./resources/routes/forums/thread";
import Academy from "./resources/routes/academy";
import CoursePage from "./resources/routes/academy/course/page";
import ScrollToTop from "./resources/components/general/ScrollTop";
import { ToastContainer } from "react-toastify";
import Profile from "./resources/routes/profile";
import QuizPage from "./resources/routes/academy/quiz";
import EmailConfirmation from "./resources/routes/auth/confirmation";
import Policy from "./resources/routes/policies/policy";

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
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
            <Route path="library" element={<Library />} />
            <Route path="library/:id" element={<LibraryPage />} />

            <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<ThreadPage />} />

            <Route path="academy" element={<Academy />} />
            <Route path="academy/course/:id" element={<CoursePage />} />
            <Route path="academy/quiz/:id" element={<QuizPage />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="profile" element={<Profile />} />
            <Route path="email-confirmation" element={<EmailConfirmation />} />

            <Route
              path="privacy-policy"
              element={<Policy label={"Privacy Policy"} />}
            />
            <Route
              path="terms-conditions"
              element={<Policy label={"Terms and conditions"} />}
            />

            <Route path="*" element={<Navigate to="/" />} />
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
