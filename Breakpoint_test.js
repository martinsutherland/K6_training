import http from 'k6/http'
import { check, sleep } from 'k6'
import { url, headers } from './Helpers.js'

export const options = {
  executor: 'ramping-arrival-rate',
  stages: [{ duration: '20m', target: 2000 }],
  ext: {
    loadimpact: {
      name: 'Spike Test'
    }
  }
}

export default function () {
  let resGET = http.get(url, { headers })
  check(resGET, { 'Response: 200': r => r.status === 200 })
  sleep(1)
}
