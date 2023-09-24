import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

function App() {


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

      </span>
    
    </div>
  )
}

export default App;