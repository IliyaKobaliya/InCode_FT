// const Exercises = [
//   {
//     name: "Exercise #1",
//     position: 1,
//     isShow: true,
//     key: 1,
//     value: "hour"
//   },
// {
//     name: "Exercise #2",
//     position:2,
//     isShow: true,
//     key: 2,
//     value: "kilometer"
//   },
//   {
//     name: "football",
//     position:3,
//     isShow: true,
//     key: 3,
//     value: "kilometer"
//   },
//   {
//     name: "Exercise #4",
//     position: 4,
//     isShow:true,
//     key: 4,
//     value: "kilometer"
//   },
// {
//     name: "Runing",
//     position: 5,
//     isShow:true,
//     key: 5,
//     value: "kilometer"
//   }
// ];
// const Workout = [
//   {
//   "Thu Jan 24 2019 00:00:00 GMT+0200 (Eastern European Standard Time)": [
//     {
//         name: "Runing",
//         position: 1,
//         isShow: true,
//         key: 1,
//         value: "kilometer",
//         repeats: 1,
//         measurementItem:1
//       },
//       {
//         name: "football",
//         position: 2,
//         isShow: true,
//         key: 2,
//         value: "hour",
//         repeats:1,
//         measurementItem: 2
//       }
//     ]
//   },
//   {
//     "Tue Jan 29 2019 00:00:00 GMT+0200 (Eastern European Standard Time)": [
//     {
//         name: "polo",
//         position: 1,
//         isShow: true,
//         key: 1,
//         value: "hour",
//         repeats:2,
//         measurementItem: 3
//       },
//     {
//         name: "box",
//         position: 2,
//         isShow: true,
//         key: 2,
//         value: "hour",
//         repeats:5,
//         measurementItem: 2
//       }
//    ]
//  }
// ];
const Exercises = [],
  Workout = [],
  thisWorkout = [],
  Authorization = {
    authBool: false,
    authEmail: "Guest",
    authBASE: [
      {
        authLog: "",
        authPass: ""
      }
    ]
  };
const initialState = [
  [...Exercises],
  [...Workout],
  [...thisWorkout],
  Authorization
];
export default function makeExercise(state = initialState, action) {
  if (action.type === "signUp") {
    return (state = [
      [...Exercises],
      [...Workout],
      [...thisWorkout],
      action.payload
    ]);
  } else if (action.type === "signIn") {
    return (state = [
      [...Exercises],
      [...Workout],
      [...thisWorkout],
      action.payload
    ]);
  } else if (action.type === "SignOut") {
    return (state = [
      [...Exercises],
      [...Workout],
      [...thisWorkout],
      action.payload
    ]);
  } else if (action.type === "DeleteItem") {
    return (state = [...action.payload]);
  } else if (action.type === "MoveItem") {
    return (state = [...action.payload]);
  } else if (action.type === "addExercise") {
    return (state = [...action.payload]);
  } else if (action.type === "UpdateStore") {
    return (state = [...action.payload]);
  } else if (action.type === "addWorkout") {
    return (state = [...action.payload]);
  } else if (action.type === "editeWorkout") {
    return (state = [...action.payload]);
  } else if (action.type === "updateWorkout") {
    return (state = [...action.payload]);
  }
  return state;
}
