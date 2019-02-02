import React from "react"

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      election: [],
      questions: [],
      djangoArgument:"77De399",
      alternatives: [],
      votes: {}};
      this.makeVoteObjects = this.makeVoteObjects.bind(this)
    }

    componentDidMount() {

//Retrieves election with Election_Id argument from django, updates state
  fetch(`http://127.0.0.1:8000/api/elections?search=${this.state.djangoArgument}`)
    .then(response => {
    if (response.status !== 200) {
      console.log("Failed to load Elections from our server")
    }
    return response.json();

  })
    .then(data => this.setState({election: data}))

    //Retrieves alternatives with Election_Id argument from django, updates state

    fetch(`http://127.0.0.1:8000/api/alternatives?search=${this.state.djangoArgument}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Failed to load Alternatives from our server")
        }
        return response.json();

      })
      .then(data => this.setState({alternatives: data}))

      fetch(`http://127.0.0.1:8000/api/questions?search=${this.state.djangoArgument}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Failed to load Questions from our server")
        }
        return response.json();

      })
      .then(data => this.setState({questions: data},
          function() {
            this.makeVoteArrays(this.makeVoteObjects)}));
  }

handleRangeChange(event) {
  console.log("Penis")
}

makeVoteObjects () {
  let altToStateArray = {}
  console.log(altToStateArray)

  this.state.questions.map(question => {
    let questionToArray = []

    this.state.alternatives.map(alt => {
      if (alt.Question_Id === question.Question_Id) {
        const voteObject = {
          Question_Id: question.Question_Id,
          Alternative_Id: alt.Alternative_Id,
          value:0 };
          questionToArray.push(voteObject);
      }
    })
    altToStateArray[`question${question.Question_Id}votes`] = questionToArray
    console.log(altToStateArray)
  });
  this.setState({votes: altToStateArray})
  };

makeVoteArrays(callback) {
  let QuestionsInVoteArray = {};
    this.state.questions.map(quest => {
    QuestionsInVoteArray[`question${quest.Question_Id}votes`] = [];
  });
  this.setState({votes: QuestionsInVoteArray},
      function(){
        callback()
      });
  };

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
        //checked={this.state.votes[`question${question.Question_Id}votes`][alternative.key].value === alternative.key}
        value={i}
        onChange={this.handleRangeChange}
        />
        {i}
        </label>)
      }
      return range
    }

  rangeElection(question) {
    return this.state.alternatives.map(alt => {
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
export default Vote
