import * as React from "react";
import Axios from 'axios';
import './Comp.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class GoogleMaps extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            data: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            click: false,
            justOn: false,
            currentPosition: {},
            currentDid: false,
            image: null,
            info: null,
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
        this.showinformation();
        this.setState({
            image: null,
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
    clickJustOpen = () => {
        this.setState({
            justOn: !this.state.justOn,
            showingInfoWindow: false,
        })
    }

    current() {
        var request = {
            lat: this.state.currentPosition.lat,
            lng: this.state.currentPosition.lng
        }

        var a = JSON.stringify(request)
        var list = [];
        var headers = {
            'Content-Type': 'application/json'
        }

        Axios.post("http://18.234.107.127:8080/curdata", a , { headers })
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].type == 1) {
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
                }

                this.setState({
                    list: this.state.list.concat(list)
                })
            })
    }
    
    showinformation=()=>{

        const email = this.state.selectedPlace.data;
        console.log(email);
        let b = {
            "owner": email
        }

        var data = [];
        var headers = {
            'Content-Type': 'application/json'
        }

        Axios.post("http://18.234.107.127:8080/image", b, { headers })
            .then(response => {
                
                console.log(response);
                this.setState({
                    image: response.data.image,
                    info: response.data.info,
                })
           

            })
        
    }
    /*getdata() {
        const email = window.localStorage.getItem("E-mail");
        let b = {
            "owner": email
        }

        var data = [];
        var headers = {
            'Content-Type': 'application/json'
        }

        Axios.post("http://18.234.107.127:8080/image", b, { headers })
            .then(response => {
                console.log(response);
                console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    data.push({
                        address: response.data[i].address,
                        id: response.data[i].id,
                        image: response.data[i].image,
                        info: response.data[i].info,
                        owner: response.data[i].owner,
                    })
                }
                this.setState({
                    data: this.state.data.concat(data)
                })
            })
    }
*/
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                currentPosition: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
            this.current()
            this.setState({
                currentDid: true
            })
        })
    }

    render() {
        if (this.state.currentDid == false) {
            return (
                <div>
                    <br />
                    <br />
                    <br />
                    <h1> 현재 위치를 가져오고 있습니다.</h1>
                </div>
            )
        }
        else {
            return (
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
                        initialCenter={this.state.currentPosition}
                        zoom={15}
                        onClick={this.onMapClick}
                    >
                        {this.state.list.map((l) => {
                            var clickVision = true
                            //on 상태를 0, off상태를 1로하면 해결
                            if (this.state.justOn && l.onoff)
                                clickVision = false;

                            var size = 20 + l.like / 6;
                            return (
                                <Marker
                                    position={{
                                        lat: l.lat,
                                        lng: l.lng
                                    }}
                                    name={l.name}
                                    data={l.owner}
                                    icon={{
                                        url: './icon2.png',
                                        scaledSize: new window.google.maps.Size(size, size)
                                    }}
                                    visible={clickVision}
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
                              
                            </div>
                        </InfoWindow>

                    </Map>
                    <div className="maps" />
                    <br />
                    <button className="mapbtn" onClick={this.clickJustOpen}> 오픈한 가게만 보기 </button>
                    <img src={this.state.image}/>
                    <p>
                        {this.state.info}
                    </p>
                </div>
            )
        }
    }
}

export default GoogleApiWrapper((props) => ({
    apiKey: ('AIzaSyBeN8qlwaJ6ex9K23whBYw_I5qHg0k1eqI'),
    language: 'ko'

})
)(GoogleMaps);