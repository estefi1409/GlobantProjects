import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <div>
            <Navigation />
            <Route exact path="/" component={Home} />
            <Route exact path="/contactlist" component={ContactListSection} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const Navigation = (props) => {
  return (
    <nav>
      <ul>
        <li><Link to={`/`}> HOME </Link></li>
        <li><Link to={`/contactlist`}> CONTACT LIST </Link></li>  
      </ul>
    </nav>
  );
}

const Home = (props) => {
  return (
    <div className="Home">
      <a>Welcome to my contact page</a>
    </div>
  );
}

class ContactListSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactArray: [],
      favoritesArray: []
    };

    this.addContactToOpositeSection = this.addContactToOpositeSection.bind(this);
    this.removeContactFromList = this.removeContactFromList.bind(this);
  }

  addContactToOpositeSection(contact) {
    if(this.state.contactArray.includes(contact)){
      this.setState({
        contactArray: this.state.contactArray.filter(c => c.login.uuid !== contact.login.uuid),
        favoritesArray: this.state.favoritesArray.concat(contact)
      });
    }
    if(this.state.favoritesArray.includes(contact)){
      this.setState({
        contactArray: this.state.contactArray.concat(contact),
        favoritesArray: this.state.favoritesArray.filter(f => f.login.uuid !== contact.login.uuid) 
      });
    }
  }

  removeContactFromList(contact) {
    if(this.state.contactArray.includes(contact)){
      const users = this.state.contactArray.filter(function (e) { return e.login.uuid !== contact.login.uuid });
      this.setState({ contactArray: users });
    }
    if(this.state.favoritesArray.includes(contact)){
      const users = this.state.favoritesArray.filter(function (e) { return e.login.uuid !== contact.login.uuid });
      this.setState({ favoritesArray: users });
    }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=10')
      .then(results => results.json())
      .then(data => {
        this.setState({
          contactArray: data.results
        });
      });
  }

  render() {
    return (
      <div className="App">{}
        <ContactList className="Contactos" contacts={this.state.contactArray}
          title="Contact List"
          key="1"
          addContactToOpositeSection={this.addContactToOpositeSection}
          removeContactFromList={this.removeContactFromList} />
        <ContactList className="Favoritos" contacts={this.state.favoritesArray}
          title="My Favourites"
          key="2"
          addContactToOpositeSection={this.addContactToOpositeSection}
          removeContactFromList={this.removeContactFromList} />
      </div>
    );
  }
}

const ContactList = (props) => {
  return (
    <div className={props.className}>
      <h2>{props.title}</h2>
      {props.contacts.map(contact => <ContactCard key={contact.name.first}
        contact={contact} addContactToOpositeSection={props.addContactToOpositeSection}
        removeContactFromList={props.removeContactFromList} />)}
    </div>
  );
};

ContactList.propTypes = {
  addContactToOpositeSection: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

ContactList.defaultProps = {
  title: 'Titulo'
};

class ContactCard extends React.Component {
  constructor(props) {
    super(props);

    this.onClickSendComponent = this.onClickSendComponent.bind(this); 
    this.onClickRemove = this.onClickRemove.bind(this);
  }

  onClickSendComponent() {    
    this.props.addContactToOpositeSection(this.props.contact);
  }

  onClickRemove() {
    this.props.removeContactFromList(this.props.contact);
  }

  render() {
    return (
      <div className="contact-card-All">
        <figure>
          <img src={this.props.contact.picture.medium} alt="Autor" />
          <figcaption>{this.props.contact.name.first} {this.props.contact.name.last} <br /> {this.props.contact.email}</figcaption>
        </figure>
        <button onClick={this.onClickSendComponent} >Favourite</button>
        <button onClick={this.onClickRemove}>Delete</button>
      </div>
    );
  }
}

export default App;