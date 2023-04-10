import React, { useState, useEffect, useRef } from 'react'
import Flashphoner from '@flashphoner/websdk'
import { SESSION_STATUS } from '@flashphoner/websdk/src/constants'

export interface ICameraStream {
  id: string
  label: string
  url: string
  status?: typeof Flashphoner.constants.STREAM_STATUS
}

interface CameraProps {
  stream: ICameraStream
  session: Flashphoner.Session
}

const Camera: React.FC<CameraProps> = ({ stream, session }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const { id, label, url, status } = stream
  const intervalRef = useRef(null)

  const STREAM_STATUS = Flashphoner.constants.STREAM_STATUS

  function playStream() {
    if (isPlaying) return
    const options = {
      name: url,
      display: document.querySelector('#' + id)
    }

    const stream = session
      .createStream(options)
      .on(STREAM_STATUS.PLAYING, (stream) => {
        setIsPlaying(true)
        console.log('playing', stream.id())
      })
      .on(SESSION_STATUS.PENDING, (stream) => {
        console.log('pending', stream.id())
      })

    stream.play()
  }

  useEffect(() => {
    if (isPlaying) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      if (isPlaying) {
        return clearInterval(intervalRef.current)
      } else if (
        session &&
        session?.status() === SESSION_STATUS.ESTABLISHED &&
        document.querySelector('#' + id)
      ) {
        playStream()
      }
    }, 500)
    return () => clearInterval(intervalRef.current)
  }, [session, isPlaying])

  return (
    <div className="camera">
      {/* <button className="btn btn-success camera__btn" onClick={() => playStream()}>
        Play
      </button> */}
      <div className="camera__stream" id={id}></div>
      <h6>
        <b>{label}</b>
      </h6>
    </div>
  )
}
export default Camera
