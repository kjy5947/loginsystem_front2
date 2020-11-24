import React,{Component} from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { Nav } from './components/'
//import Router from './Router'
import { Provider } from 'react-redux'
import TestContainer from './components/TestContainer'
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import { GoogleMaps,GoogleMaps2 } from './pages/';
import { Home, Login, Register, Test,TestPage } from './components/';
import StoreAdd from './components/Add';
import axios from 'axios';
// <Provider store={store}></Provider>


export default class App extends Component{

  //state={};
  constructor(props) {
    super(props);

    this.state = {
        list: [],
        justOn: false,
        justMarket: true,
        justBusking: true,
        justAll: true,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        click: false,
        currentPosition: {
        lat: null,
        lng: null
        },
        
    
    }
}
  componentDidMount=()=> {
        

    axios.get('/test').then(
        res => {
            console.log('hi');
            console.log(res.status);
            this.setUser(res.data);
        },
        err => {
          //console.log("App error");
            console.log(err);
        }
    )

};//componentDidMount

setUser=users=>{

  this.setState({
    user: users
  });

};

    render(){
      return (
        <div className="App">
    
          <Nav user={this.state.user} setUser={this.setUser}/>
          
          <div>
            <Switch>
              <Route exact path="/" component={()=><Home user={this.state.user} />}/>
      <Route exact path="/login" component={ ()=> <Login setUser={this.setUser} /> } />
                <Route exact path="/testpage" component={TestPage} />
                <Route exact path="/test" component={Test}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/gmap" component={GoogleMaps} />
                <Route exact path="/gmap2" component={GoogleMaps2} />
                <Route exact path="/add" component={StoreAdd} />

            </Switch>
          </div>
        </div>
      ) 
    }
 }//class App

  

//export default App;
