import React, { useState, useEffect, useRef } from 'react'
import * as Flashphoner from '@flashphoner/websdk'
import Camera, { ICameraStream } from './Camera/new'
import toJSX from 'html-react-parser'

const settingCameraStreams = window.api.getSettings().CAMERA_STREAMS

let config = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302']
    }
  ]
}
const CameraPage = () => {
  const [cameraStreams, setCameraStreams] = useState<ICameraStream[]>(settingCameraStreams)

  return (
    <div className="cameras-block mt-3">
      <div className="row cameras-block__row">
        {/* <div className="col-md-6">
          <video
            id="videoElem"
            autoPlay
            muted
            controls
            style={{ width: '100%', height: '200px' }}
          ></video>
        </div>
        <div className="col-md-6">
          <video
            id="videoElem"
            autoPlay
            muted
            controls
            style={{ width: '100%', height: '200px' }}
          ></video>
        </div> */}
        {/* {isSessionConnected ? ( */}
        <>
          {cameraStreams?.length
            ? cameraStreams.map((stream) => (
                <div className="col-md-6">
                  <Camera
                    id={stream.id}
                    label={stream.label}
                    // session={isSessionConnected && isPluginLoaded ? sessionRef.current : null}
                    // stream={stream}
                  />
                </div>
              ))
            : ''}
        </>
        {/* ) : ( */}
        {/* '' */}
        {/* )} */}
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
