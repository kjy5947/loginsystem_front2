import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { map, google, Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

//export default class Home extends Component {
export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            justOn: false,
            justMarket: true,
            justBusking: true,
            justAll: true,
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
            click: false,
            currentPosition: {
            lat: null,
            lng: null
            },
            
        
        }
    }

    // const config={
    //     headers:{
    //         //Authorization:'Bearer ' + localStorage.getItem('token')
    //         'X-AUTH-TOKEN': localStorage.getItem('token')
    //     }
    
    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                currentPosition :{
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }//currentPostion
            });//setState

            var request = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }//request

            var a = JSON.stringify(request)
            var list = [];

            var headers = {
                'Content-Type':'application/json'
            }//headers
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
                })//setState
            
            }) //then   
            console.log(list);    

        },//navigator.geolocation.getCurrentPosition
        err => {
            //window.alert(err.massage);
            //console.log("hh");
        });
    }
    

    render() {
        console.log(this.state);
        const { currentPositon } = this.state;
                if(this.props.user){
                    return (
                        <div>
                            <br/>
                            <br/><br/>
                            <h5> 365어플에 오신걸 환영합니다. </h5>
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
                        
                                zoom={15}

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
                                        
                                    )//작은 returb
                                })}
                                
                                {/* <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                >
                                    <div>
                                        <p> 상호명 </p>
                                        <h1> {this.state.selectedPlace.name} </h1>
                                        <p> 소유자: {this.state.selectedPlace.data} </p>
                                        <button type="button" class="windowpage" onClick={this.showinformation}>보기</button>
                                    </div>
                                </InfoWindow> */}
                            </Map>
                            <div className="maps" />
                            <br />
                            
                            <h5> 현재위치에서 근처에 있는 소상공인,버스킹 장소를 한눈에 확인해보세요~ </h5>


                             </div>

                        </div>
                        
                    )
                }//if
                
            return (
                <h2>아직 로그인하지않았습니다.</h2>
            )
        
    }//render
}
export default GoogleApiWrapper((props) => ({
    apiKey: ('AIzaSyBeN8qlwaJ6ex9K23whBYw_I5qHg0k1eqI'),
    language: 'ko'

})
)(Home);