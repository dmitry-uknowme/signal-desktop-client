// import centrifuge from '../../../../../public/centrifuge/index'
import React, { useEffect, useState } from 'react'
import CentrifugeContext from './Context'
const centrifuge = window.centrifuge

const CentrifugeProvider = ({ children }) => {
  const [terminalWeight, setTerminalWeight] = useState<string | number>(0)
  useEffect(() => {
    // updateWeight()
    centrifuge.on('connected', function (ctx) {
      console.log('connected', ctx)
    })

    centrifuge.on('disconnected', function (ctx) {
      console.log('disconnected', ctx)
    })

    const channel = centrifuge.newSubscription('channel')
    channel.on('publication', (ctx) => {
      setTerminalWeight(ctx.data.value)
    })
    channel.subscribe()

    centrifuge.connect()
    return () => {
      channel.unsubscribe()
      centrifuge.disconnect()
    }
  }, [])

  return (
    <CentrifugeContext.Provider value={{ terminalWeight, setTerminalWeight }}>
      {children}
    </CentrifugeContext.Provider>
  )
}

export default CentrifugeProvider
