import React from "react"
import ReactDOM from 'react-dom';
import './App.css';
import GenerateMajorityForm from "./MajorityForm.js"
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
      {if (this.state.render == "Default") {
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



class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      election: [],
      questions: [],
      djangoArgument:"77De399",
      alternatives: [],
      votes: {
        Question_1_votes: [{"Vote_Owner": "", "Vote_Value": null, "Election_Id": "","Question_Id": null,"Alternative_Id": null},]
      }}

    }

    componentDidMount() {

//Retrieves election with Election_Id argument from django, updates state
  fetch(`http://127.0.0.1:8000/api/elections?search=${this.state.djangoArgument}`)
    .then(response => {
    if (response.status !== 200) {
      console.log("Madas du suger")
    }
    return response.json();

  })
    .then(data => this.setState({election: data}))

    //Retrieves alternatives with Election_Id argument from django, updates state

    fetch(`http://127.0.0.1:8000/api/alternatives?search=${this.state.djangoArgument}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Madas du suger")
        }
        return response.json();

      })
      .then(data => this.setState({alternatives: data}))



    fetch(`http://127.0.0.1:8000/api/questions?search=${this.state.djangoArgument}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Madas du suger")
        }
        return response.json();

      })
      .then(data => this.setState({questions: data}))

  let QuestionsInVoteArray = {}
  console.log("fuck")

  this.state.questions.map(quest => {
    console.log("fuck")
    QuestionsInVoteArray.quest.Question_Id = []
  })

  this.setState({votes: QuestionsInVoteArray})
  }


  getAlternatives(question) {
    if (question.Election_Method === "Range") {
      return this.rangeElection(question)
      }
      else if (question.Election_Method === "Majority") {
        return <p>Here there will be a majority election</p>
      }
      else {
        return <p>Here there will be an approvals election</p>
      }
    }

  getRange(question, alternative) {
    let range = []
    for (let i = -5; i < 6; i++) {
      range.push(<label key={alternative.key}>
        <input
        key={alternative.key}
        type="radio"
        checked={this.state.value === alternative.key}
        value={i}
        />
        {i}
        </label>)
      }
      console.log(range)
      return range
    }

  rangeElection(question) {
    return this.state.alternatives.map(alt => {
      console.log(question.Question_Id)
      if (alt.Question_Id === question.Question_Id) {
        return(

          <div>
          <p>{alt.Alternative_Wording}</p>

          {this.getRange(question, alt).map(x => {return x})}

          </div>

        )}
      })
    }



  render() {
    return(
      // Renders Election by looping through state.election
      <div>
      {this.state.election.map(elect => {
        return(
          <div>
          <p>{elect.Description}</p>
          {this.state.questions.map(question => {
            return(
              <div>
              <h1>Question {question.Question_Id + 1}</h1>
              <h2>{question.Question_Wording}</h2>
              <h3>{question.Election_Method}</h3>
              <form>
              {this.getAlternatives(question)}
              <button type="button">Submit vote</button>
              </form>

              </div>
            )})}
            </div>)
          })}
        </div>
      )}
}





export default App