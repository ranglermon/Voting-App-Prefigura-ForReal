import React from "react"

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      election: [],
      questions: [],
      djangoArgument:"77De399",
      alternatives: [],
      votes: {},
      loadingFinished: false
    };
      this.makeVoteObjects = this.makeVoteObjects.bind(this);
      this.ApiCall = this.ApiCall.bind(this);
      this.getApiInformation = this.getApiInformation.bind(this);
      this.makeVoteArrays = this.makeVoteArrays.bind(this);
      this.makeVoteObjects = this.makeVoteObjects.bind(this);
    //  this.fetchQuestions = this.fetchQuestions.bind(this);
    }
    //Methods related to Api calls

    ApiCall(arg) {
      fetch(`http://127.0.0.1:8000/api/${arg}?search=${this.state.djangoArgument}`)
        .then(response => {
        if (response.status !== 200) {
          console.log(`Failed to load ${arg} from our server`);
        }
        console.log(`${arg} success`);
        return response.json();
      })
      .then(data => {this.setState({[arg] : data})
        console.log(data)
      });
    };


  /*  fetchElection() {
      fetch(`http://127.0.0.1:8000/api/elections?search=${this.state.djangoArgument}`)
        .then(response => {
        if (response.status !== 200) {
          console.log("Failed to load Elections from our server")
        }
        return response.json();

      })
      .then(data => {this.setState({"election": data})
        console.log(data)
      }
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
      .then(data => {this.setState({alternatives: data})}) };

    fetchQuestions() {
      return fetch(`http://127.0.0.1:8000/api/questions?search=${this.state.djangoArgument}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Failed to load Questions from our server")
        }
        return response.json();

      })
      .then(data => {this.setState({questions: data})
        console.log(data)
      }
      );

  };
*/
 getApiInformation() {
   Promise.all([
    this.ApiCall("election"),
    this.ApiCall("alternatives"),
    this.ApiCall("questions")])
    .then(promise => {
    this.makeVoteArrays(this.makeVoteObjects);
})
}
  componentDidMount() {
  this.getApiInformation();
  }

handleRangeChange(event, Question_Id, Alternative_Id) {
  let currentState = this.state.votes
  currentState[`question${Question_Id}votes`]
  [Alternative_Id].value = parseInt(event.target.value);
    this.setState({votes: currentState})
}

makeVoteObjects () {
  let altToStateArray = {}
  this.state.questions.map(question => {
    let questionToArray = [];
    this.state.alternatives.map(alt => {
      if (alt.Question_Id === question.Question_Id) {
        const voteObject = {
          Question_Id: question.Question_Id,
          Alternative_Id: alt.Alternative_Id,
          value: 0 };
          questionToArray.push(voteObject);
      }
    })
    altToStateArray[`question${question.Question_Id}votes`] = questionToArray
  });
  this.setState({votes: altToStateArray, loadingFinished: true}, )
  };

makeVoteArrays(callback) {
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
    let range = [];
    console.log(this.state.votes)
    if (this.state.votes !== undefined) {
    console.log(this.state.votes[`question${question.Question_Id}votes`][question.Question_Id])
    for (let i = -5; i < 6; i++) {
      range.push(<label key={`alt${alternative.Alternative_Id}options${i}`}>
        <input
        key={`question${question.Question_Id}alt${alternative.Alternative_Id}`}
        type="radio"
        value={i}
        checked={this.state.votes[`question${question.Question_Id}votes`][alternative.Alternative_Id].value === i}
        onChange={event => {this.handleRangeChange(event, question.Question_Id,
                                                          alternative.Alternative_Id)}}
        />
        {i}
        </label>)
      }
      return range;
    } else{
      return("The election did not load or something")
    }
  };

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
     hasLoaded() {
      return(this.state.election.map(elect => {
      return(
        <div>
        <p>MORRADI</p>
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
        }))}

     hasNotLoaded() {
        return("The election is being loaded")
        }

     conditionalRender() {
      if (this.state.loadingFinished === true) {
      return this.hasLoaded();
    } else {
      return this.hasNotLoaded();
    }
  }
  render() {
  return(
    // Renders Election by looping through state.election
      <div>
        {this.conditionalRender()}
        </div>
      )}
}
export default Vote
