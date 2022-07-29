import React, { useState, useEffect, useRef } from 'react'
import * as Flashphoner from '@flashphoner/websdk'
import Camera, { ICameraStream } from './Camera'
import toJSX from 'html-react-parser'

const settingCameraStreams = []
// const settingCameraStreams = window.api.getSettings().CAMERA_STREAMS
const CameraPage = () => {
  const intervalRef = useRef(null)
  const [isSessionConnected, setIsSessionConnected] = useState(false)
  const [isPluginLoaded, setIsPluginLoaded] = useState(false)
  const streamServer = 'wss://demo.flashphoner.com'
  // const streamServer = 'wss://demo.flashphoner.com:8443'
  const [cameraStreams, setCameraStreams] = useState<ICameraStream[]>(settingCameraStreams)

  // const [cameraStreams, setCameraStreams] = useState<ICameraStream[]>([
  //   {
  //     label: 'Камера въезд',
  //     id: 'CAMERA_ENTER',
  //     url: 'rtsp://admin:123456@46.23.191.93:556/profile1'
  //   },
  //   {
  //     label: 'Камера выезд',
  //     id: 'CAMERA_EXIT',
  //     url: 'rtsp://admin:123456@46.23.191.93:556/profile1'
  //   }
  // ])

  // // Status constants
  // const SESSION_STATUS = Flashphoner.constants.SESSION_STATUS
  // const STREAM_STATUS = Flashphoner.constants.STREAM_STATUS

  // // Websocket session
  // const sessionRef = useRef<Flashphoner.Session>(null)

  // // Init Flashphoner API on page load
  // function initApi() {
  //   console.log('init api')
  //   try {
  //     Flashphoner.init({})
  //   } catch (e) {
  //     console.log('err init')
  //   }
  // }

  // // Connect to WCS server over websockets
  // const connect = async () => {
  //   if (isSessionConnected && isPluginLoaded) {
  //     clearInterval(intervalRef.current)
  //     return
  //   }

  //   if (!isPluginLoaded) {
  //     try {
  //       await Flashphoner.init({ flashMediaProviderSwfLocation: '' })
  //       setIsPluginLoaded(true)
  //     } catch (error) {
  //       console.log('plugin err', error)
  //       setIsPluginLoaded(false)
  //     }
  //   }
  //   if (!isSessionConnected) {
  //     try {
  //       sessionRef.current = await Flashphoner?.createSession({
  //         urlServer: streamServer
  //       })?.on(SESSION_STATUS.ESTABLISHED, (session) => {
  //         setIsSessionConnected(true)
  //       })
  //       // .on(SESSION_STATUS.PENDING, (session) => {
  //       //   setIsSessionConnected(true)
  //       // })
  //     } catch (error) {
  //       console.log('session errr', error)
  //       setIsSessionConnected(false)
  //     }
  //     // ?.on(SESSION_STATUS.CONNECTED, (session) => {
  //     //   setIsSessionConnected(true)
  //     //   console.log('connection connected')
  //     // })
  //   }
  //   // }
  // }

  // useEffect(() => {
  //   intervalRef.current = setInterval(() => connect(), 500)
  //   if (isSessionConnected && isPluginLoaded) {
  //     return () => clearInterval(intervalRef.current)
  //   }
  // }, [isSessionConnected, isPluginLoaded])

  useEffect(() => {
    console.log('cm', cameraStreams.length)
    cameraStreams.map(({ url, label }) =>
      document.querySelector('.cameras-block__row')?.insertAdjacentHTML(
        'afterbegin',
        `<div class="col-md-6 mt-2">
            <iframe id='fp_embed_player' src='https://demo.flashphoner.com:8888/embed_player?urlServer=wss://demo.flashphoner.com:8443&streamName=${url}&mediaProviders=WebRTC,MSE,WSPlayer&autoplay=true' marginwidth='0' marginheight='0' frameborder='0' width='100%' height='100%' scrolling='no' allowfullscreen='allowfullscreen'></iframe>
            <h5>${label}</h5>
        </div>`
      )
    )
  }, [])

  return (
    <div className="cameras-block mt-3">
      <div className="row cameras-block__row">
        {/* {isSessionConnected ? (
          <>
            {cameraStreams.map((stream) => (
              <div className="col-md-6">


              </div>
            ))}
          </>
        ) : (
          ''
        )} */}
      </div>
    </div>
  )
}
export default CameraPage

{
  /* <Camera
                  session={isSessionConnected && isPluginLoaded ? sessionRef.current : null}
                  stream={stream}
                /> */
}
