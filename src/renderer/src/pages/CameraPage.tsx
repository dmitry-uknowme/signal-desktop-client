import React, { useState, useEffect, useRef } from 'react'
import Flashphoner from '@flashphoner/websdk'
import axios from 'axios'

const CameraPage = () => {
  let config = {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302']
      }
    ]
  }

  // const [stream, setStream] = useState<ReturnType<typeof MediaStream>>()
  // const [peerConnection, setPeerConnection] = useState<typeof RTCPeerConnection>()

  const [settings, setSettings] = useState({
    streamUrl: 'rtsp://admin:123456@46.23.191.93:556/profile1',
    // streamUrl: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
    streamServer: 'wss://demo.flashphoner.com'
  })

  useEffect(() => {
    let stream = new MediaStream()
    let suuid = 'ENTER'

    let config = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302']
        }
      ]
    }
    const pc = new RTCPeerConnection(config)
    pc.onnegotiationneeded = handleNegotiationNeededEvent

    // let log = (msg) => {
    //   document.getElementById('div').innerHTML += msg + '<br>'
    // }

    pc.ontrack = function (event) {
      stream.addTrack(event.track)
      document.querySelector('#videoElem').srcObject = stream
      console.log(event.streams.length + ' track is delivered')
    }

    pc.oniceconnectionstatechange = (e) => console.log(pc.iceConnectionState)

    async function handleNegotiationNeededEvent() {
      let offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      getRemoteSdp()
    }

    window.addEventListener('load', function () {
      // $('#' + suuid).addClass('active')
      getCodecInfo()
    })

    function getCodecInfo() {
      $.get('http://localhost:8083/stream/codec/' + suuid, function (data) {
        try {
          data = JSON.parse(data)
        } catch (e) {
          console.log(e)
        } finally {
          $.each(data, function (index, value) {
            pc.addTransceiver(value.Type, {
              direction: 'sendrecv'
            })
          })
        }
      })
    }

    let sendChannel = null

    function getRemoteSdp() {
      $.post(
        'http://localhost:8083/stream/receiver/' + suuid,
        {
          suuid: suuid,
          data: btoa(pc.localDescription.sdp)
        },
        function (data) {
          try {
            pc.setRemoteDescription(
              new RTCSessionDescription({
                type: 'answer',
                sdp: atob(data)
              })
            )
          } catch (e) {
            console.warn(e)
          }
        }
      )
    }
  }, [])

  return (
    <div className="camera-page">
      <div id="cameraStream"></div>
      <video
        id="videoElem"
        autoPlay
        muted
        controls
        style={{ width: '100%', height: '200px' }}
      ></video>
      {/* <button className="btn btn-success" onClick={() => playStream()}>
        Play
      </button> */}
    </div>
  )
}
export default CameraPage
