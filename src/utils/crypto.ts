/**
 * 加密模块
 */
import * as crypto from 'crypto'

import { config } from '../config'

const { crypt_config } = config

export const cryptoUtil = {
  encode: (content: string) => {
    const hmac = crypto.createHmac('sha256', crypt_config.key)
    return hmac.update(content).digest('hex')
  },
  compare: (target: string, origin: string) => {
    return cryptoUtil.encode(target) === origin
  }
}
