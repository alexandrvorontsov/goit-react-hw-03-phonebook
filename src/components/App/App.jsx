import React, { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactLisxt';
import Filter from '../Filter/Filter';
import {Phonebook} from './App.styled'

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+1 459-124-5683' },
      { id: 'id-2', name: 'Hermione Kline', number: '+1 443-893-1294' },
      { id: 'id-3', name: 'Eden Clements', number: '+1 645-172-7959' },
      { id: 'id-4', name: 'Annie Copeland', number: '+1 227-911-2655' },
    ],
    filter: ''   
  };

  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  addContacts = data => {
    const { contacts } = this.state;
    const { name } = data;
    const isContactExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExist) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  handleFilter = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDelete = evt => {
    const { contacts } = this.state;
    const elementToRemove = evt.currentTarget.parentNode.id;
    this.setState({
      contacts: contacts.filter(contact => contact.id !== elementToRemove),
    });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    this.setState({
      ...this.state,
      contacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

    return (
      <Phonebook>
        <h1>Phonebook</h1>
        <ContactForm addContacts={this.addContacts} />
        <h2>Filter</h2>
        <Filter filter={filter} onChange={this.handleChange} />
        <h2>Contacts</h2>
        <ContactList
          getContacts={this.handleFilter()}
          deleteContact={this.handleDelete}
        />
      </Phonebook>
    );
  }
}
