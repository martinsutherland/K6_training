import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { url, headers } from "./Helpers.js";

const latencyTrend = new Trend("latency");

export const options = {
  stages: [
    { duration: "30s", target: 0 },
    { duration: "30s", target: 60 },
    { duration: "30s", target: 70 },
    { duration: "30s", target: 70 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 70 },
    { duration: "30s", target: 70 },
    { duration: "30s", target: 60 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_waiting: ['p(95)<800', 'p(99)<1500'],
    checks: ["rate>0.99"],
  },
  ext: {
    loadimpact: {
      name: "Typical Day",
    },
  },
};

export default function () {
 
    let resGET = http.get(url, { headers });
    check(resGET, { "Response: 200": (r) => r.status === 200 });
    latencyTrend.add(resGET.timings.waiting);

  sleep(1);
}
