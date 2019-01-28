import React from "react"
import App from './App.js';

class GenerateMajorityForm extends React.Component {
	constructor(props) {
		super(props);
		//State contains which alternative is selected.
		this.state = {value: ""}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
		//Handles change of state, aka what alternative is currently selected
		handleChange(event) {
			this.setState({value: event.target.value});
		}
		//Creates vote objects for each alternative, the alternative selected by the user, recieves 1 as value, the rest 0
		handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.djangoArgument)
		const data =  this.state.value;
		//Modularized post function 
		const postObject = (postData) => { fetch("http://127.0.0.1:8000/api/votes/", {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(postData),
	 	})
		.then(response => response.json())
		}
		//Defines the POST request for the alternative the user wants to vote for
		const requestSelectedAlternative = [{
			"Vote_Owner": "test",
			"Alternative_Voted_On": data,
			"Vote_Value": "1",
			"Election_Id": this.props.djangoArgument,
			"Election_Method": "Majority"
		}]
		console.log(JSON.stringify(data));
		//The actual post of the selected element
		 postObject(requestSelectedAlternative)
		//Defines the POST request for the other alternatives
		this.props.alternatives.map(alt => {
			if (alt.Alternative_Wording != data){
			const requestUnSelectedAlternative = [{
			"Vote_Owner": "test",
			"Alternative_Voted_On": alt.Alternative_Wording,
			"Vote_Value": "0",
			"Election_Id": this.props.djangoArgument,
			"Election_Method": "Majority"
			}]
			
			return postObject(requestUnSelectedAlternative)
			}})
		
		};
		
	
	render() {
	let alternativeList = []
	let x;
	this.props.alternatives.map(alt => {
		alternativeList.push(alt)
	})
	
	return(
	<div>
	<form onSubmit={this.handleSubmit}> 
	{alternativeList.map((alt, key) => {
		return(
			<label key={key} >
				<input  
				type="radio"
				key={key}
				value={alt.Alternative_Wording}  
				checked={this.state.value === alt.Alternative_Wording} 
				onChange={this.handleChange} />
				{alt.Alternative_Wording}
			</label>
	)
	})}
<button>Submit Vote</button>
	</form>
	</div>
	)
	}
	};
	
export default GenerateMajorityForm