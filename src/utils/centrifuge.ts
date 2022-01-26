import Centrifuge from 'centrifuge'

// export default new Centrifuge(process.env.WEBSOCKET_URL);
export default new Centrifuge('ws://127.0.0.1:8877/connection/websocket')
