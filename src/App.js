import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: "p1", name: 'Max', age: 28 },
      { id: "p123", name: 'Flavio', age: 27 },
      { id: "p3441", name: 'Stephanie', age: 35 }
    ]
  }

  nameChangedHandler = (event, id)  => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
    
  }

  deletePersonHandler = (personIndex) => {
   // const persons = this.state.persons.slide(); // creates a copy of persons array before manipulating it with out splice it would only be a pointer to th original array wich could cause future problems
    const persons = [...this.state.persons]; // spreads out the elements of state.persons array creates a list of elements and adds them to the new array
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
          <div>
            {this.state.persons.map((person, index) => {
              return <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age} 
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
            })}
          </div> 
      );
    } 

    return (
      <div className="App">
        <h1> Hi, Iam a React App</h1>
        <p>This is Really working </p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>

        {persons}
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
