import React from "react";


const App = () => {
  const [time, setTime] = React.useState(0);// on regle la valeur de départ du chronometre a 0
  const [timerOn, setTimerOn] = React.useState(false);// on défini l'état de départ  du chronometre a false

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); //on ajoute 0,1 centiene de seconde tous les 0,1 centiene de seconde
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <div className="Timers">
      <h2>Chronometre</h2>
      <div id="display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <button onClick={() => setTimerOn(true)}>Commencer</button>// si TimerOn n'est pas en court et qu'il est = a  0 on affiche le bouton commencer
        )}
        
        
        {timerOn && <button onClick={() => setTimerOn(false)}>Stop</button>/*si timerOn est en court on affiche le bouton stop qui passe setTimerOn a l'état false ce qui stop le chronometre */}
        {!timerOn && time > 0 && (
          <button onClick={() => setTime(0)}>Reset</button>// si TimerOn n'est pas en court et qu'il est supérieur a 0 on affiche le bouton reset qui remet a 0 TimerOn
        )}
        {!timerOn && time > 0 && (
          <button onClick={() => setTimerOn(true)}>Reprendre</button>/*si timerOn n'est pas en court on affiche le bouton reprendre qui passe setTimerOn a l'état true ce qui relance le chronometre*/
        )}
      </div>
    </div>
  );
};

export default App;