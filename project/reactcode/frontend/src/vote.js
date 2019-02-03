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
      this.makeVoteObjects = this.makeVoteObjects.bind(this);
      this.getApiInformation = this.getApiInformation.bind(this);
      this.makeVoteArrays = this.makeVoteArrays.bind(this);
      this.makeVoteObjects = this.makeVoteObjects.bind(this);
      this.fetchQuestions = this.fetchQuestions.bind(this);
    }

    fetchElection() {
      fetch(`http://127.0.0.1:8000/api/elections?search=${this.state.djangoArgument}`)
        .then(response => {
        if (response.status !== 200) {
          console.log("Failed to load Elections from our server")
        }
        return response.json();

      })
        .then(data => {this.setState({election: data})
        console.log(data)}
      )
    }

    fetchAlternatives() {
      return fetch(`http://127.0.0.1:8000/api/alternatives?search=${this.state.djangoArgument}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Failed to load Alternatives from our server")
        }
        return response.json();
      })
      .then(data => {this.setState({alternatives: data})
        console.log(data)}

    )};

fetchQuestions() {
      return fetch(`http://127.0.0.1:8000/api/questions?search=${this.state.djangoArgument}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Failed to load Questions from our server")
        }
        return response.json();

      })
      .then(data => {this.setState({questions: data})
        console.log(data)}
      );

  };

 getApiInformation() {
   Promise.all([
    this.fetchElection(),
    this.fetchAlternatives(),
    this.fetchQuestions()
  ]).then(promise => {
    console.log(this.state.questions);
    this.makeVoteArrays(this.makeVoteObjects);
    console.log("Madas du suger")}, console.log("Yo, you suck"))
}
  componentDidMount() {
  this.getApiInformation();
  }

handleRangeChange(event) {
  console.log("Penis")
}

makeVoteObjects () {
  console.log("makeVoteObjects kjører")
  let altToStateArray = {}
  console.log(altToStateArray)
  console.log(this.state.questions);
  this.state.questions.map(question => {
    let questionToArray = [];
    console.log("QuestMappen kjører");
    this.state.alternatives.map(alt => {
      console.log("AltMappen kjører")
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
  console.log("makeVoteArrays kjører")
  let QuestionsInVoteArray = {};
    this.state.questions.map(quest => {
    QuestionsInVoteArray[`question${quest.Question_Id}votes`] = [];
  });
  this.setState({votes: QuestionsInVoteArray}, function() {
        callback();
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
      range.push(<label key={alternative.Alternative_Id}>
        <input
        key={alternative.key}
        type="radio"
        checked={this.state.votes[`question${question.Question_Id}votes`]
          [alternative.Alternative_Id].value
         === i}
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
