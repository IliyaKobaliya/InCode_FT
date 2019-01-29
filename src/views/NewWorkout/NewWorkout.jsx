import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import { ArrowDownward, ArrowUpward, Cancel } from "@material-ui/icons";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
//core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import "./StyleNewWorkout.css";
const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
class NewWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesArr: []
    };
  }
  componentDidMount() {
    if (window.location.toString() === `http://localhost:3000/NewWorkout`) {
      this.props.history.push("/dashboard");

      if (this.props.StoreExercises.length !== 0) {
        alert(`Віберите день!`);
      }
    }
    if (this.props.StoreExercises.length === 0) {
      alert(`Создайте упражнения`);
      this.props.history.push("/NewExercise");
    }
  }

  setTHISstate() {
    this.setState(
      this.state.exercisesArr.sort((a, b) => a.position - b.position)
    );
  }

  deleteItem(item) {
    let newStore = [];
    this.state.exercisesArr.map(listItem => {
      if (listItem !== item) {
        newStore.push(listItem);
      } else {
        return false;
      }
      this.setState({ exercisesArr: [...newStore] });
      return true;
    });
  }
  render() {
    this.exercises = this.props.StoreExercises.map(item => {
      return (
        <option value={item.name} key={item.key}>
          {item.name}
        </option>
      );
    });
    if (this.state.exercisesArr.length === 0) {
      this.list = null;
    } else {
      this.list = this.state.exercisesArr
        .sort((a, b) => a.position - b.position)
        .map((item, index) => {
          if (item.value === "kilometer") {
            item.value = "km";
          } else if (item.value === "hour") {
            item.value = "hr";
          } else if (item.value === "kilogram") {
            item.value = "kg";
          }
          return (
            <Grid key={item.key} container alignItems="center">
              <GridItem xs={12} sm={12} md={1}>
                <select
                  defaultValue={item.name}
                  id={"measurementType"}
                  className={"CustomSelect"}
                  onChange={event => {
                    let thisName, thisValue;
                    this.props.StoreExercises.map(itemNEW => {
                      if (itemNEW.name === event.target.value) {
                        thisName = itemNEW.name;
                        if (itemNEW.value === "kilometer") {
                          thisValue = "km";
                        } else if (itemNEW.value === "hour") thisValue = "hr";
                        else if (itemNEW.value === "kilogram") thisValue = "kg";
                      }
                      return true;
                    });
                    this.setState(() => {
                      item.name = thisName;
                      item.value = thisValue;
                      return item;
                    });
                  }}
                >
                  {this.exercises}
                </select>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div className={"containerInput"}>
                  <label className={"inputLabel"} htmlFor="regular">
                    Repeats
                  </label>
                  <CustomInput
                    id="regular"
                    inputProps={{
                      defaultValue: 0,
                      type: `number`,
                      onChange: event => {
                        let thisValue = event.target.value;
                        this.setState(() => {
                          item.repeats = thisValue;
                        });
                      }
                    }}
                    formControlProps={{
                      fullWidth: false
                    }}
                  />
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div className={"containerInput"}>
                  <label className={"inputLabel"} htmlFor="regular">
                    Measurement
                  </label>
                  <CustomInput
                    id="regular"
                    inputProps={{
                      defaultValue: 0,
                      type: `number`,
                      onChange: event => {
                        let thisValue = event.target.value;
                        this.setState(() => {
                          item.measurementItem = thisValue;
                        });
                      }
                    }}
                    formControlProps={{
                      fullWidth: false
                    }}
                  />
                </div>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}>
                <h1>{item.value}</h1>
              </GridItem>
              <GridItem xs={1} sm={1} md={1}>
                <Button
                  type="button"
                  color="info"
                  onClick={() => {
                    if (item.position === 1) {
                      return false;
                    } else {
                      this.setState(() => {
                        item.position--;
                      });
                      let nextItem = this.state.exercisesArr[index - 1];
                      this.state.exercisesArr.map(items => {
                        if (items === nextItem) {
                          this.setState(() => {
                            items.position++;
                          });
                        }

                        return true;
                      });
                      return this.setTHISstate();
                    }
                  }}
                >
                  <ArrowUpward />
                </Button>
              </GridItem>

              <GridItem xs={1} sm={1} md={1}>
                <Button
                  type="button"
                  color="info"
                  onClick={() => {
                    if (item.position !== this.state.exercisesArr.length) {
                      this.setState(() => {
                        item.position++;
                      });
                      let nextItem = this.state.exercisesArr[index + 1];
                      this.state.exercisesArr.map(items => {
                        if (items === nextItem) {
                          this.setState(() => {
                            items.position--;
                          });
                        }
                        return true;
                      });
                      return this.setTHISstate();
                    }
                  }}
                >
                  <ArrowDownward />
                </Button>
              </GridItem>

              <GridItem xs={1} sm={1} md={1}>
                <Button
                  type="button"
                  color="warning"
                  onClick={() => {
                    this.deleteItem(item);
                  }}
                >
                  <Cancel />
                </Button>
              </GridItem>
            </Grid>
          );
        });
    }

    this.GetWorkout = () => {
      let pathArray = window.location.pathname.split("/");
      let dateWorkout = decodeURIComponent(pathArray[2]);
      this.props.getNewWorkout(
        dateWorkout,
        this.props.StoreWorkouts,
        this.state.exercisesArr,
        this.props.StoreExercises,
        this.props.thisWorkout,
        this.props.Authorization
      );
      this.props.history.push("/dashboard");
    };

    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={"cardTitleWhite"}>Create new exercise</h4>
          <p className={"cardCategoryWhite"}>
            Please, add a new exercise name and measurement type
          </p>
        </CardHeader>
        <CardBody>
          <GridItem xs={12} sm={12} md={12}>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                if (this.state.exercisesArr.length === 0) {
                  // let name = `${this.props.StoreExercises[0].name}`
                  let thisValue = this.props.StoreExercises[0].value;
                  this.setState({
                    exercisesArr: [
                      {
                        name: this.props.StoreExercises[0].name,
                        position: this.state.exercisesArr.length + 1,
                        isShow: true,
                        key: this.state.exercisesArr.length,
                        value: thisValue,
                        repeats: 0,
                        measurementItem: 0
                      }
                    ]
                  });
                } else {
                  this.setState({
                    exercisesArr: [
                      ...this.state.exercisesArr,
                      {
                        name: this.props.StoreExercises[0].name,
                        position: this.state.exercisesArr.length + 1,
                        isShow: true,
                        key: this.state.exercisesArr.length,
                        value: this.props.StoreExercises[0].value,
                        repeats: 0,
                        measurementItem: 0
                      }
                    ]
                  });
                }
              }}
            >
              ADD EXERCISE
            </Button>
          </GridItem>
          {this.list}
        </CardBody>
        <CardFooter>
          <Button type="button" color="primary" onClick={this.GetWorkout}>
            CREATE WORKOUT
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
NewWorkout.propTypes = {
  StoreExercises: PropTypes.array,
  StoreWorkouts: PropTypes.array,
  allStore: PropTypes.array,
  thisWorkout: PropTypes.array,
  Authorization: PropTypes.object,
  getNewWorkout: PropTypes.func
};
const NewWorkoutRouter = withRouter(NewWorkout);
export default connect(
  state => ({
    StoreExercises: state[0],
    StoreWorkouts: state[1],
    allStore: state,
    thisWorkout: state[2],
    Authorization: state[3]
  }),
  action => ({
    getNewWorkout: (item, store, state, exercises, workout, authorization) => {
      let newWorkout = {};
      newWorkout[item] = state;
      action({
        type: "addWorkout",
        payload: [exercises, [...store, newWorkout], workout, authorization]
      });
    }
  })
)(withStyles(style)(NewWorkoutRouter));
