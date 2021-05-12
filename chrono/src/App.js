import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {

  //format du chronometre en secondes, minutes et heures 
  const FormatChrono = () => {
    const Secondes = `0${(chrono % 60)}`.slice(-2)
    const minutes = `${Math.floor(chrono / 60)}`
    const Minutes = `0${minutes % 60}`.slice(-2)
    const Heures = `0${Math.floor(chrono / 3600)}`.slice(-2)

    return `${Heures} : ${Minutes} : ${Secondes}`//00 : 00 : 00 

  }

  const [chrono, setChrono] = useState(0)
  const [EnCours, setEnCours] = useState(false) // on défini l'état de Encours a false
  const [EnPause, setEnPause] = useState(false) // on défini l'état de EnPause a false
  const compteur = useRef() // useRef() va permettre de modifier la valeur du chrono

  
  const Commencer = () => {
    setEnCours(true)// SetEnCours passe a true donc le bouton Recommencer n'est plus disable
    setEnPause(true)//SetEnPause passe a true donc le bouton Pause remplace le bouton Commencer
    compteur.current = setInterval(() => {//Toutes les 1000ms(1s) on augmente le chrono de 1
      setChrono((chrono) => chrono + 1)
    }, 1000)
  }

  const Pause = () => {
    clearInterval(compteur.current)//Si le on clique sur le bouton pause on stop compteur.current grace a clearInterval
    setEnPause(false)//SetEnPause passe a false donc le Reprendre  remplace le bouton Pause
  }

  const Reprendre = () => {
    setEnPause(true)//SetEnPause passe a true donc le bouton Pause remplace le bouton Commencer
    compteur.current = setInterval(() => {//Toutes les 1000ms(1s) on augmente le chrono de 1
      setChrono((chrono) => chrono + 1)
    }, 1000)
  }

  const Recommencer = () => {
    clearInterval(compteur.current)//Si le on clique sur le bouton pause on stop compteur.current grace a clearInterval
    setEnCours(false)// SetEnCours passe a fakse donc le bouton Recommencer est disable
    setEnPause(false)//SetEnPause passe a false et setEnCours passe a false donc vu que les 2 sont a false ont affiche le bouton Commencer
    setChrono(0)// on remet le chrono a 00 : 00 : 00
  }



  return (
    <div className="app">
      <h1>Chronometre </h1>
      <div className='chrono'>
        <h3>{FormatChrono() /* on affiche formatChrono() dans une balise <h3> */ }</h3> 
        <div className='boutons'>
          {
            !EnCours && !EnPause ? //si EnCours et EnPause sont a false on affiche le bouton commencer et le bouton recommencer qui sera en permanence affiché
              <button onClick={Commencer}>Commencer</button>
              : (
                EnPause ? <button onClick={Pause}>Pause</button> : //si on clique sur le bouton pause on remplace le bouton pause par le bouton reprendre
                  <button onClick={Reprendre}>Reprendre</button> // si on clique sur le bouton reprendre on remplace le bouton reprendre par le bouton pause
              )
          }
          <button onClick={Recommencer} disabled={!EnCours}>Recommencer</button> 
        </div>
      </div>
    </div>
  );
}

export default App;
