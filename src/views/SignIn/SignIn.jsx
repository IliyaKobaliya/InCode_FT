import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridItem from "components/Grid/GridItem";
//core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
class SignIn extends Component {
  render() {
    this.Entrance = () => {
      let inputLogin = document.getElementsByName("email")[0].value,
        inputPassword = document.getElementsByName("testPassword")[0].value,
        r = /^\w+@\w+\.\w{2,4}$/i;
      if (inputLogin.length === 0 || inputPassword.length === 0) {
        alert(`Введите логин и пароль!`);
      } else if (!r.test(inputLogin)) {
        alert(`Введен некорректный email!`);
      } else if (r.test(inputLogin)) {
        this.props.Authorization.authBASE.map(item => {
          if (inputLogin === item.authLog && inputPassword === item.authPass) {
            alert(`Welcom to the site,${inputLogin}`);
            this.props.signIn(
              inputLogin,
              inputPassword,
              this.props.Authorization.authEmail
            );
            this.props.history.push(`/dashboard`);
          }
          return true;
        });
      } else {
        return alert(`Введены неверные данные!`);
      }
    };
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={"cardTitleWhite"}>Sign into Fit Trainer App</h4>
          <p className={"cardCategoryWhite"}>
            Please, enter your email and password
          </p>
        </CardHeader>
        <CardBody id={"df"}>
          <GridItem sm={12} md={12}>
            <CustomInput
              id="float1"
              inputProps={{
                placeholder: "Email address",
                name: "email",
                type: "email"
              }}
              formControlProps={{ fullWidth: false }}
            />
          </GridItem>
          <GridItem sm={12} md={12}>
            <CustomInput
              id="float2"
              inputProps={{
                placeholder: "Password",
                name: "testPassword",
                type: "password"
              }}
              formControlProps={{ fullWidth: false }}
            />
          </GridItem>
        </CardBody>
        <CardFooter>
          <Button type="button" color="primary" onClick={this.Entrance}>
            SIGN UP
          </Button>
        </CardFooter>
      </Card>
    );
  }
}
SignIn.propTypes = {
  Authorization: PropTypes.object,
  signIn: PropTypes.func
};

export default connect(
  state => ({
    Authorization: state[3]
  }),
  action => ({
    signIn: (login, password) => {
      action({
        type: "signIn",
        payload: {
          authBool: true,
          authEmail: login,
          authBASE: [
            {
              authLog: login,
              authPass: password
            }
          ],
          token: `apgpajsdpjNJNgngsdfj`
        }
      });
    }
  })
)(SignIn);
