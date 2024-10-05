import React from 'react'
import './About.scss'
import sg_logo from '../sg_logo.png'
import { useState } from 'react'
import {motion} from "framer-motion";
import {useEffect} from "react";
import { NavLink, useNavigate } from 'react-router-dom';


const About = () => {


    const CLIENT_ID = "f9e0f3520c4245ec8abfeb41a280b568"
    const spotify_guess = "Spotify Guess"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const part1 = "Spotify Guess is a game that combines artists and trivia to see how well you know your favorite artists. This is done by pulling information (specifically artists) from your public playlists and asking you questions like their age or nationality."
    const part2 = "NOTE: Some questions might have an incorrect answer at the moment as information about certain artists (particularly those who are not well-known) is not widely available on the internet yet. However, there should be little to no issues for well established artists."
    

    const [token, setToken] = useState("")

    


    const logout = () => {
  
        setToken("")
        window.localStorage.removeItem("token")
  
    }


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
    

    const navigate = useNavigate();


    const routeChange = () =>{
      let path = `/my-info`
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
              { !token ? <p></p> : <button className="myInfo" onClick={routeChange}>My Info</button>}
            </div>  
    
          </div>
    
          <img className="logo" src={sg_logo}/>
    
    
          <motion.div className="spotify_guess">
              {spotify_guess.split("").map((letter, index) => (
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


            <motion.div className="about_part1">
            {part1.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05, delay: index * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>


            <motion.div className="about_part2">
            {part2.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05, delay: index * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
    
            <NavLink
                activeclassname="active"
                className="home-link"
                to="/"
                >
                    <button className="about">Home</button>
                </NavLink>   
    
            

        </div>
      );
}    

export default About