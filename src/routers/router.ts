// import NotFound from 'src/components/NotFound';
import CategoryViewer from "src/components/CategoryViewer";
import Notifi from "src/components/Notifi";
import Login from "src/components/User/Login";
import Register from "src/components/User/Register";
import AboutUs from "../components/AboutUs";
import ArticleViewer from "../components/Article/ArticleViewer";
import CategoryArticles from "../components/CategoryArticles";
import ContactUs from "../components/ContactUs";
import Home from "../components/Home";
import PageViewer from "../components/PageViewer";
import Unauthorized from "../components/Unauthorized";

const AppRouter = [
  {
    path: "/",
    // tslint:disable-next-line: object-literal-sort-keys
    component: Home,
    exact: true
  },
  {
    path: "/Home",
    // tslint:disable-next-line: object-literal-sort-keys
    component: Home,
    exact: true
  },
  {
    path: "/ContactUs",
    // tslint:disable-next-line: object-literal-sort-keys
    component: ContactUs
  },
  {
    path: "/AboutUs",
    // tslint:disable-next-line: object-literal-sort-keys
    component: AboutUs
  },
  {
    path: "/Login",
    // tslint:disable-next-line: object-literal-sort-keys
    component: Login
  },
  {
    path: "/Register",
    // tslint:disable-next-line: object-literal-sort-keys
    component: Register
  },
  {
    path: "/Categories/:Name",
    // tslint:disable-next-line: object-literal-sort-keys
    component: CategoryViewer
  },
  {
    path: "/Page/:Name",
    // tslint:disable-next-line: object-literal-sort-keys
    component: PageViewer
  },
  {
    path: "/Subject/:Name/:Category",
    // tslint:disable-next-line: object-literal-sort-keys
    component: PageViewer
  },
  {
    path: "/Course/:Name",
    // tslint:disable-next-line: object-literal-sort-keys
    component: CategoryArticles
  },
  {
    path: "/Article/:Course/:Name",
    // tslint:disable-next-line: object-literal-sort-keys
    component: ArticleViewer
  },
  {
    path: "/Unauthorized",
    // tslint:disable-next-line: object-literal-sort-keys
    component: Unauthorized
  },
  {
    component: Notifi,
    path: "/checkNotification"
  }
  // ,
  // {
  //     path: "/*",
  //     // tslint:disable-next-line: object-literal-sort-keys
  //     component: NotFound
  // }
];

export default AppRouter;

export const CreateCourseUrl = (name: string) => {
  return "/Course/" + name;
};

export const CreateArticleUrl = (course: string, name: string) => {
  return "/Article/" + course + "/" + name;
};
