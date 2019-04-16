import React from "react"
import './App.css';
import Vote from "./vote.js"
import CreateElection from "./CreateElection.js"
import Login from "./Login.js"

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {render: "Form"}
    }

  componentDidMount() {
    this.setState({render: "Default"})
  }

  load1() {
    this.setState({render: "Vote"})
  }

  load2() {
      this.setState({render: "Form"})
    }

  load3() {
        this.setState({render: "login"})
      }


  render() {
      {if (this.state.render === "Default") {
        return (
        <div>
          <button onClick={() => {this.load3()}}>render Login Form</button>
          <button onClick={() => {this.load2()}}>render Make Election</button>
          <button onClick={() => {this.load1()}}>Render Vote</button>
        </div>
      )
    }
    else if (this.state.render === "Vote" ) {
      return <Vote />
    }
    else if (this.state.render === "Form") {
      return <CreateElection />
      }
    else if (this.state.render === "login") {
      return <Login />
      }
    }
  }
}








export default App
