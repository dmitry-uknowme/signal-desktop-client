// import centrifuge from '../../../../../public/centrifuge/index'
import React, { useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import CentrifugeContext from "./Context";
const centrifuge = new Centrifuge("ws://127.0.0.1:8877/connection/websocket");

const CentrifugeProvider: React.FC = ({ children }) => {
  // const[centrifuge,setCentrifuge] = useState()
  const [terminalWeight, setTerminalWeight] = useState<string | number>(0);
  const [detectedAutoNumbers, setDetectedAutoNumbers] = useState({
    IN: "",
    OUT: "",
  });
  useEffect(() => {
    centrifuge.on("connected", function (ctx) {
      // console.log('connected', ctx)
    });

    centrifuge.on("disconnected", function (ctx) {
      // console.log('disconnected', ctx)
    });

    const weightChannel = centrifuge.newSubscription("channel");
    weightChannel.on("publication", (ctx) => {
      console.log("weight sub", ctx.data);
      setTerminalWeight(ctx.data.value);
    });
    weightChannel.subscribe();

    const autoNumberChannel = centrifuge.newSubscription("autoNumber");
    autoNumberChannel.on("publication", (ctx) => {
      const data = ctx.data;
      const value = ctx.data.value;
      setDetectedAutoNumbers((state) => ({
        ...state,
        [data.direction]: value,
      }));
    });
    autoNumberChannel.subscribe();
    centrifuge.connect();

    return () => {
      weightChannel.unsubscribe();
      autoNumberChannel.unsubscribe();
      centrifuge.disconnect();
    };
  }, []);

  return (
    <CentrifugeContext.Provider
      value={{
        terminalWeight,
        setTerminalWeight,
        detectedAutoNumbers,
        setDetectedAutoNumbers,
      }}
    >
      {children}
    </CentrifugeContext.Provider>
  );
};

export default CentrifugeProvider;
