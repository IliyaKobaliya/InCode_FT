import React from "react";
import ReactDOM from 'react-dom';
// import Calendar from 'react-calendar-material';
import PropTypes from "prop-types";
import ChartistGraph from "react-chartist";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import 'react-infinite-calendar/styles.css';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates
} from "react-infinite-calendar";
const MultipleDatesCalendar = withMultipleDates(Calendar);

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);
class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getDate = event => {
    const date = event.target;
    console.log(date.data("date"));
  }







  selectedDay = (val) => {
    let storeArr = this.props.Store;
    let thisObj = null;
    for(let i = 0; i < storeArr.length; i++) {
  let date = val;
      if (`${Object.keys(storeArr[i])}` === `${date}`) {
        thisObj = storeArr[i];
  }
  }
    if (thisObj === null) {
      // console.log(thisObj);
      thisObj = new Object();
      let thisKey = `${val}`;
      thisObj[thisKey] = {};
      console.log(thisObj);
      return this.props.history.push(`/NewWorkout`);
    } else {
      console.log(thisObj);
      return this.props.history.push(`/EditWorkout`);
    }
  }



  render() {
    return (
      <InfiniteCalendar
            Component={MultipleDatesCalendar}
         width={500}
         height={600}
        // selected={}
         disabledDays={[0,6]}
         minDate={lastWeek}
        onSelect={this.selectedDay}

    interpolateSelection={defaultMultipleDateInterpolation}
    selected={[new Date(2019, 0, 24), new Date(2019, 0, 29), new Date()]}
       />
    )
  }
}
export default connect(
  state => ({
    Store: state[1][0]
  }),
  action => ({
    getNewExercise: (name, store,measurement) => {
      action({
        type: "addExercise",
        payload: [
          ...store,
          {
            name: name,
            position: store.length + 1,
            isShow: true,
            key: store.length + 1,
            value:measurement
          }
        ]
      });
    }
  })
)(Dashboard)
