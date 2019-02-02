import React from "react"
import './App.css';
import Vote from "./vote.js"
import CreateElection from "./CreateElection.js"

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {render: "Form"}
    }

  componentDidMount() {
    this.setState({render: "Vote"})
  }

  load1() {
    this.setState({render: "Vote"})
  }

  load2() {
      this.setState({render: "Form"})
    }


  render() {
      {if (this.state.render === "Default") {
        return (
        <div>
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
    }
  }
}








export default App
