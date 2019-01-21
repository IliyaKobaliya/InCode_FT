// const Jan18_2019 = new Date(2019, 0, 18),
//  Jan22_2019 = new Date(2019, 0, 22),
//  Jan26_2019 = new Date(2019, 0, 26);
// const Exercises = [
//   {
//     name: "Exercise #1",
//     position: 1,
//     isShow: true,
//     key: 1,
//     value: "hour",
//     date: [Jan18_2019, Jan22_2019, Jan26_2019]
//   },
// {
//     name: "Exercise #2",
//     position:2,
//     isShow: true,
//     key: 2,
//     value: "kilometer",
//     date: [Jan18_2019, Jan22_2019, Jan26_2019]
//   },
//   {
//     name: "Exercise #3",
//     position:3,
//     isShow: true,
//     key: 3,
//     value: "kilometer",
//     date: [Jan18_2019, Jan22_2019, Jan26_2019]
//   },
//   {
//     name: "Exercise #4",
//     position: 4,
//     isShow:true,
//     key: 4,
//     value: "kilometer",
//     date: [Jan18_2019, Jan22_2019, Jan26_2019]
//   },
// {
//     name: "Exercise #5",
//     position: 5,
//     isShow:true,
//     key: 5,
//     value: "kilometer",
//     date: [Jan18_2019, Jan22_2019, Jan26_2019]
//   }
// ];
const Workout = [
  {
  "Thu Jan 24 2019 00:00:00 GMT+0200 (Eastern European Standard Time)": {
      ex1: {
      name: "Runing",
        position: 1,
        isShow: true,
        key: 1,
        value: "kilometer"
      },
      ex2: {
        name: "footbal",
        position: 2,
        isShow: true,
        key: 2,
      value: "hour"
      }
    }
  },
  {
    "Thu Jan 29 2019 00:00:00 GMT+0200 (Eastern European Standard Time)": {
      ex1: {
      name: "polo",
        position: 1,
        isShow: true,
        key: 1,
        value: "hour"
      },
      ex2: {
        name: "box",
        position: 2,
        isShow: true,
        key: 2,
      value: "hour"
      }
    }
  },
];
const Exercises = [];
// Workout = [];
const initialState = [[...Exercises], [Workout]];
export default function makeExercise(state = initialState, action) {
  if (action.type === "DeleteItem") {
    return (state = [[...action.payload], [...Workout]]);
  } else if (action.type === "MoveItem") {
    return (state = [[...action.payload], [...Workout]]);
  } else if (action.type === "addExercise") {
    return (state = [[...action.payload], [...Workout]]);
  } else if (state === "UpdateStore") {
    return (state = [[...action.payload], [...Workout]]);
  }
  return state;
}
