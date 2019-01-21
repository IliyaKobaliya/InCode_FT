import React, { Component } from "react";
import { connect } from "react-redux";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
//core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
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
     let value = document.getElementsByClassName("measurementItems")[i].selected;
     let item = document.getElementsByClassName("measurementItems")[i]
     if (value === true){
       measureItem = item.innerText;
      }
    }
    this.props.getNewExercise(
      document.getElementById("float").value,
      this.props.Store,
      measureItem
    );
  }
  render(){
  return (
    <Card>
          <CardHeader color="primary">
          <h4 className={"cardTitleWhite"}>Create new exercise</h4>
          <p className={"cardCategoryWhite"}>
            Please, add a new exercise name and measurement type
            </p>
      </CardHeader>
      <CardBody>
   <CustomInput
      labelText="Exercise Name"
      id="float"
            ref={input => {
                this.searchInput = input;
              }}
              formControlProps={{ fullWidth: true }}
    />
    <div id={"CustomSelect"}>
      <label>
                Measurement type
      <select defaultValue="kilometer" id={'measurementType'} className={"CustomSelect"}>
                  <option className='measurementItems'>kilogram</option>
                  <option className='measurementItems'>kilometer</option>
                  <option className='measurementItems'>hour</option>
      </select>
    </label>
    </div>
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
export default connect(
  state => ({
    Store: state[0]
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
)(withStyles(style)(NewExercise))
