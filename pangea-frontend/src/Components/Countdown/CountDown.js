// import {useEffect} from 'react'
import Countdown from 'react-countdown'

const Completionist = ({setDone, completed}) => {
  setDone(true)
  return null
}

const CountDown = ({timeInMilisecs, setDone}) => {
  // Renderer callback with condition
  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      // Render a completed state
      return <Completionist setDone={setDone} completed={completed} />
    } else {
      // Render a countdown
      return (
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
      )
    }
  }
  return (
    <div className='countdown'>
      <Countdown renderer={renderer} date={Date.now() + timeInMilisecs} />
    </div>
  )
}

export default CountDown
