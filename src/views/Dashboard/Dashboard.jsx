import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "components/CustomButtons/Button.jsx";
import "react-infinite-calendar/styles.css";
import { withRouter } from "react-router";
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

  selectedDay = val => {
    let thisObj = null;
    let date = `${val}`;
    this.props.Store.map(item => {
      if (Object.keys(item)[0] === date) {
        thisObj = item[Object.keys(item)[0]];
        this.props.editeWorkout(
          thisObj,
          this.props.exercisesStore,
          this.props.Store,
          this.props.Authorization
        );
      }
      return true;
    });
    if (thisObj === null) {
      thisObj = {};
      let thisKey = `${val}`;
      thisObj[thisKey] = {};
      this.props.history.push(`/NewWorkout/${val}`);
    } else {
      this.props.history.push(`/EditWorkout/${val}`);
    }
  };
  render() {
    this.days = this.props.Store.map(item => {
      return new Date(Object.keys(item));
    });
    return (
      <Fragment>
        <Button
          type="button"
          color="primary"
          onClick={() => {
            this.props.history.push("/NewExercise");
          }}
        >
          ADD EXERCISE
        </Button>

        <InfiniteCalendar
          Component={MultipleDatesCalendar}
          width={500}
          height={600}
          disabledDays={[0, 6]}
          minDate={lastWeek}
          onSelect={this.selectedDay}
          interpolateSelection={defaultMultipleDateInterpolation}
          selected={[...this.days]}
        />
      </Fragment>
    );
  }
}
Dashboard.propTypes = {
  Store: PropTypes.array,
  exercisesStore: PropTypes.array,
  allStore: PropTypes.array,
  Authorization: PropTypes.object,
  editeWorkout: PropTypes.func
};
const DashboardRouter = withRouter(Dashboard);

export default connect(
  state => ({
    Store: state[1],
    exercisesStore: state[0],
    allStore: state,
    Authorization: state[3]
  }),
  action => ({
    editeWorkout: (item, exercises, workouts, authorization) => {
      action({
        type: "editeWorkout",
        payload: [exercises, workouts, item, authorization]
      });
    }
  })
)(DashboardRouter);
