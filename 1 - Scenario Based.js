import http from "k6/http";
import { check, sleep } from "k6";
import { url, headers, body } from "./Helpers.js";

export const options = {
  scenarios: {
    Scenario01: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 2,
      startTime: "0s",
      gracefulStop: '40s'
    },
    Scenario02: {
      executor: "per-vu-iterations",
      vus: 2,
      iterations: 8,
      startTime: "20s",
    },
  },
  ext: {
    loadimpact: {
      name: "Smoke Test",
    },
  },
};

export default function () {
  let res = http.get(url, { headers });
  check(res, { 'Successful Response': r => r.status === 200 });
 }


