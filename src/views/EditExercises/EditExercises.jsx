import React, { Component } from "react";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import { ArrowDownward, ArrowUpward, Cancel } from "@material-ui/icons";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput";
import GridItem from "components/Grid/GridItem";
const style = {
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

class EditExercises extends Component {
  componentDidMount() {
    if (this.props.Store.length === 0) {
      alert(`Прежде чем редактировать,создайте упражнения!`);
      this.props.history.push("/NewExercise");
    }
  }
  state = {
    exercises: this.props.Store
  };

  setTHISstate() {
    this.setState(this.state.exercises.sort((a, b) => a.position - b.position));
  }

  render() {
    if (this.props.Store === []) {
      this.list = null;
    } else {
      this.list = this.state.exercises
        .sort((a, b) => a.position - b.position)
        .map((item, index) => {
          if (item.isShow === true) {
            return (
              <Grid container alignItems="center" key={item.key}>
                <GridItem xs={4} sm={4} md={4}>
                  <CustomInput
                    // labelText="Exercise name"
                    inputProps={{
                      placeholder: item.name,
                      name: "name"
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={4} sm={4} md={4}>
                  <div className={"containerSelect"}>
                    <label>
                      "Measurement type"
                      <select
                        className={"CustomSelect"}
                        defaultValue={item.value}
                        onChange={event => {
                          let thisValue;
                          thisValue = event.target.value;
                          this.setState(() => {
                            item.value = thisValue;
                          });
                        }}
                      >
                        <option value="kilogram">kilogram</option>
                        <option value="kilometer">kilometer</option>
                        <option value="hour">hour</option>
                      </select>
                    </label>
                  </div>
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
                        let nextItem = this.state.exercises[index - 1];
                        this.state.exercises.map(items => {
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
                    color="info"
                    onClick={() => {
                      if (item.position === this.state.exercises.length) {
                        return false;
                      } else {
                        this.setState(() => {
                          item.position++;
                        });
                        let nextItem = this.state.exercises[index + 1];
                        this.state.exercises.map(items => {
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
                <GridItem xs={2} sm={2} md={2}>
                  <Button
                    type="button"
                    color="warning"
                    onClick={() => {
                      let updateExercises = this.props.Store.map(itemTHIS => {
                        if (itemTHIS.position > item.position) {
                          itemTHIS.position--;
                          itemTHIS.key--;
                        }
                        return itemTHIS;
                      });
                      this.props.deleteItem(
                        item,
                        updateExercises,
                        this.props.Workouts,
                        this.props.Workout,
                        this.props.Authorization
                      );
                    }}
                  >
                    <Cancel />
                  </Button>
                </GridItem>
              </Grid>
            );
          } else {
            return false;
          }
        });
    }
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={"cardTitleWhite"}>Edit Exercises</h4>
        </CardHeader>
        <CardBody>{this.list}</CardBody>
        <Button
          type="button"
          color="primary"
          onClick={() => {
            this.props.update(
              this.state.exercises,
              this.props.Workouts,
              this.props.Workout,
              this.props.Authorization
            );
          }}
        >
          CREATE EXERCISES
        </Button>
      </Card>
    );
  }
}
export default connect(
  state => ({
    Store: state[0],
    Workouts: state[1],
    Workout: state[2],
    Authorization: state[3]
  }),
  action => ({
    deleteItem: (item, store, workouts, workout, authorization) => {
      let newStore = [];
      store.map(listItem => {
        if (listItem !== item) {
          newStore.push(listItem);
        }
        return newStore;
      });
      action({
        type: "DeleteItem",
        payload: [[...newStore], workouts, workout, authorization]
      });
    },
    moveItem: (store, workouts, workout, authorization) => {
      action({
        type: "MoveItem",
        payload: [[...store], workouts, workout, authorization]
      });
    },
    update: (updateStore, workouts, workout, authorization) => {
      action({
        type: "UpdateStore",
        payload: [[...updateStore], workouts, workout, authorization]
      });
    }
  })
)(withStyles(style)(EditExercises));
