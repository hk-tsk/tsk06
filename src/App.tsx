import "bootstrap/scss/bootstrap.scss";
import * as React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.scss';

import { connect } from 'react-redux';
import LoginLogOut from './components/LoginLogOut';
import OfflineComponent from './components/OfflineComponent'
import {ICourseInfo } from './Entities/Interfaces';
import { getCourses } from './reducers/CoursesReducer';
import AppRouter from './routers/router'
import { IAppState } from './Store/store';

interface IAppProps {
  courses: ICourseInfo[]
}
class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
  }

  public CheckHomeIsActive = (match: any, location: { pathname: string; }) => {

    if (!location) { return false; }
    if (location.pathname === "/" || location.pathname === "/Home") { return true; }
    else {
      return false;
    }
  }

  public render() {
    document.title = "Learning Programming Site";
    const coursesNavs = this.props.courses.map((course, index) => {
      return <Nav.Item key={index}><NavLink to={'/Categories/' + course.Name} activeClassName="active-page" className="nav-link">{course.Title}</NavLink></Nav.Item>
    });

    return (
      <Router basename={process.env.PUBLIC_URL}>

        <div className="App">
          <header className="App-header">
            <div className="app-menubar ">
              <Navbar className="navbar navbar-inverse " expand="lg" bg="drak" variant="dark">
                <Navbar.Toggle aria-controls="myNavbar" />
                <Navbar.Collapse className="app-navbar-right" id="myNavbar">
                  <Nav className="">
                    <Nav.Item ><NavLink to="/Home" isActive={this.CheckHomeIsActive} activeClassName="active-page" className="nav-link ">صفحه اصلی</NavLink></Nav.Item>
                    <NavDropdown id="drp" title="دوره ها&nbsp;&nbsp;" >
                      {
                        coursesNavs
                      }
                    </NavDropdown>
                    <Nav.Item ><NavLink to="/AboutUs" activeClassName="active-page" className="nav-link">درباره ما</NavLink></Nav.Item>
                    <Nav.Item ><NavLink to="/ContactUs" activeClassName="active-page" className="nav-link">تماس با ما</NavLink></Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <div className="user-bar"> <LoginLogOut /></div>
            </div>
          </header>

          <div className="pages-container">
            {
              AppRouter.map((rt, index: number) => {

                // tslint:disable-next-line: jsx-no-lambda
                return <Route key={index} exact={rt.exact || false} path={rt.path} render={props => <rt.component {...props} />} />
              })
            }
          </div>
          <OfflineComponent />
          <div className="App-footer">

            <div className="copy-right">
              تمامی حقوق برای ...... محفوظ است.
            <br />
              version 3.0
            </div>
          </div>
        </div>
      </Router>

    );
  }
}

const mapStateToProps = (state: IAppState) => (
  {
    courses: getCourses(state.coursesState),
  }
)

export default connect(mapStateToProps)(App)
