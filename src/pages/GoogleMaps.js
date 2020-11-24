import * as React from "react";
import Axios from 'axios';
import './Comp.css';
import { map, google, Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import useCurrentLocation from './useCurrentLocation';
import { GeolocatedProps, geolocated } from "react-geolocated";
import PropTypes from "prop-types";


export class GoogleMaps extends React.Component {

    
    constructor(props) {
        super(props);

        // this.state = {
        //     list: [],
        //     justOn: false,
        //     justMarket: true,
        //     justBusking: false,
        //     justAll: true,
        //     showingInfoWindow: false,
        //     activeMarker: {},
        //     selectedPlace: {},
        //     click: false,
        //     currentPosition: {
        //     lat: null,
        //     lng: null
        //     },
            
        
        // }
        this.state = {
            list: [],
            showingInfoWindow: false,
            justMarket: true,
            justBusking: false,
            activeMarker: {},
            selectedPlace: {},
            click: false,
            currentPosition: {
            lat: null,
            lng: null
            },
            mapStyle : [
                {
                    featureType: 'landscappe.man_made',
                    elementType: 'geometry.fill',
                    stylers:[
                        {
                            color: '#dceafa'
                        }
                    ]
                },
            ]
            
        
        }
    }
    //In Map

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }

    }



    //In Interface
    clickJustOpen = () => {
       
            this.setState({
                justMarket: true,
                justBusking: true,
                justOn: true,
                showingInfoWindow: false,
            })
        console.log(this.state.justMarket);
        console.log(this.state.justBusking);
        console.log(this.state.justOn);
         
        
        }
        
        

    clickJustMarket = () => {
        this.setState({
            justOn: false,
            justMarket: true,
            justBusking: false,
            showingInfoWindow: false,
        })
        console.log(this.state.justOn);
        console.log(this.state.justMarket);
        console.log(this.state.justBusking);

    }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                currentPosition :{
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });

            var request = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            var a = JSON.stringify(request)
            var list = [];
            var headers = {
                'Content-Type':'application/json'
            }
            console.log(a);
            
            Axios.post("http://18.234.107.127:8080/curdata", a , { headers } )
                .then(res => {
                console.log(res);
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                   
                    list.push({
                        id: res.data[i].id,
                        name: res.data[i].name,
                        owner: res.data[i].owner,
                        lat: res.data[i].lat,
                        lng: res.data[i].lng,
                        onoff: res.data[i].onoff,
                        like: res.data[i].like,
                        type: res.data[i].type
                    })
                
              
                }
                this.setState({
                    list: this.state.list.concat(list)
                })
            
            })    
            console.log(list);    

        },
        err => {
            console.log("hh");
            window.alert(err.massage);
        });
    }


    _mapLoaded(mapProps, map){
        map.setOptions({
            styles: this.state.mapStyle
        })
    }
            
    render(){
      
      
        
   

  
      const { currentPositon } = this.state;

            return(
              
            <div>
                <Map google={this.props.google}
            
                    // 맵 옵션
                    style={{
                        width: '100%',
                        height: '500px'
                    }}
                    containerStyle={{
                        width: '100%',
                        height: '500px'
                    }}
                    
                   
                    center=
                       {this.state.currentPosition}
            
                    zoom={20}

                    onClick={this.onMapClick}
                    onReady={(mapProps,map) => this._mapLoaded(mapProps, map)}

                // Marker 
                >
                    {this.state.list.map((l) => {
                        // on/off
                        var url
                        var clickVision = true // justOpen
                        var jMarket = true // justMarket
                        var jBusking = true // justBusking

                        // justOpen
                        if (l.type) {

                            url = './icon.png'
                        }
                        else {
                            url = './icon2.png'
                        }


                        //on 상태를 0, off상태를 1로하면 해결
                        if (this.state.justOn&&l.onoff)
                               { clickVision = false;
                                jMarket = true;
                                jBusking = true;
                               }

                        // justType (0-Market, 1-Busking)
                        if (!this.state.justOn&&!this.state.justMarket&&this.state.justBusking) {
                            if (l.type === 0)
                                jMarket = false;
                               
                        }

                        if (!this.state.justOn&&!this.state.justBusking&&this.state.justMarket) {
                            if (l.type === 1)
                                jBusking = false;
                                
                        }

                        var vision = clickVision && jMarket && jBusking

                        // size
                        var size = 20 + l.like / 6;
                        // return
                        return (
                            <Marker
                                position={{ lat: l.lat, 
                                    lng: l.lng }}
                                name={l.name}
                                data={l.owner}
                                // animation={4}
                                icon={{
                                    url: url,
                                    scaledSize: new window.google.maps.Size(size, size)
                                }}
                                visible={vision}

                                onClick={this.onMarkerClick}
                            >
                            </Marker>
                            
                        )
                    })}
                    
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <p> 상호명 </p>
                            <h1> {this.state.selectedPlace.name} </h1>
                            <p> 소유자: {this.state.selectedPlace.data} </p>
                            <button type="button" class="windowpage" onClick={this.showinformation}>보기</button>
                        </div>
                    </InfoWindow>
                    
                    </Map>
                    <div className="maps" />
                    <br />
                    <button className="mapbtn" onClick={this.clickJustOpen}> 오픈한 가게만 보기 </button>
                    <button className="mapbtn" onClick={this.clickJustMarket}> 소상공인 보기 </button>
                    
                    <br />
                    <br />
                    <Link to="/"> 홈으로 </Link>


            </div>

            )
            

        
    }
}

export default GoogleApiWrapper((props) => ({
    apiKey: ('AIzaSyBeN8qlwaJ6ex9K23whBYw_I5qHg0k1eqI'),
    language: 'ko'

})
)(GoogleMaps);