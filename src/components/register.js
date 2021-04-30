import React, { Component } from 'react';
import "./register.css";
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';







const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

class register extends Component {
    constructor() {
        super();
        this.state = {
          firstName: "",
          lastName: "",
          emailAddress: "",
          login: "",
          password: "",
          passwordConfirmation: "",
          firstNameError: "",
          lastNamerror: "",
          emailAddressError: "",
          loginError: "",
          passwordError: "",
          passwordConfirmationError: "",
          isFormSubmitted: false,
          loginFree: "",
          emailAddressFree: ""
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
        this.validateEmailAddress = this.validateEmailAddress.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(this);
        this.validateField = this.validateField.bind(this);
      }
    
      handleChange(event) {
        const { name, value } = event.target;
    
        this.setState({
          [name]: value
        });
    
        return;
      }
    
      handleBlur(event) {
        const { name } = event.target;
    
        this.validateField(name);
        return;
      }
    
      handleSubmit(event) {
        event.preventDefault();
        let formFileds = [
          "firstName",
          "lastName",
          "login",
          "emailAddress",
          "password",
          "passwordConfirmation"
        ];
        let isValid = true;
        formFileds.forEach(field => {
          isValid = this.validateField(field) && isValid;
        });
    
        if (isValid){ 
          
          let dat = {
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          login : this.state.login,
          emailAddress : this.state.emailAddress,
          password : this.state.password
      };
        axios.post("http://localhost/api/api.php", dat).then(this.setState({ isFormSubmitted: true }),
        this.setState({
          firstName: "",
          lastName: "",
          emailAddress: "",
          login: "",
          password: "",
          passwordConfirmation: "",
          firstNameError: "",
          lastNamerror: "",
          emailAddressError: "",
          loginError: "",
          passwordError: "",
          passwordConfirmationError: "",
          
          loginFree: "",
          emailAddressFree: ""

        })
        );
        
    } 
        else this.setState({ isFormSubmitted: false });
    
       
        
        return this.state.isFormSubmitted;
        
        
       
        
      }
    
      validateField(name) {
        let isValid = false;
    
        if (name === "firstName") isValid = this.validateFirstName();
        else if (name === "lastName") isValid = this.validateLastName();
        else if (name === "emailAddress") isValid = this.validateEmailAddress();
        else if (name === "password") isValid = this.validatePassword();
        else if (name === "login") isValid = this.validateLogin();
        else if (name === "passwordConfirmation")
          isValid = this.validatePasswordConfirmation();
        return isValid;
      }
    
      validateFirstName() {
        let firstNameError = "";
        let firstNameRight = "";
        const value = this.state.firstName;
        if (value.trim() === "") firstNameError = "Imię jest wymagane!";
        
    
        this.setState({
            firstNameError
           
        });
        return firstNameError, firstNameRight === "";
     
      }

      validateLogin() {
        let loginError = "";
        let loginFree = "";
        let login_obj = {
          login: this.state.login
        }
        const value = this.state.login;
        if (value.trim() === "") loginError = "Login jest wymagany!";
        else(
          axios.post("http://localhost/api/login_check.php", login_obj).then(response => {
            if(response.data === "taken")
            {
            loginError = "Login jest zajęty!";
            console.log(loginError);
            }
            else
            {
              loginFree = "Login jest wolny!";
              console.log(loginFree);
             
            }
            this.setState({
              loginError, loginFree
            });
            return loginError, loginFree === "";
            
          }
          )
        )
        this.setState({
          loginError
        });
        return loginError, loginFree === "";
        
      }
    
      validateLastName() {
        let lastNameError = "";
        const value = this.state.lastName;
        if (value.trim() === "") lastNameError = "Nazwisko jest wymagane!";
    
        this.setState({
          lastNameError
        });
        return lastNameError === "";
      }
    
      validateEmailAddress() {
        let emailAddressError = "";
        let email_obj = {
          emailAddress: this.state.emailAddress
        }
        let emailAddressFree = "";
        const value = this.state.emailAddress;
        if (value.trim === "") emailAddressError = "E-mail jest wymagany!";
        else if (!emailValidator.test(value))
          emailAddressError = "Nie poprawny adres e-mail!";
          else(
            axios.post("http://localhost/api/email_check.php", email_obj).then(response => {
              if(response.data === "taken")
              {
              emailAddressError = "Na ten adres e-mail jest już założone konto!";
              
              }
              else
              {
              emailAddressFree = "Adres e-mail jest wolny!";
               
               
              }
              this.setState({
                emailAddressError, emailAddressFree
              });
              return emailAddressError, emailAddressFree === "";
              
            }
            )
          )
        this.setState({
          emailAddressError, emailAddressFree
        });
        return emailAddressError, emailAddressFree === "";
      }
    
      validatePassword() {
        let passwordError = "";
        const value = this.state.password;
        if (value.trim === "") passwordError = "Hasło jest wymagane";
        else if (!passwordValidator.test(value))
          passwordError =
            "Hasło musi zawierać co najmniej 8 znaków, 1 liczbę, 1 wielką i 1 małą literę oraz znak specjalny!";
    
        this.setState({
          passwordError
        });
        return passwordError === "";
      }
    
      validatePasswordConfirmation() {
        let passwordConfirmationError = "";
        if (this.state.password !== this.state.passwordConfirmation)
          passwordConfirmationError = "Hasła nie zgadzają się!";
    
        this.setState({
          passwordConfirmationError
        });
        return passwordConfirmationError === "";
      }

    

     
    
    render() {
    
   
        return (
            <div className="register-container">    
                <div className="register animate__animated animate__fadeInRight">
                    <div className="register-center-container">
                        <h3>Zarejestruj się!</h3>
                     
                        <div className="register-form-container">
                            <form Validate autoComplete="off" onSubmit={this.handleSubmit}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Imię..."
                                    type="text"
                                    
                                    name="firstName" 
                                    color="secondary"
                                    onChange={this.handleChange} 
                                    value={this.state.firstName} 
                                    onBlur={this.handleBlur} 
                                    variant="outlined" 
                                   
                                    />
                                    <br></br>
                                    <br></br>
                                {this.state.firstNameError && (<div className="errorMsg">{this.state.firstNameError}</div>)}
                                {this.state.firstNameRight && (<div className="RightMsg">{this.state.firstNameRight}</div>)}
                                <TextField id="outlined-basic" label="Nazwisko..." type="text" name="login" name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur} 
                                    variant="outlined" 
                                    />
                                    <br></br>
                                    <br></br>
                                {this.state.lastNameError && (<div className="errorMsg">{this.state.lastNameError}</div>)}
                               
                                <TextField id="outlined-basic"
                                  label="Login..."
                                  type="text" 
                                  name="login" 
                                  value={this.state.login}
                                  onChange={this.handleChange}
                                  onBlur={this.handleBlur}   
                                  variant="outlined" />
                                  <br></br>
                                  <br></br>
                                  
                                {this.state.loginError && (<div className="errorMsg">{this.state.loginError}</div>)}
                                {this.state.loginFree && (<div className="RightMsg">{this.state.loginFree}</div>)}
                                <TextField
                                    id="outlined-basic"
                                    label="E-mail..."
                                    type="email" 
                                    name="emailAddress" 
                                    value={this.state.emailAddress}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur} 
                                    variant="outlined" 
                                    />
                                    <br></br>
                                    <br></br>
                                    {this.state.emailAddressError && (<div className="errorMsg">{this.state.emailAddressError}</div>)}
                                    {this.state.emailAddressFree && (<div className="RightMsg">{this.state.emailAddressFree}</div>)}
                                <TextField 
                                    id="outlined-basic"
                                    label="Hasło..." 
                                    type="password" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    autoComplete="off"
                                    name="password" 
                                    variant="outlined" 
                                />
                                <br></br>
                                <br></br>
                                {this.state.passwordError && (<div className="errorMsg">{this.state.passwordError}</div>)}
                                <TextField 
                                    id="outlined-basic" 
                                    label="Potwierdź hasło..." 
                                    type="password" 
                                    name="passwordConfirmation"
                                    value={this.state.passwordConfirmation}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    autoComplete="off" 
                                    variant="outlined" 
                                />
                                <br></br>
                                <br></br>
                                {this.state.passwordConfirmationError && (<div className="errorMsg">{this.state.passwordConfirmationError}</div>)}
                                {/* <TextField
                                    id="outlined-basic"
                                    label="Data urodzenia"
                                    type="date"
                                    defaultValue="dd-mm-yyyy"
                                    variant="outlined"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                /><br></br><br></br> */}
                                <Button className="submit-button"  style={{fontSize: "15px"}} variant="contained" type="submit" color="secondary">Zarejestruj</Button><br></br><br></br>
                                
                            </form>
                           
                            <p>Masz już konto?<Link to="/landpage" style={{color: "rose", cursor: "pointer", fontWeight: "bold", textDecoration: "none"}}> Kliknij tutaj</Link> aby się zalogować.</p>
                            {this.state.isFormSubmitted ? (
                             <p style={{color: "green"}}>Udało się, zostałeś zarejestrowany!</p>
                            ) : ( "" )}
                        </div>
                    </div>
                </div>
                </div>
               
        )
    }
}
export default register;
