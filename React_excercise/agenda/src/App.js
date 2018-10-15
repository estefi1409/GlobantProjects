import React, { Component } from 'react';
import './App.css';
//Clase inicial
class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      all:[],
      favorites: []
    };
  }

  componentDidMount(){
    fetch('https://randomuser.me/api/?results=10')
    .then(results => results.json())
    .then(data => {
      this.setState({
        all:data.results
      });
      console.log(this.state);
    });
  }
/*
  componentDidUpdate(){

  }

  componentWillUnmount(){

  }*/
//Declaro mis dos componentes
  render() {
    console.log(this.state);
    return (
      <div className="App">{}
      <ContactList className="Contactos" contacts={this.state.all} 
      title="Contact List" 
      key="1" />
      <ContactList className ="Favoritos" contacts ={this.state.favorites} 
      title= "My Favourites" 
      key="2" />
      </div>
    );
  }
}
//Este es un componente
const ContactList = (props) =>{
  return (
    <div className={props.className}>
      <h2>{props.title}</h2>
      { props.contacts.map(contact => <ContactCard key={contact.name.first}
      contact = {contact} />) }
    </div>
  );
};
//Clase que tiene el codigo html
class ContactCard extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="contact-card">
        <figure>
          <img src={this.props.contact.picture.medium} alt="Autor" />
          <figcaption>{this.props.contact.name.first} {this.props.contact.name.last} <br /> {this.props.contact.email}</figcaption>
          </figure>
          <button>Favourite</button>
          <button>Delete</button>
      </div>
    );

  }
}

export default App;
