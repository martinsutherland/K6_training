import http from 'k6/http'
import { check, sleep } from 'k6'
import { url, headers } from './Helpers.js'

export const options = {
  executor: 'ramping-arrival-rate', 
  stages: [
    { duration: '2m', target: 1000 } 
  ],
  ext: {
    loadimpact: {
      name: 'Ramping Rate'
    }
  }
}

export default function () {
  for (let i = 0; i < 10; i++) {
    let resGET = http.get(url, { headers })
  check(resGET, { 'Successful GET': r => r.status === 200 })
  }
  sleep(2)
}
