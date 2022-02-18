import { useState, useEffect, useRef } from 'react'
import Flashphoner from '@flashphoner/websdk'

// console.log('flashh', Flashphoner)
const CameraPage = () => {
  const [settings, setSettings] = useState({
    streamUrl: 'rtsp://188.162.55.209:554/live/main',
    streamServer: 'wss://demo.flashphoner.com',
  })
  /* {
    streamUrl:
      'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
    streamServer: 'wss://demo.flashphoner.com',
  } */
  // Status constants
  const SESSION_STATUS = Flashphoner.constants.SESSION_STATUS
  const STREAM_STATUS = Flashphoner.constants.STREAM_STATUS

  // Websocket session
  const sessionRef = useRef(null)

  // Init Flashphoner API on page load
  function initApi() {
    console.log('init api')
    Flashphoner.init({})
  }

  // Connect to WCS server over websockets
  function connect() {
    sessionRef.current = Flashphoner.createSession({
      urlServer: settings.streamServer,
    }).on(SESSION_STATUS.ESTABLISHED, function (session) {
      console.log('connection established')
      playStream(session)
    })
  }

  // Playing stream with given name and mount the stream into myVideo div element
  function playStream() {
    const options = {
      //   name: 'rtsp://188.162.55.209:554/live/main',
      name: settings.streamUrl,
      display: document.getElementById('cameraStream'),
    }
    const stream = sessionRef.current
      .createStream(options)
      .on(STREAM_STATUS.PLAYING, function (stream) {
        console.log('playing')
      })
    stream.play()
  }
  console.log('seettt', settings)
  useEffect(() => {
    if (window.localStorage.getItem('cameraSettings')) {
      setSettings(JSON.parse(window.localStorage.getItem('cameraSettings')))
    }
    initApi()
    connect()
    // playStream()
  }, [])

  return (
    <div className="camera-page">
      <div id="cameraStream"></div>
      <button className="btn btn-success" onClick={() => playStream()}>
        Play
      </button>
    </div>
  )
}
export default CameraPage
/* {
    streamUrl:
      'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
    streamServer: 'wss://demo.flashphoner.com',
  } */
