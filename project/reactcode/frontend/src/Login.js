import React from "react"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  };
     handleSubmit = async (event) => {

      console.log("The post runs")
      console.log("This runs first does it not")

       const postObject =  (postData, csrf) => { fetch("http://127.0.0.1:8000/api/token/", {
  			method: "POST",
  			mode: "cors",
  			cache: "no-cache",
  			credentials: "same-origin",
  			headers: {
  				"Content-Type": "application/json; charset=utf-8",
  			},
  			redirect: "follow",
  			referrer: "no-referrer",
  			body: JSON.stringify(postData),
  	 	})
  		}
      const credentials = {
        "username": `${this.state.username}`,
        "password": `${this.state.password}`,
      }
      postObject(credentials)
      console.log(credentials)
    }

    handlePasswordChange = (event) => {
      this.setState({password: event.target.value});
    }

    handleUsernameChange = (event) => {
      this.setState({username: event.target.value});
    };
    componentDidMount() {
    }


  render() {
    let i = 0
    if (i = 0) {
      this.easy()
      i++
    }
     return (
      <div>
        <form>
          <label>
          TELL ME YOUR FCKN username
          <input onChange={this.handleUsernameChange} />
          </label>

          <label>
          TELL ME YOUR FCKN PASSWRD
          <input type="password" onChange={this.handlePasswordChange} />
          </label>
          <button onClick={() => this.handleSubmit()} type="button">Login</button>
        </form>
      </div>);
  };

}

export default Login
