import http from 'k6/http'
import { check, sleep } from 'k6'
import { Trend } from 'k6/metrics';
import { url, headers, generateLoadProfile } from './Helpers.js'

const latencyTrend = new Trend('latency');

const loadShape = generateLoadProfile('linear', 50, ['10s', '20s', '15s', '10s']);

export const options = {
  stages: loadShape,
  thresholds: {
    checks: ['rate>0.99'],
    latency: ['p(95)<650'],
  },
  ext: {
    loadimpact: {
      name: 'Linear Load test',
    },
  },
};



export default function () {
  for (let i = 0; i < 3; i++){
    let res = http.get(url, { headers });
    check(res, { 'Successful Response': r => r.status === 200 });
    latencyTrend.add(res.timings.waiting);
  }
  sleep(2)
}

