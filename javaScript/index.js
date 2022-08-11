const dataSetOne = [13, 1, 5, 8, 6];
const dataSetTwo = [
  {
    Name: "Bonnie Jennings",
    age: 50,
    occupation: "Driver",
  },
  {
    Name: "Aysha Mathis",
    age: 27,
    occupation: "Teacher",
  },
  {
    Name: "Tianna Dorsey",
    age: 35,
    occupation: "Player",
  },
  {
    Name: "Fleur Chandler",
    age: 49,
    occupation: "Teacher",
  },
  {
    Name: "Imogen Robinson",
    age: 60,
    occupation: "Driver",
  },
  {
    Name: "Sienna Zuniga",
    age: 17,
    occupation: "Athlete",
  },
  {
    Name: "Kimberley Petty",
    age: 50,
    occupation: "Driver",
  },
  {
    Name: "Elizabeth Donaldson",
    age: 22,
    occupation: "Athlete",
  },
  {
    Name: "Priya Haines",
    age: 50,
    occupation: "Athlete",
  },
  {
    Name: "Claudia Glenn",
    age: 50,
    occupation: "Architect",
  },
];

// 1. Write a function to sort,
// a. sort data set 1 by ascending order

const sortDataSetOne = (data) => {
  let length = data.length;
  for (let i = 0; i < length - 1; i++) {
    if (data[i] > data[i + 1]) {
      let value = data[i];
      data[i] = data[i + 1];
      data[i + 1] = value;
      i = -1;
    }
  }

  return data;
};

// b. sort data set 2 by age in ascending order
const sortDataSetTwo = (data) => {
  let length = data.length;
  for (let i = 0; i < length - 1; i++) {
    if (data[i].age > data[i + 1].age) {
      let value = data[i];
      data[i] = data[i + 1];
      data[i + 1] = value;
      console.log(data);
      i = -1;
    }
  }

  return data;
};

// c. sort data set 2 by name in ascending order
const sortByName = (data) => {
  let length = data.length;
  for (let i = 0; i < length - 1; i++) {
    if (data[i].Name > data[i + 1].Name) {
      let value = data[i];
      data[i] = data[i + 1];
      data[i + 1] = value;
      console.log(data);
      i = -1;
    }
  }

  return data;
};

//2.Write a function to filter list of objects
//Filter dataset 2 with age less than 38

const filter = (data) => {
  const returnArray = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.age < 38) {
      returnArray.push(element);
    }
  }

  return returnArray;
};

//3.Transform an array
// a. Add a new field called “date of birth” to each object in dataset 2 and calculate
// approximate date of birth from their age.

//to get DOB
const getDateOfBirth = (age) => {
  const today = new Date();
  const year = today.getFullYear();
  today.setFullYear(year - age);
  return `${today.getDate()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, 0)}-${today.getFullYear()}`;
};

const transFormArray = (data) => {
  const returnArray = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    returnArray.push({ ...element, dob: getDateOfBirth(element.age) });
  }

  return returnArray;
};

//4. Write a function to group list of objects
// a. Group dataset 2 by occupation

const groupBy = (data) => {
  const groupedData = {};
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (!groupedData[element.occupation]) {
      groupedData[element.occupation] = [];
    }
    groupedData[element.occupation].push(element);
  }

  return groupedData;
};

//5. Write a function to calculate min, max & average
// a. DataSet 1
const calculationForDataSetOne = (data) => {
  let max;
  let min;
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    sum += element;
    if (typeof max === "undefined") {
      max = element;
      min = element;
    } else {
      if (max < element) {
        max = element;
      }
      if (min > element) {
        min = element;
      }
    }
  }

  return { min, max, avg: sum / data.length };
};

// b. DataSet 2 min, max & average of age field

const calculationForDataSetTwo = (data) => {
  let max;
  let min;
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const { age: element } = data[i];
    sum += element;
    if (typeof max === "undefined") {
      max = element;
      min = element;
    } else {
      if (max < element) {
        max = element;
      }
      if (min > element) {
        min = element;
      }
    }
  }

  return { min, max, avg: sum / data.length };
};

//6.Write a function to calculate total records under each occupation for dataset 2

const groupByLength = (data) => {
  const groupedData = {};
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (!groupedData[element.occupation]) {
      groupedData[element.occupation] = 0;
    }
    groupedData[element.occupation] += 1;
  }

  return groupedData;
};

// const sortDataSetOneData = sortDataSetOne(dataSetOne);
// console.log(sortDataSetOneData);

// const sortDataSetTwoData = sortDataSetTwo(dataSetTwo);
// console.log(sortDataSetTwoData);

// const sortByNameData = sortByName(dataSetTwo);
// console.log(sortByNameData);

// const filteredData = filter(dataSetTwo);
// console.log(JSON.stringify(filteredData));
// const transFormedData = transFormArray(dataSetTwo);
// console.log(JSON.stringify(transFormedData));

// const groupedData = groupBy(dataSetTwo);
// console.log(groupedData);

// const calculationForDataSetOneData = calculationForDataSetOne(dataSetOne);
// console.log(calculationForDataSetOneData);

// const calculationForDataSetTwodata = calculationForDataSetTwo(dataSetTwo);
// console.log(calculationForDataSetTwodata);

// const groupByLengthData = groupByLength(dataSetTwo);
// console.log(groupByLengthData);
