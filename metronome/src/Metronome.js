import React, { Component } from "react";
import "./Metronome.css";

import click1 from "./click1.wav";
import click2 from "./click2.wav";

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    this.click1 = new Audio(click1);//ajout du fichier audio1
    this.click2 = new Audio(click2);//ajout du fichier audio2
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      //On arrete le timer et on en démarre un nouveau
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // définition du nouveau bpm et remet le compteur a 0
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Mise a jour de "bpm"
      this.setState({ bpm });
    }
  };

  startStop = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // On affiche le nombre de bpm
      this.timer = setInterval(this.playClick(60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true
          // On joue un "click" juste après
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // Le 1er beat aura un son différents des autres
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // on garde une trace de quel beat on se trouve
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm } = this.state;
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="60"//valeur min de bpm
            max="240"// valeur max de bpm
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>{playing ? "Stop" : "Start"/*Si le metronome est en marche on affiche le bouton stop || si le metronome est a l'arret on affiche le bouton start*/}</button>
      </div>
    );
  }
}

export default Metronome;