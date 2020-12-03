import * as React from "react";
import Axios from 'axios';
import './Comp.css';
import { map, google, Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import useCurrentLocation from './useCurrentLocation';
import { GeolocatedProps, geolocated } from "react-geolocated";
import PropTypes from "prop-types";


export class Home extends React.Component {

    
    constructor(props) {
        super(props);

        this.state = {
            list: [],
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
    //In Map

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
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

    geolocationOptions = {
        enableHighAccuracy: false,
        timeout: 1000*60*1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1, // 24 hour
      };





    current = () => {
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
        },this.geolocationOptions);

        console.log('home')
    }


            
    render(){
    
            this.current();

            return(
              
            <div>
                {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.setState({
                        currentPosition :{
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
               
            }
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
            
                    zoom={15}

                    onClick={this.onMapClick}
             

                // Marker 
                >
                    {this.state.list.map((l) => {
                     
                        var url
                     if(l.type){
                         url='./icon.png'
                     }
                     else{
                         url='./icon2.png'
                     }

             
                        

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
                   
   

            </div>

            )
            

        
    }
}

export default GoogleApiWrapper((props) => ({
    apiKey: ('AIzaSyADqbxpNSjkexoSicNUJisluXPzuhSmCDs'),
    language: 'ko'

})
)(Home);