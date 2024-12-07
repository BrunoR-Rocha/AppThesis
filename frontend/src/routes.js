// src/routes.js

import Landing from "./resources/routes/landing";
import About from "./resources/routes/about";
import Login from "./resources/routes/auth/login";
import Register from "./resources/routes/auth/register";
import Library from "./resources/routes/library";
import LibraryPage from "./resources/routes/library/pages";
import Posts from "./resources/routes/forums";
import ThreadPage from "./resources/routes/forums/thread";
import Academy from "./resources/routes/academy";
import CoursePage from "./resources/routes/academy/course/page";
import Profile from "./resources/routes/profile";
import QuizPage from "./resources/routes/academy/quiz";
import EmailConfirmation from "./resources/routes/auth/confirmation";
import Policy from "./resources/routes/policies/policy";
import Forgot from "./resources/routes/auth/forgot";
import ResetPassword from "./resources/routes/auth/reset";
import CourseLearn from "./resources/routes/academy/course/learn";
import QuizReview from "./resources/routes/academy/quiz/review";
import CourseRating from "./resources/routes/academy/course/rating/rating";
import Maintenance from "./resources/routes/maintenance";

const routes = [
  {
    path: "/",
    element: <Landing />,
    exact: true,
  },
  {
    path: "/maintenance",
    element: <Maintenance />
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/forgot/reset",
    element: <ResetPassword />,
  },
  {
    path: "/email-confirmation",
    element: <EmailConfirmation />,
  },
  {
    path: "/privacy-policy",
    element: <Policy tag={"privacy_policy"} />,
  },
  {
    path: "/terms-conditions",
    element: <Policy tag={"terms_conditions"} />,
  },

  // Protected Routes
  {
    path: "/library",
    element: <Library />,
    protected: true,
  },
  {
    path: "/library/:id",
    element: <LibraryPage />,
    protected: true,
  },
  {
    path: "/posts",
    element: <Posts />,
    protected: true,
  },
  {
    path: "/posts/:id",
    element: <ThreadPage />,
    protected: true,
  },
  {
    path: "/academy",
    element: <Academy />,
    protected: true,
  },
  {
    path: "/academy/course/:id",
    element: <CoursePage />,
    protected: true,
  },
  {
    path: "/academy/course/:id/learn",
    element: <CourseLearn />,
    protected: true,
  },
  {
    path: "/academy/course/:id/rating",
    element: <CourseRating />,
    protected: true,
  },
  {
    path: "/academy/quiz/:id",
    element: <QuizPage />,
    protected: true,
  },
  {
    path: "/academy/quiz/continue/:id",
    element: <QuizPage />,
    protected: true,
  },
  {
    path: "/academy/quiz/review/:id",
    element: <QuizReview />,
    protected: true,
  },
  {
    path: "/profile",
    element: <Profile />,
    protected: true,
  },

  {
    path: "*",
    element: <Landing />,
  },
];

export default routes;
