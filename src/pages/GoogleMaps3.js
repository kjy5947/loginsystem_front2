import React from 'react';
import Axios from 'axios';
import './Comp.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';

export class GoogleMaps3 extends React.Component {
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
            image: null,
            info: null,
        }
    }

    componentDidMount() {
        var list = [];
        Axios.get("http://18.234.107.127:8080/data")
            .then(res => {
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
    }

    //In Map
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })


        this.showinformation();
        this.setState({
            image:null,
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
            justOn: !this.state.justOn
        })
    }
    clickAll = () => {
        this.setState({
            justBusking: true,
            justMarket: true,
        })
    }
    clickJustMarket = () => {
        this.setState({
            justMarket: true,
            justBusking: false,
        })
    }
    clickJustBusking = () => {
        this.setState({
            justBusking: true,
            justMarket: false,
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


    render() {
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
                    initialCenter={{ lat: 37.551, lng: 126.924 }}
                    zoom={15}
                    streetViewControl={false}
                    mapTypeControl={false}

                    onClick={this.onMapClick}

                // Marker 
                >

                    {this.state.list.map((l) => {
                        // on/off
                        var url
                        var clickVision = true // justOpen
                        var jMarket = true // justMarket
                        var jBusking = true // justBusking

                        // justOpen
                        if (l.onoff) {
                            url = './icon2.png'
                        }
                        else {
                            url = './icon.png'
                            if (this.state.justOn)
                                clickVision = false
                        }

                        // justType (0-Market, 1-Busking)
                        if (!this.state.justMarket) {
                            if (l.type === 0)
                                jMarket = false
                        }

                        if (!this.state.justBusking) {
                            if (l.type === 1)
                                jBusking = false
                        }

                        var vision = clickVision && jMarket && jBusking

                        // size
                        var size = 20 + l.like / 6;
                        // return
                        return (
                            <Marker
                                position={{ lat: l.lat, lng: l.lng }}
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
                        </div>
                    </InfoWindow>
                </Map>
                <div className="maps" />
                <br />
                <button className="mapbtn" onClick={this.clickJustOpen}> 오픈한 곳만 보기 </button>
                <button className="mapbtn" onClick={this.clickJustMarket}> 소상공인 보기 </button>
                <button className="mapbtn" onClick={this.clickJustBusking}> 버스킹 보기 </button>
                <button className="mapbtn" onClick={this.clickAll}> 전체 보기 </button>
                <br />
                <br />
                <Link to="/"> 홈으로 </Link>
                <img src={this.state.image}/>
                <p>
                    {this.state.info}
                </p>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBeN8qlwaJ6ex9K23whBYw_I5qHg0k1eqI')
})(GoogleMaps3)