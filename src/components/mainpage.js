import React from 'react';
import "./landpage.css";
import "./mainpage.css";
import { Link } from 'react-router-dom'
import Button from "@material-ui/core/Button";



function Home(props) {
  
  return (
    <div className="main-container">    
        <div className="main-info animate__animated animate__fadeInRight">
            <div className="main-info-center">
                <h3 className="info-title">Witaj drogi użytkowniku!</h3>
                <div className="info-content">
                    <p>Calcounter jest aplikacja stworzoną dla ludzi którzy chcą zrobić coś ze swoim życiem. Pozwala na łatwe obliczenie kalorii spożywanych w ciągu dnia. Z naszą pomocą zbudujesz sylwetkę swoich marzeń, schudniesz, lub nabierzesz masy mięśniowej, nie odbierając sobie przyjemności z jedzenia. W naszej aplikacji znajdują się również gotowe diety które są do Twojej dyspozycji. </p>
                </div>
                <Link className="button-link" to="/landpage">
                    <Button className="button" style={{fontSize: "20px"}} variant="contained" color="secondary">
                    Zaczynajmy!
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home;