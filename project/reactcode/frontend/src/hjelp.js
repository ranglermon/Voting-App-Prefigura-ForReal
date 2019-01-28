import React from "react"
import './App.css';

class App extends React.Component {
	render() {
		return <div>
		<h1> Ey for Real maaaan </h1>
		<Form />
		</div>
	}
}

class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cats:[{name:"", age:""}]
		}
	}
	addCat = (e) => {
		this.setState((prevState) => ({
			cats: [...prevState.cats, {name:"", age:""}]
		}));
	}
	handleSubmit = (e) => {
		e.preventDefault()
	}
	handleChange = (e) => {
		if (["name", "age"].includes(e.target.className) ) {
			let cats = [...this.state.cats]
			cats[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
			this.setState({ cats }, () => console.log(this.state.cats))	
		} else {
			this.setState({ [e.target.name]: e.target.value.toUpperCase() })
		}
	}
  
  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label htmlFor="owner">Owner</label> 
        <input type="text" name="owner" id="owner" />
        <label htmlFor="description">Description</label> 
        <input type="text" name="description" id="description" />
		<button onClick={this.addCat}>Add new cat</button>
		{
			this.state.cats.map((val, idx) => {
				let catId = `cat-${idx}`, ageId =`age-${idx}`
				return (
				<div key={idx}>
					<label htmlFor={catId}>{`Cat #${idx +1}`}</label>
					<input
						type="text"
						name={catId}
						data-id={idx}
						id={catId}
						className="name"
						/>
					<label htmlFor={ageId}>Age</label>
					<input
						type="text"
						name={ageId}
						data-id={idx}
						className="age"
						/>
						</div>
				)
			})
			}
        <input type="submit" value="Submit" /> 
      </form>
    )
  }
}
export default App