import React from "react"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      csrftoken: ""
    };
  };
    handlePasswordChange = (event) => {
      this.setState({password: event.target.value});
    }

    handleUsernameChange = (event) => {
      this.setState({username: event.target.value});
    };

     getCookie = (name) => {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    easy() {
    var csrftoken = this.getCookie('csrftoken');
    this.setState({csrftoken: csrftoken})
  };


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

        </form>
      </div>);
  };

}

export default Login
