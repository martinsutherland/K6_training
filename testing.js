function splitArrayInHalf(arr) {
  const halfLength = Math.floor(arr.length / 2);
  const remainder = arr.length % 2;

  return [
    arr.slice(0, halfLength + remainder),
    arr.slice(halfLength + remainder),
  ];
}

function splitArrayInThirds(arr) {
  const thirdLength = Math.floor(arr.length / 3);
  const remainder = arr.length % 3;

  return [
    arr.slice(0, thirdLength + remainder),
    arr.slice(thirdLength + remainder, 2 * thirdLength + remainder),
    arr.slice(2 * thirdLength + remainder),
  ];
}

const createSpikeLoad = (numVUs, stageDurations) => {

 let [first, second, third] = splitArrayInThirds(stageDurations);
  
  const stages = [];

  if (third.length > 0){
    for (let i = 0; i < first.length; i++) {
      let object = {};
      let currentTarget = numVUs * 0.25;
      if (currentTarget < 0) currentTarget = 0;
      object["duration"] = first[i];
      object["target"] = parseInt(currentTarget.toFixed(0));
      stages.push(object);
    }
  
    for (let i = 0; i < second.length; i++) {
      let object = {};
      object["duration"] = second[i];
      object["target"] = parseInt(numVUs.toFixed(0));
      stages.push(object);
    }
  
    
      for (let i = 0; i < third.length; i++) {
        let object = {};
        let currentTarget = numVUs * 0.25;
        if (currentTarget < 0) currentTarget = 0;
        object["duration"] = third[i];
        object["target"] = parseInt(currentTarget.toFixed(0));
        stages.push(object);
      }
  } else {
    
  let start = {};
  let end = {};
  start["duration"] = stageDurations[0];
  start["target"] = parseInt(numVUs);
  stages.push(start);

  end["duration"] = stageDurations[0];
  const endTarget = numVUs / 2
  end["target"] = parseInt(endTarget);
  stages.push(end);
  }

 
  

  return stages;
};

const createSoakLoad = (numVUs, stageDurations) => {
  const stages = [];

  if (stageDurations.length > 2){
    let start = {};
    let end = {};
    start["duration"] = stageDurations[0];
    const startTarget = numVUs / 2
    start["target"] = parseInt(startTarget.toFixed(0));
    stages.push(start);
  
    for (let i = 1; i < stageDurations.length - 1; i++) {
      let object = {};
      object["duration"] = stageDurations[i];
      object["target"] = parseInt(numVUs.toFixed(0));
      stages.push(object);
    }
  
    end["duration"] = stageDurations[stageDurations.length - 1];
    const target = numVUs / 2;
    end["target"] = parseInt(target.toFixed(0));
    stages.push(end);
  } else {
    let start = {};
    let end = {};
    start["duration"] = stageDurations[0];
    const startTarget = numVUs / 2
    start["target"] = parseInt(startTarget.toFixed(0));
    stages.push(start);
  
    end["duration"] = stageDurations[1];
    end["target"] = parseInt(numVUs.toFixed(0));
    stages.push(end);
  }

 

  return stages;
};

const createLoadShape = (numVUs, stageDurations) => {
  let [firstHalf, secondHalf] = splitArrayInHalf(stageDurations);

  const stages = [];
  let currentTarget = 0;
  let increaseValue = 0;

  for (let i = 0; i < firstHalf.length; i++) {
    let object = {};
    increaseValue = (numVUs - currentTarget) / (firstHalf.length - i);
    currentTarget = currentTarget + increaseValue;
    if (currentTarget < 0) currentTarget = 0;
    object["duration"] = firstHalf[i];
    object["target"] = parseInt(currentTarget.toFixed(0));
    stages.push(object);
  }

  for (let i = 0; i < secondHalf.length; i++) {
    let object = {};
    currentTarget = currentTarget - increaseValue;
    if (currentTarget < 0) currentTarget = 0;
    object["duration"] = secondHalf[i];
    object["target"] = parseInt(currentTarget.toFixed(0));
    stages.push(object);
  }

  return stages;
};

const generateLoadShape = (shape, numVUs, stageDurations) => {
  const lowerCaseShape = shape.toLowerCase()
  switch (lowerCaseShape) {
    case "load":
    case "stress":
      return createLoadShape(numVUs, stageDurations);

    case "soak":
      return createSoakLoad(numVUs, stageDurations);

    case "spike":
      return createSpikeLoad(numVUs, stageDurations);

    default:
      throw new Error("Invalid shape specified.");
  }
}


console.log("Load:", generateLoadShape("load", 100, ["1m", "1m", "1m", "1m", "1m", "1m"]));
console.log("Stress:", generateLoadShape("stress", 400, ["1m", "1m", "1m", "1m", "1m", "1m"]));
console.log("Soak:", generateLoadShape("soak", 200, ["1m", "1m", "1m", "1m"]));
console.log("Spike:", generateLoadShape("spike", 200, ["1m", "1m", "1m", "1m"]));

