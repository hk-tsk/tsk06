import * as React from 'react'
import Brands from './Brands';
import Courses from './Courses';

export default class Home extends React.Component {

    public render() {

        return (
            <div className="home-container">
                <Courses />
                <hr/>
                <Brands />
            </div>


        )
    }
}