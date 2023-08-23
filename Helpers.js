import http from "k6/http";
import { sleep, group, check } from "k6";

export const url =
  "https://lrmbw2d582.execute-api.eu-north-1.amazonaws.com/dev/lastnames/test";

export const headers = {
  Authorization:
    "",
  "Content-Type": "application/json",
};

const splitNumber = (number) => {
  const half = Math.floor(number / 2);
  const remainder = number % 2;
  return [half + remainder, half];
}

export function generateLoadProfile(shape, numVUs, stageDurations) {
  const stages = [];

 const stagesCount = stageDurations.length
 const [firstHalf, secondHalf] = splitNumberInHalf(stagesCount);
 const increaseValue = numVUs / 0.2
  let currentTarget = 0
 firstHalf.foreach((stage, index) => {
   let object = {}
   currentTarget = currentTarget + increaseValue
   object['duration'] = stageDurations[index]
   object['target'] = currentTarget
   stages.push(object)
 })
 secondHalf.foreach((stage, index) => {
  let object = {}
  currentTarget = currentTarget + increaseValue
  object['duration'] = stageDurations[index]
  object['target'] = currentTarget
  stages.push(object)
})

return stages


}




export const body = JSON.stringify({
  data_type: "people",
  country: "uk",
  all_data: ["firstname", "lastname", "nino", "address"],
  quantity: 10,
});

export const performCheck = (response, checkName, status) => {
  let checkObject = {};
  checkObject[checkName] = (r) => r.status === status;

  let checkResult = check(response, checkObject);

  if (!checkResult) {
    console.error(`${checkName} failed: Expected status 200, but got`, response.status);
  }
};
