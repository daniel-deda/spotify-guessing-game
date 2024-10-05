import React from 'react'
import './MyInfo.scss'
import sg_logo from '../sg_logo.png'
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyInfo = () => {

  const CLIENT_ID = "f9e0f3520c4245ec8abfeb41a280b568"
  const spotify_guess = "Spotify Guess"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  let USER_ID = ""
  let button_select = 1
  let topArtists = []
  const final = [];

  const navigate = useNavigate();

  const [token, setToken] = useState("")

  const [current, setCurrent] = useState(1)

  const logout = () => {

      setToken("")
      window.localStorage.removeItem("token")

  }

  const location = useLocation();

  useEffect( () => {

    console.log("FROM USE EFFECT")
    console.log(location.state)

      const hash = window.location.hash
  
      let token = window.localStorage.getItem("token")
  
      if(!token && hash){
  
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
        window.location.hash = ""
        window.localStorage.setItem("token", token)
      }
  
      setToken(token)
  
    }, [])

    function set1(){
      setCurrent(1);
    }

    function set2(){
      setCurrent(2);
    }

    function set3(){
      setCurrent(3);
    }

    const usingArrayMap = () => {

      console.log(location.state)

      var artists = []
      artists = JSON.parse(localStorage.getItem('topArtists1'));

      console.log(artists);

      for(let i = 0; i < 25; i++){
        final.push(
          <div className="rows">
            <p>{i + 1}</p>
            <img src={artists[i].images[0].url}/>
            <h3>{artists[i].name}</h3>
          </div>)
      }

    }

    function displayArtists() {

      usingArrayMap();

      return <div className='artists'>{final}</div>

    }

    const usingArrayMapTracks = () => {

      var tracks = []
      tracks = JSON.parse(localStorage.getItem('topTracks1'));

      console.log("HERE AT TRACKS")
      console.log(tracks);

      for(let i = 0; i < 25; i++){
        final.push(
          <div className="rows">
            <p>{i + 1}</p>
            <img src={tracks[i].album.images[0].url}/>
            <div className='name-track'>
              <h3>{tracks[i].artists[0].name}</h3>
              <p>{tracks[i].name}</p>
            </div>
          </div>)
      }

    }

    function displayTracks() {

      usingArrayMapTracks();

      return <div className='tracks'>{final}</div>

    }

    function profile() {

        return(
        
          <div>
            <div className='profile_row1'>
              <h3>Spotify ID</h3>
              <p>{location.state.dataState[0].id}</p>
            </div>
            <div className='profile_row2'>
              <h3>Followers</h3>
              <p>{location.state.dataState[0].followers.total}</p>
            </div>
           
            <a href={location.state.dataState[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <button className='go_to_spotify'>Go to Spotify</button>
            </a>  
    
            <p></p>
          </div>
        )
    }


    const routeChange = () =>{
      let path = `/`
      navigate(path)
    }
    



  return (
    
  <div className="App">

      <div className="banner">

        <div>
          { token ? <button className="login-logout" onClick = {logout}>Logout</button> : 
          <button className="login-logout"><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a></button>}
        </div>

        {/* My info button on left*/}
        <div >
          <button className="home_button" onClick={routeChange}>Home</button>
        </div>  

      </div>

        {console.log("HERE RN WOW")}
        {console.log(location)}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }} >
        <img className="profile_logo" src={`${location.state.dataState[0].images[1].url}`}/>
        </motion.div>

        <motion.div className="username_display">
            {location.state.dataState[0].display_name.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>


          <div className="buttons">
            <button className = {current === 1 ? "clicked_button" : "top_artists_button"} onClick={set1}>Top Artists</button>
            <button className = {current === 2 ? "clicked_button" :"top_tracks_button"} onClick={set2}>Top Tracks</button>
            <button className = {current === 3 ? "clicked_button" :"profile_button"} onClick={set3}>Profile</button>
          </div>

      

        <div className='profile_section'>

          <div className="tuning_buttons">
        
          </div>


          {current === 1 ? displayArtists() : <br></br>} 
          {current === 2 ? displayTracks() : <br></br>} 
          {current === 3 ? profile() : <br></br>}
        
        </div>

        </div>



  )
}

export default MyInfo