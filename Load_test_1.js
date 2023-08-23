import http from 'k6/http'
import { check, sleep } from 'k6'
import { Trend } from 'k6/metrics';
import { url, headers, generateLoadProfile } from './Helpers.js'

const latencyTrend = new Trend('latency');

const loadShape = generateLoadProfile('Load', 100, 
['30s', '30s', '30s', '30s','30s','30s','30s', '30s', '30s']);

export const options = {
  stages: loadShape,
  thresholds: {
    checks: ['rate>0.99'],
    latency: ['p(95)<670'],
  },
  ext: {
    loadimpact: {
      name: 'Bell Load test',
    },
  },
};


export default function () {
  for (let i = 0; i < 4; i++){
    let res = http.get(url, { headers });
    check(res, { 'Successful Response': r => r.status === 200 });
    latencyTrend.add(res.timings.waiting);
  }
  sleep(2)
}

