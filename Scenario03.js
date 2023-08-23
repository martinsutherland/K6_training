import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { url, headers } from "./Helpers.js";

const latencyTrend = new Trend("latency");

export const options = {
  stages: [
    { duration: "30s", target: 0 },
    { duration: "30s", target: 400 },
    { duration: "30s", target: 60 },
    { duration: "30s", target: 80 },
    { duration: "30s", target: 90 },
    { duration: "30s", target: 120 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 90 },
    { duration: "30s", target: 60 },
    { duration: "30s", target: 0 }
  ],
  thresholds: {
    http_req_waiting: ["p(90)<1000", "p(95)<1500", "p(99)<2000"],
    checks: ["rate>0.99"],
  },
  ext: {
    loadimpact: {
      name: "Product Launch",
    },
  },
};

export default function () {
  for (let i = 0; i < 4; i++) {
    let resGET = http.get(url, { headers });
    check(resGET, { "Response: 200": (r) => r.status === 200 });
    latencyTrend.add(resGET.timings.waiting);
  }
  sleep(1);
}