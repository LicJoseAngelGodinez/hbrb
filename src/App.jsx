import { useState, useEffect, useRef } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { useWindowDimensions } from './utils/utils';
import brbSiluette from './assets/siluette.svg';
import emailjs from '@emailjs/browser';


function App() {

  const winSize = useWindowDimensions();
  const [registerFlag, setRegisterFlag] = useState({});
  const [isSmallDevice, setIsSmallDevice] = useState(winSize.width <=320);
  const [registerButtonClass, setRegisterButtonClass] = useState('');
  const [formContainerClass, setFormContainerClass] = useState('formContainer');
  const [alertClass, setAlertClass] = useState('alert');
  const [loaderClass, setLoaderClass] = useState('loader');
  const [confirmationCardClass, setConfirmationCardClass] = useState('confirmationCard');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestMail, setGuestMail] = useState('');
  const [registerText, setRegisterText] = useState('Registro Exitoso');
  const [guestPlusOne, setGuestPlusOne] = useState(false);
  const [showConfetti, setShowConfetti] = useState('confetti');
  const confirmationCard = useRef(null);
  const registerButton = useRef(null);
  const nameInput = useRef(null);
  const mailInput = useRef(null);
  const plusOneInput = useRef(null);

  useEffect(() => {
    const registerFlagStorage = JSON.parse(localStorage.getItem('registerFlag'));
    if ( registerFlagStorage ) {
      setRegisterFlag(registerFlagStorage);
      console.log(registerFlag);

      const { name, mail, plusOne } = registerFlag;

      setRegisterText('Datos Registrados');
      setGuestName(name);
      setGuestMail(mail);
      setGuestPlusOne(plusOne);
      registerButton.current.style.display = 'none';
      setShowConfetti('confetti show');
      setConfirmationCardClass('confirmationCard show');

    } else {
      setShowConfetti('confetti');
    }
  }, []);

  useEffect(() => {
    const { width } = winSize;

    setIsSmallDevice(width <=320)

  }, [winSize]);

  useEffect(() => {
    console.log({buttonClicked});
    if ( buttonClicked ) {
      setRegisterButtonClass('hide');
      setFormContainerClass('formContainer open');
      
      setTimeout(() => {
        nameInput.current.focus();
      }, 400);
    } else {
      setFormContainerClass('formContainer');
      setRegisterButtonClass('');
      setAlertClass('alert');
    }
  }, [buttonClicked]);

  useEffect(() => {
    setAlertClass('alert');
  }, [guestName]);

  const register = () => {
    if ( nameInput.current.value === '' ) {
      setAlertClass('alert show');
    } else {
      registerButton.current.style.display = 'none';
      setLoaderClass('loader show');
      setButtonClicked(!buttonClicked);

      emailjs.send(
        import.meta.env.VITE_PROJECT,
        import.meta.env.VITE_TEMPLATE,
        {
          name: guestName,
          guestMail,
          kenInvited: guestPlusOne ? 'Si' : 'No'
        },
        import.meta.env.VITE_PKEY)
      .then(function() {
         // SUCCESS
          localStorage.setItem('registerFlag', JSON.stringify({
            name: guestName,
            mail: guestMail,
            plusOne: guestPlusOne ? '01' : '0',
          }));
          setLoaderClass('loader');
          setShowConfetti('confetti show');
          setConfirmationCardClass('confirmationCard show');
      }, function(error) {
         // FAILED
          setLoaderClass('loader');
          setConfirmationCardClass('confirmationCard show');
          confirmationCard.current.innerText = `Algo ha ido mal, toma captura de pantalla y envía a la cumpleañera lo siguiente: ---- status ${error.status} - ${error.text}`;
      });
    }
  }


  return (
    <div className="content">

      <div className={showConfetti}>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
      </div>

      <div className="banner">

        <div className='titleContainer'>
          <p className='salute'>Hi {import.meta.env.VITE_BRB}</p>
          <img className='brbImg' src={brbSiluette} alt="opps no image" />
          <p className='mainMessage'>Let&apos;s party</p>
          <p className='mainMessage'>in <span className='pink'>Pink</span></p>
        </div>

        <div className='dateTitle'>
          <div className='dateLeft'>
            <span>{import.meta.env.VITE_HOUR}</span>
          </div>
          <div className="dateRight">
            <span>{import.meta.env.VITE_DAY}</span>
            <span>{import.meta.env.VITE_MONTH}</span>
          </div>
        </div>

        <FlipClockCountdown
          to={import.meta.env.VITE_DATE}
          labels={['Días', 'Horas', 'Minutos', 'Segundos']}
          labelStyle={{ fontSize: isSmallDevice ? '9px' : '13px', fontWeight: 500, textTransform: 'uppercase', color: `#${import.meta.env.VITE_PINK_COLOR}`, fontFamily: 'Roboto' }}
          digitBlockStyle={{ width: '1.2em', height: isSmallDevice ? '1.6em' : '1.5em', fontSize: isSmallDevice ? '1.3em' : '2em', color: `#${import.meta.env.VITE_PINK_COLOR}`, background: '#f59e9e' }}
          dividerStyle={{ color: 'white', height: 1 }}
          separatorStyle={{ color: `#${import.meta.env.VITE_PINK_COLOR}`, size: isSmallDevice ? '3px' : '6px' }}
          duration={0.5}
        />

        <button className={registerButtonClass} ref={registerButton} onClick={() => setButtonClicked(!buttonClicked)}>
          <svg className="empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0H24V24H0z"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path></svg>
          <svg className="filled" height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H24V24H0z" fill="none"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path></svg>
          Confirma tu asistencia
        </button>

        <div className={loaderClass}></div>

        <div ref={confirmationCard} className={confirmationCardClass}>
          <h1>{registerText}</h1>
          <p>Nombre</p>
          <p className='answers'>{guestName}</p>
          {guestMail && <><p>Correo</p><p className='answers'>{guestMail}</p></>}
          <p>Invitado</p><p className='answers'>{`${guestPlusOne ? 'Si': 'No'}`}</p>
          <a className='btnLocation' href={import.meta.env.VITE_LOCATION} target="_blank" rel="noreferrer noopener">
            Ubicación de la fiesta
          </a>
        </div>

        <div className={formContainerClass}>
          <div className={alertClass}>Campo requerido: Nombre</div>
          <label htmlFor="name">Nombre</label>
          <input ref={nameInput} onChange={(e) => setGuestName(e.target.value) } type="text" />

          <label htmlFor="mail">Correo (opcional)</label>
          <input ref={mailInput} type="mail" onChange={(e) => setGuestMail(e.target.value)}/>

          
          <div className="switch-holder">
            <div className="switch-label">
                <span>Acompañante</span>
            </div>
            <div className="switch-toggle">
                <input ref={plusOneInput} type="checkbox" onChange={(e) => setGuestPlusOne(e.target.checked)} id="plusOne" />
                <label htmlFor="plusOne"></label>
            </div>
          </div>

          <button onClick={register}>Registrar</button>
          <button onClick={() => setButtonClicked(!buttonClicked)}>Volver</button>

        </div>
      </div>
    
    </div>
  )
}

export default App;