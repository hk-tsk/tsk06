// import NotFound from 'src/components/NotFound';
import CategoryViewer from 'src/components/CategoryViewer';
import Login from 'src/components/User/Login';
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'
import Home from '../components/Home'
import PageViewer from '../components/PageViewer'

const AppRouter = [
    {
        path: "/",
        // tslint:disable-next-line: object-literal-sort-keys
        component: Home,
        exact: true,
        Title: "Learning Programming Site"
    },
    {
        path: "/Home",
        // tslint:disable-next-line: object-literal-sort-keys
        component: Home,
        exact: true,
        Title: "Learning Programming Site"
    },
    {
        path: "/ContactUs",
        // tslint:disable-next-line: object-literal-sort-keys
        component: ContactUs,
    },
    {
        path: "/AboutUs",
        // tslint:disable-next-line: object-literal-sort-keys
        component: AboutUs,
        Title: "About Learning Site"

    }
    ,
    {
        path: "/Login",
        // tslint:disable-next-line: object-literal-sort-keys
        component: Login,
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
    }
    ,
    {
        path: "/Subject/:Name/:Category",
        // tslint:disable-next-line: object-literal-sort-keys
        component: PageViewer
    }
    // ,
    // {
    //     path: "/*",
    //     // tslint:disable-next-line: object-literal-sort-keys
    //     component: NotFound
    // }
]

export default AppRouter;
