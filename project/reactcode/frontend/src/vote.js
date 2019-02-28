import React from "react"

// Hvis ikke votes er oppretta, call den funksjonen som lager den, dette blir i praksis en infinte loop, helt til problemet er løst :D

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
      this.ApiCall = this.fetchCall.bind(this);
      this.getApiInformation = this.getApiInformation.bind(this);
      this.makeVoteArrays = this.makeVoteArrays.bind(this);
      this.makeVoteObjects = this.makeVoteObjects.bind(this);
    //  this.fetchQuestions = this.fetchQuestions.bind(this);
    }
    //Methods related to Api calls

    async fetchCall(arg) {
      console.log("Does the fetch even happen?")
      await fetch(`http://127.0.0.1:8000/api/${arg}/?search=${this.state.djangoArgument}`)
        .then(response => {
          console.log("Does the fetch 33333 even happen?")
        if (response.status !== 200) {
          console.log(`Failed to load ${arg} from our server`);
        } else {
        console.log(`${arg} success`);
        return response.json();
      }
      })
      .then(data => {this.setState({[arg] : data})
    },
      fail => {return("Fail!")}
    )
    };

 getApiInformation() {
   const prom1 = this.fetchCall("election");
   const prom2 = this.fetchCall("alternatives");
   const prom3 = this.fetchCall("questions");

    Promise.all([prom1, prom2, prom3]).then(something => {
    this.makeVoteArrays(this.makeVoteObjects);
    console.log("Dette skal kjøre til slutt for faen")})
}
  componentDidMount() {
  this.getApiInformation();
  }

handleRangeChange(event, Question_Id, Alternative_Id) {
  let currentState = this.state.votes
  currentState[`question${Question_Id}votes`]
  [Alternative_Id].Vote_Value = parseInt(event.target.value);
    this.setState({votes: currentState});
}

handleMajorityChange(event, Question_Id, Alternative_Id) {
  let currentState = this.state.votes
  currentState[`question${Question_Id}votes`].map(makeZero => {
    makeZero.Vote_Value = 0
  })
  currentState[`question${Question_Id}votes`]
  [Alternative_Id].Vote_Value = 1;
    this.setState({votes: currentState})
}

handleApprovalChange(event, Question_Id, Alternative_Id) {
  let currentState = this.state.votes
  console.log("dick" + event.target.value)

  if (currentState[`question${Question_Id}votes`]
      [Alternative_Id].Vote_Value  === 1) {
        currentState[`question${Question_Id}votes`]
        [Alternative_Id].Vote_Value = 0;

      } else {
        currentState[`question${Question_Id}votes`]
        [Alternative_Id].Vote_Value = 1;
      }

    this.setState({votes: currentState})
}

handleSubmit(questionId) {

  const post = (url, postdata) => {
    fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(postdata),
    })
    .then(response => response.json())}


  let votesToSubmit = []

  this.state.votes[`question${questionId}votes`].map(vote => {
    votesToSubmit.push(vote)
    console.log(vote)
  });
  console.log(votesToSubmit)
  post("http://127.0.0.1:8000/api/votes/", votesToSubmit);


}

makeVoteObjects () {
  console.log("Does this run?")
  let altToStateArray = {}

  this.state.questions.map(question => {
    console.log("does this run 1")
    let questionToArray = [];
    this.state.alternatives.map(alt => {
      if (alt.Question_Id === question.Question_Id) {
        console.log("Does this run? 2")
        const voteObject = {
          Question_Id: question.Question_Id,
          Vote_Owner: "test",
          Election_Id: this.state.djangoArgument,
          Alternative_Id: alt.Alternative_Id,
          Vote_Value: 0 };
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
        return this.majorityElection(question)
      }
      else {
        return this.approvalElection(question)
      }
    }

  getRange(question, alternative) {
    let range = [];
    console.log(this.state.votes)
    if (this.state.votes !== undefined) {
    console.log(this.state.votes[`question${question.Question_Id}votes`]
      [question.Question_Id])
    for (let i = -5; i < 6; i++) {
      range.push(<label key={`alt${alternative.Alternative_Id}options${i}`}>
        <input
        key={`question${question.Question_Id}alt${alternative.Alternative_Id}`}
        type="radio"
        value={i}
        checked={this.state.votes[`question${question.Question_Id}votes`]
                [alternative.Alternative_Id].Vote_Value === i}
        onChange={
          event => {this.handleRangeChange(event, question.Question_Id,
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

    majorityElection(question) {
      return this.state.alternatives.map(alt => {
        if (alt.Question_Id === question.Question_Id) {
          return(
            <label>
              {alt.Alternative_Wording}
              <input
              key = {`question${question.Question_Id}alt${alt.Alternative_Id}`}
              type="radio"
              checked = {this.state.votes[`question${question.Question_Id}votes`]
              [alt.Alternative_Id].Vote_Value === 1}
              onChange= {event => {this.handleMajorityChange(event,
                        question.Question_Id, alt.Alternative_Id)}}
               />
               <br />
            </label>
          )

        }
      })
    }

    approvalElection(question) {
    return this.state.alternatives.map(alt => {
      if (alt.Question_Id === question.Question_Id) {
        return(
          <label>
            {alt.Alternative_Wording}
            <input
            key = {`question${question.Question_Id}alt${alt.Alternative_Id}`}
            name = {alt.Alternative_Wording}
            type="checkbox"
            checked = {this.state.votes[`question${question.Question_Id}votes`]
            [alt.Alternative_Id].Vote_Value === 1}
            onChange= {
              event => {this.handleApprovalChange(event,
              question.Question_Id, alt.Alternative_Id)}}
             />
             <br/>
          </label>
        )

      }
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
            <button
              onClick={x => {this.handleSubmit(question.Question_Id)}}
              type="button">
                Submit vote
            </button>
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

  testclick() {
    this.setstate({loadingFinished: false})
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
