import React, {Component} from "react";
import {connect} from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import { ArrowDownward, ArrowUpward, Cancel } from "@material-ui/icons";
// core components
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx"
import CustomInput from "components/CustomInput/CustomInput"

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


class EditWorkout extends Component {
  render(){
    if (this.props.Store === []) {
      this.list = null;
    } else {
      this.list =null;
      // this.list = this.props.Store.sort((a,b)=>a.position - b.position).map((item,index) => {
      //
      // });
    }
    return(
      <Card>
        <CardHeader color="primary">
          <h4 className={"cardTitleWhite"}>Edit Exercises</h4>
        </CardHeader>
        <CardBody>{this.list}</CardBody>
        <Button
          type="button"
          color="primary"
          onClick={() => {
            this.props.update(this.props.Store);
          }}
        >
          CREATE EXERCISES
        </Button>
      </Card>
    )
  }
}
export default connect(
  state => ({
    Store: state[1]
  }),
  action => ({
    deleteItem: (item,store) => {
      let newStore = [];
      store.map(listItem => {
        if (listItem !== item) {
          newStore.push(listItem);
        } else {
          false
        }
        return newStore;
      });
      action({ type: "DeleteItem", payload: [...newStore] });
    },
    moveItem: store => {
      action({ type: "MoveItem", payload: [...store] });
    },
    update: updateStore => {
      action({ type: "UpdateStore", payload: [...updateStore] });
    }
  })
)(withStyles(style)(EditWorkout))
