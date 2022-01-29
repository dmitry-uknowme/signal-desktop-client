import Centrifuge from 'centrifuge'
import settings from '../../settings.json'

const WEBSOCKET_URL = settings.WEBSOCKET_URL

export default new Centrifuge(WEBSOCKET_URL)
