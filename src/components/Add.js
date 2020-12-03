import React, { Component } from 'react'
import Axios, { post } from 'axios';
import './Add.css'
import Geocode from "react-geocode";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import ImageUploader from 'react-images-upload';
import Select from 'react-select';
import styled from 'styled-components'

Geocode.setApiKey('AIzaSyADqbxpNSjkexoSicNUJisluXPzuhSmCDs');


const Wrap = styled.div` 
padding: 20px; 
input { width: 50%; height: 20px; 
border: 1px solid #ccc; } 
textarea { positon: absolute;
  width: 70%; height: 100px; border: 1px solid #ccc; } `;



export class StoreAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  
          address: '',
          name: '',
          owner: '',
          lat: null,
          lng: null,
          onoff: 0,
          image: '',     
          type: null,  
          info: null,
      }
    }

    handleChange = address =>  {
        this.setState({ address });
    };

//react-places-autocomplete에서 api를 참조하는데, 그것이 index.html에 적혀있습니다.
    handleSelect = address => {
     geocodeByAddress(address)
      .then(result => getLatLng(result[0])) 
      .then(latLng => {
        console.log('Success',latLng);
        this.setState({
          lat: latLng.lat,
          lng: latLng.lng,
          address: address,
        })
    })
      .then(error => console.error('Error', error));
    };


    handleInputChange = (event) => {
      event.preventDefault();
      //console.log(event);
      //console.log(event.target.name);
      //console.log(event.target.value);
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    selectbutton = (e) =>{
      this.setState({
        type: e.value,
      })
    }


    handleSubmit = (e) => {
      e.preventDefault();
      let data = {
        address:this.state.address
        ,name:this.state.name
        ,owner: this.state.owner
        ,image:this.state.image
        ,lat:this.state.lat
        ,lng:this.state.lng
        ,onoff:this.state.onoff
        ,type:this.state.type
        ,info:this.state.info

      };
      Axios.post("http://18.234.107.127:8080/addinfo",data
      ,
      {headers: {
        "Content-Type" : "application/json"
        }}
                )
            .then(res=>{
            console.log(res);
            })
            .catch(err=>{
           console.log(err.response);
           console.log(data);
            });
             this.setState({
             address: '',
              name: '',
              owner: '',
              lat: null,
              lng: null,
              image: '',
        })
    }
    
    getemail = () => {
        const a = localStorage.getItem('token');
        var headers = {'X-AUTH-TOKEN':a}
        var data = { 'token': localStorage.getItem('token')}
        Axios
          .post('http://18.234.107.127:8080/api/authapi', data, { headers })
          .then(
            res => {
              this.setState(
                {owner: res.data}
              )
            }
          )



    }
   
  

    render() {
      this.getemail();
    const options = [
      {label:'Street Store', value:0},
      {label:'Busking', value:1}
    ]


     const uploadImage= async (e) => {
       console.log(e.target.files);
       const file=e.target.files[0];
       const base64 = await convertBase64(file)
       console.log(base64);
       this.setState({
         image: base64,
       })
     }

     const convertBase64=(file)=>{
       return new Promise((resolve, reject)=>{
        
          const fileReader=new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {

            resolve(fileReader.result);
          };

          fileReader.onerror = (error)=>{

            reject(error);
          };

       }); 
      }
     const {name,owner} = this.state;
     
     
        return(
          <Wrap>
            <div className="backgroundimage">

              <form onSubmit={this.handleSubmit}>
                
               <ul>

             <li> <input className='location-search-input' type='text' 
              placeholder='이름' name='name' value={name}
              onChange={this.handleInputChange}
        
              /></li>
              <li> <input className='location-search-input' type='text' 
              placeholder={owner} name='owner' value={owner} readonly='readonly'
             /></li>
  <li>
                <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >

        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div className="input-suggestion"
                    {...getSuggestionItemProps(suggestion, {
                      
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </li>
      <li>
          <input className='image-input' type="file" 
           onChange={(e) => 
          uploadImage(e)}
          />
      </li>
      <img className='image' src={this.state.image} height='200px'/>
      <li
      className= 'select'>
      <Select 
      options={options}
      onChange={this.selectbutton}/>
      </li>
      <li>
    
        <textarea type="text" 
        name="info" 
        onChange={this.handleInputChange} 
        value={this.state.info} /> 
        </li>

      <button className='submit'>등록하기</button>
      </ul>
      </form>
      </div>
      </Wrap>
    
          
        )
    }

}

export default StoreAdd;