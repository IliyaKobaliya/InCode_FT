import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "assets/css/material-dashboard-react.css?v=1.5.0";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { withRouter } from "react-router";

class SignUp extends Component {
  state = {
    signUp: false,
    type: "text",
    code: ``,
    inputLogin: ``,
    inputPassword: ``
  };
  render() {
    if (this.state.signUp === false) {
      this.list = (
        <Fragment>
          <GridItem sm={12} md={12}>
            <CustomInput
              id="float"
              inputProps={{
                placeholder: "Email address",
                name: "email",
                type: "email",
                required: true
              }}
              formControlProps={{
                fullWidth: false
              }}
            />
          </GridItem>
          <GridItem sm={12} md={12}>
            <CustomInput
              type="text"
              id="float"
              inputProps={{
                placeholder: "Password",
                name: "passwordInput",
                required: true
              }}
              formControlProps={{
                fullWidth: false
              }}
            />
          </GridItem>
          <GridItem sm={12} md={12}>
            <CustomInput
              type="text"
              id="float"
              inputProps={{
                placeholder: "Repeat password",
                name: "passwordInput2",
                required: true
              }}
              formControlProps={{
                fullWidth: false
              }}
            />
          </GridItem>
        </Fragment>
      );
    } else {
      this.list = (
        <div>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              type="text"
              id="disabled"
              labelText={this.state.inputLogin}
              formControlProps={{
                fullWidth: true,
                required: true
              }}
              inputProps={{
                disabled: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              type="text"
              id="regular"
              labelText="VerifyCode"
              inputProps={{
                placeholder: "Your code",
                name: "code",
                required: true
              }}
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </div>
      );
    }
    this.Authorization = () => {
      let inputLogin = document.getElementsByName("email")[0].value,
        inputPassword = document.getElementsByName("passwordInput")[0].value,
        inputPassword2 = document.getElementsByName("passwordInput2")[0].value,
        r = /^\w+@\w+\.\w{2,4}$/i;
      if (!r.test(inputLogin)) {
        alert(`Введен некорректный email!`);
      } else if (inputPassword !== inputPassword2) {
        alert(`Пароли не совпадают!`);
      } else {
        let number = Math.abs(
          Math.floor(Math.random() * (1234 - 9876 + 1)) + 1234
        );
        this.setState({
          signUp: true,
          code: number,
          inputLogin: inputLogin,
          inputPassword: inputPassword
        });
        setTimeout(() => {
          alert(`Ваш код подтверждения: ${this.state.code}`);
        }, 1000);
      }
    };

    this.SignUp = () => {
      let code = document.getElementsByName(`code`)[0].value;
      if (code === `${this.state.code}`) {
        this.props.signUp(
          this.state.inputLogin,
          this.state.inputPassword,
          this.props.Authorization.authBASE
        );
        this.props.history.push(`/SignIn`);
      }
    };

    this.button = (
      <CardFooter>
        <Button
          type={this.state.type}
          color="primary"
          onClick={!this.state.signUp ? this.Authorization : this.SignUp}
        >
          {this.state.signUp === false ? "sign up" : "verify email"}
        </Button>
      </CardFooter>
    );

    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={"cardTitleWhite"}>Register with Fit Trainer App</h4>
          <p className={"cardCategoryWhite"}>
            Please, enter your email and password
          </p>
        </CardHeader>
        <CardBody id={"df"}>{this.list}</CardBody>
        {this.button}
      </Card>
    );
  }
}
SignUp.propTypes = {
  Authorization: PropTypes.object,
  signUp: PropTypes.func
};
const signUpRout = withRouter(SignUp);
export default connect(
  state => ({ Authorization: state[3], allStore: state }),
  action => ({
    signUp: (login, password, store) => {
      action({
        type: "signUp",
        payload: {
          authBool: false,
          authEmail: `Guest`,
          authBASE: [
            ...store,
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
)(signUpRout);
