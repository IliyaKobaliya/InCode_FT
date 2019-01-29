import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridItem from "components/Grid/GridItem";
//core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import "./newExerciseStyle.css";
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
class NewExercise extends Component {
  giveStore() {
    let measureItem;
    for (
      let i = 0;
      i < document.getElementsByClassName("measurementItems").length;
      i++
    ) {
      let value = document.getElementsByClassName("measurementItems")[i]
        .selected;
      let item = document.getElementsByClassName("measurementItems")[i];
      if (value === true) {
        measureItem = item.innerText;
      }
    }
    let name = document.getElementById("float").value;
    let arrayOfNames = [];
    if (name.length === 0) {
      alert("Введите название упражнения!");
    } else if (this.props.Store.length === 0) {
      this.props.getNewExercise(
        name,
        this.props.Store,
        measureItem,
        this.props.Workouts,
        this.props.Workout,
        this.props.AuthorizationState
      );
    } else {
      this.props.Store.map(item => {
        arrayOfNames.push(item.name);
        return true;
      });
      if (arrayOfNames.indexOf(name) === -1) {
        this.props.getNewExercise(
          name,
          this.props.Store,
          measureItem,
          this.props.Workouts,
          this.props.Workout,
          this.props.AuthorizationState
        );
      } else alert(`Такое упражнение уже существует!`);
    }
  }
  render() {
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
            <CustomInput
              labelText="Exercise Name"
              id="float"
              formControlProps={{ fullWidth: true }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div className={"containerSelect"}>
              <label>
                Measurement type
                <select
                  defaultValue="kilometer"
                  id={"measurementType"}
                  className={"CustomSelect"}
                >
                  <option className="measurementItems">kilogram</option>
                  <option className="measurementItems">kilometer</option>
                  <option className="measurementItems">hour</option>
                </select>
              </label>
            </div>
          </GridItem>
        </CardBody>
        <CardFooter>
          <Button
            type="button"
            color="primary"
            onClick={this.giveStore.bind(this)}
          >
            CREATE EXERCISES
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

NewExercise.propTypes = {
  Store: PropTypes.array,
  allStore: PropTypes.array,
  Workouts: PropTypes.array,
  Workout: PropTypes.array,
  AuthorizationState: PropTypes.object,
  getNewExercise: PropTypes.func
};

export default connect(
  state => ({
    Store: state[0],
    allStore: state,
    Workouts: state[1],
    Workout: state[2],
    AuthorizationState: state[3]
  }),
  action => ({
    getNewExercise: (
      name,
      store,
      measurement,
      workouts,
      workout,
      AuthorizationState
    ) => {
      action({
        type: "addExercise",
        payload: [
          [
            ...store,
            {
              name: name,
              position: store.length + 1,
              isShow: true,
              key: store.length + 1,
              value: measurement
            }
          ],
          workouts,
          workout,
          AuthorizationState
        ]
      });
    }
  })
)(withStyles(style)(NewExercise));
