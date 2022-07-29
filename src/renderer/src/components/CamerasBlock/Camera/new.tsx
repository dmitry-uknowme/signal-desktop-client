import React, { useEffect } from 'react'

const Camera = ({ id, label }) => {
  useEffect(() => {
    console.log('efffect', id, label)
    // if (window) {
    let stream = new MediaStream()
    let suuid = id

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
      console.log('evvvv', event)
      stream.addTrack(event.track)
      stream.addTrack(event.track)
      document.querySelector(`#${id}`).srcObject = stream
      console.log(event.streams.length + ' track is delivered')
    }

    pc.oniceconnectionstatechange = (e) => console.log(pc.iceConnectionState)

    async function handleNegotiationNeededEvent() {
      let offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      getRemoteSdp()
    }

    // getCodecInfo
    // window.addEventListener('load', function () {
    // $('#' + suuid).addClass('active')
    getCodecInfo()
    // })

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
    // return () => null
    // }
    // return () => null
  }, [])

  // useEffect(() => {
  //   window.api.restartApp()
  // }, [])

  return (
    <div className="camera">
      {/* <button className="btn btn-success camera__btn" onClick={() => playStream()}>
        Play
      </button> */}
      {/* <div className="camera__stream" id={id}></div> */}
      <video
        className="camera__stream"
        id={id}
        autoPlay
        muted
        controls
        style={{ width: '100%', height: '200px' }}
      ></video>
      <h6>
        <b>{label}</b>
      </h6>
    </div>
  )
}

export default Camera
