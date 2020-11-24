import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { GoogleMaps,GoogleMaps2 } from './pages/';
import { Home, Login, Register, Test,TestPage } from './components/'
import StoreAdd from './components/Add';

class Router extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/testpage" component={TestPage} />
                <Route path="/test" component={Test}/>
                <Route path="/register" component={Register} />
                <Route path="/gmap" component={GoogleMaps} />
                <Route path="/gmap2" component={GoogleMaps2} />
                <Route path="/add" component={StoreAdd} />

            </div>
        );
    }
}

export default Router;