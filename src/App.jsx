// import { useRef } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
// import emailjs from '@emailjs/browser';


function App() {
  
  const sendmail = () => {
    // let templateParams = {
    //   name: '',
    //   kenInvited: ''
    // };

    // emailjs.send(
    //   import.meta.env.VITE_PROJECT,
    //   import.meta.env.VITE_TEMPLATE,
    //   templateParams,
    //   import.meta.env.VITE_PKEY)
    // .then(function(response) {
    //    // SUCCESS
    // }, function(error) {
    //    // FAILED
    // });
  }


  return (
    // <div className="content">{import.meta.env.VITE_NAME}
    <div className="content">
      <span className="goldenTitle">Barbie Party
        <br />
        <FlipClockCountdown
          to={import.meta.env.VITE_DATE}
          labels={['Días', 'Horas', 'Minutos', 'Segundos']}
          labelStyle={{ fontSize: '.3em', fontWeight: 500, textTransform: 'uppercase', color: 'black' }}
          digitBlockStyle={{ width: '1em', height: '1.5em', fontSize: '.3em', color: 'white', background: `#${import.meta.env.VITE_PINK_COLOR}` }}
          dividerStyle={{ color: 'white', height: 1 }}
          separatorStyle={{ color: `#${import.meta.env.VITE_PINK_COLOR}`, size: '.1em' }}
          duration={0.5}
        />
        <button onClick={sendmail}> send </button>

      </span>
    
    </div>
  )
}

export default App;