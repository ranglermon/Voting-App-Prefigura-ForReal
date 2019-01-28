import React from "react"
import './App.css';

class ElectionForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		Description: "", 
		Election_ID: "KKd38",
		Questions: [{electionMethod: "", questionWording: "", key: 0 , alternatives: [{alternativeWording: "", key: 0 }]}]
		}
	}
	
	handleDescChange = (event) => {
		this.setState({Description: event.target.value});
	}
	
	handleQuestionWordingChange = (event, key) => {
		let QuestionArray = this.state.Questions
		QuestionArray[key].questionWording = event.target.value
		this.setState(QuestionArray)
	}
	
	handleQuestionMethodChange  = (event, key) => {
		var array = this.state.Questions
		var object = array[key]
		object.electionMethod = event.target.value		
		this.setState({})
	} 

	AddAlternative(key) {
		let questionArray = this.state.Questions
		let altArray = this.state.Questions[key].alternatives
		altArray.push({alternativeWording: "", key : this.state.Questions[key].alternatives.length})
		questionArray[key].alternatives = altArray
		this.setState({Questions: questionArray})
	}
	RemoveAlternative(key) {
		let questionArray = this.state.Questions
		let altArray = this.state.Questions[key].alternatives
		altArray.pop()
		questionArray[key].alternatives = altArray
		this.setState({Questions: questionArray})
		
	}
	activateElection() {
		console.log("Yo!")
	}
	
	handleAlternativeWordingChange(event, QuestionKey, AlternativeKey) {
		let QuestionArray = this.state.Questions
		let AlternativeChanged = this.state.Questions[QuestionKey].alternatives[AlternativeKey]
		AlternativeChanged.alternativeWording = event.target.value
		QuestionArray[QuestionKey].alternatives[AlternativeKey] = AlternativeChanged
		this.setState({Questions: QuestionArray}) 
	}
	addKey(prevState) {
		if (prevState.Questions[prevState.Questions.length - 1]) {
			return prevState.Questions[prevState.Questions.length - 1].key + 1
		} else {return 0}
	}
 	AddQuestion()  {
		this.setState((prevState) => ({
      Questions: [...prevState.Questions, 
	  {	electionMethod: "", 
		questionWording: "", 
		key: this.addKey(prevState) , 
		alternatives: [{alternativeWording: "", key: 0 }]}],
    }));
	
	}
	RemoveQuestion() {
		let arr = this.state.Questions
		arr.pop()
		this.setState({Questions: arr})
	}
	handleSubmit() {
		const election = {}
		election.Description = this.state.Description
		election.Election_Id = this.state.Election_ID
		const questionsToSubmit = []
		const alternativesToSubmit = []
		this.state.Questions.map(x => {
			const questionObject = {}
			questionObject.Question_Id = x.key
			questionObject.Question_Wording = x.questionWording
			questionObject.Election_Method = x.electionMethod
			questionObject.Election_Id = this.state.Election_ID
			questionsToSubmit.push(questionObject)
			x.alternatives.map(y => {
				const altobject = {}
				altobject.Alternative_Wording = y.alternativeWording
				altobject.Question_Id = x.key
				altobject.Alternative_Id = y.key
				altobject.Election_Id = this.state.Election_ID 
				alternativesToSubmit.push(altobject)
				
			})
		})  
		console.log(alternativesToSubmit)
		console.log(questionsToSubmit)
		console.log(election)
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
		
		post("http://127.0.0.1:8000/api/elections/", [election])
		post("http://127.0.0.1:8000/api/alternatives/", alternativesToSubmit)
		post("http://127.0.0.1:8000/api/questions/", questionsToSubmit)
		
	}
	
	AlternativeMethod(key) {
		return this.state.Questions[key].alternatives.map(x => {
			return (<label>
			Alternative {x.key + 1}
				<input onChange={(event) => this.handleAlternativeWordingChange(event,key, x.key)} />
			</label>) 
		})
	}
			
	QuestionMethod(key) {
		return (<div key={key }>
		<h2>Question {key + 1 }</h2>
		<p> Choose The Election Method </p>
			<label>Majority
				<input  
				type ="radio"
				value = "Majority"
				checked={this.state.Questions[key].electionMethod === "Majority"} 
				onChange={(event) => this.handleQuestionMethodChange(event, key)} />		
				</label>
				
			<label>Range
				<input  
				type ="radio"
				value = "Range"
				checked={this.state.Questions[key].electionMethod === "Range"} 
				onChange={(event) => this.handleQuestionMethodChange(event, key)} />		
				</label>
				
			<label>Approval
				<input  
				type ="radio"
				value = "Approval"
				checked ={this.state.Questions[key].electionMethod === "Approval"}
				onChange ={(event) => this.handleQuestionMethodChange(event, key)} />		
				</label>
							<br />
			<label>
			Question Wording
			<input onChange={(event) => {this.handleQuestionWordingChange(event, key)}} />
			</label>
			
			<button type="button" onClick={() => {this.AddAlternative(key)}}>Add Alternative</button>
			<button type="button" onClick={() => {this.RemoveAlternative(key)}}>Remove Alternative</button>
				{this.AlternativeMethod(key)}
			</div>)
	}
		
	render() {
		let questionArray = [];
		for (let x; this.state.NumberOfQuestions > x; x++) {
				questionArray.push(<h1>Yo!</h1>);
		};
		return ( <div>
		<form>
		<label>
			Describe the Election and it's contents
			<input onChange={this.handleDescChange} />
		</label>
		
		<button type="button" onClick={() => {this.AddQuestion()}}>Add Question</button>
		<button type="button" onClick={() => {this.RemoveQuestion()}}>Remove Question</button>		
		<button type="button">Activate election</button>>
		
		{this.state.Questions.map(x => {
				return this.QuestionMethod(x.key)
			})}
					
		<button type="button" onClick={() => this.handleSubmit()}>Create election</button>

				</form>
			

		</div>)
	}
	
}

 
class CreateElection extends React.Component {
	render() {
		return (<div>
		<h1>Lets make an election!</h1>
		<ElectionForm /> 
		
		</div>)
	}
}



export default CreateElection