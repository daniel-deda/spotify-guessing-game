import React from 'react'
import './MyInfo.scss'
import sg_logo from '../sg_logo.png'
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const MyInfo = () => {

  const CLIENT_ID = "f9e0f3520c4245ec8abfeb41a280b568"
  const spotify_guess = "Spotify Guess"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  let USER_ID = ""
  let button_select = 1

  const [token, setToken] = useState("")

  const [current, setCurrent] = useState(1)


  const logout = () => {

      setToken("")
      window.localStorage.removeItem("token")

  }

  const location = useLocation();

  useEffect( () => {

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
      fetchTopArtists("medium_term", 10);
    }

    function set2(){
      setCurrent(2);
    }

    function set3(){
      setCurrent(3);
    }


    
    const fetchTopArtists = async(time, amount) => {

      let topArtists = []
 
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
    
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            type: "artists",
            time_range: time,
            limit: amount
          }
    
        })

        console.log(data);
    
        topArtists = data;

        console.log(topArtists);
    
    }

    function fetchTopTracks() {

      return(
      
        <div>
          <a href={location.state.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <button className='go_to_spotify'>Go to Spotify</button>
          </a>  
          <p>Followers: {location.state.followers.total}</p>
          <p>Spotify ID: {location.state.id}</p>
  
          <p></p>
        </div>
      )
  }


    function profile() {

        return(
        
          <div>
            <p>Followers: {location.state.followers.total}</p>
            <p>Spotify ID: {location.state.id}</p>
            <a href={location.state.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              <button className='go_to_spotify'>Go to Spotify</button>
            </a>  
    
            <p></p>
          </div>
        )
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
        { !token ? <p></p> : <button className="myInfo">My Info</button>}
      </div>  

    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }} >
    <img className="profile_logo" src={`${location.state.images[1].url}`}/>
    </motion.div>

    <motion.div className="username_display">
        {location.state.display_name.split("").map((letter, index) => (
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
        <button className="top_artists_button" onClick={set1}>Top Artists</button>
        <button className="top_tracks_button" onClick={set2}>Top Tracks</button>
        <button className="profile_button" onClick={set3}>Profile</button>
      </div>
      
      {/*
      {current === 1 ? fetchTopArtists("medium_term", 10) : <br></br>} 
      {current === 2 ? fetchTopTracks() : <br></br>} 
      {current === 3 ? profile() : <br></br>} 
      */}


      </div>
  )
}

export default MyInfo