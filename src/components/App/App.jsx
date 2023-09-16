import React, { Component } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactLisxt';
import Filter from '../Filter/Filter';
import { Phonebook, MessageDelete, MessageCreate } from './App.styled';

const LS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isDelete: false,
    isCreate: false,
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
    this.setState({ ...this.state, contacts });
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount');}

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));

    if (prevState.contacts.length < this.state.contacts.length) {
      this.setState({ isCreate: true });
      setTimeout(() => {
        this.setState({ isCreate: false });
      }, 1000);
    }

    if (prevState.contacts.length > this.state.contacts.length) {
      this.setState({ isDelete: true });
      setTimeout(() => {
        this.setState({ isDelete: false });
      }, 1000);
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
        {this.state.isDelete && (
          <MessageDelete>Contact delete successfullly!</MessageDelete>
        )}
        {this.state.isCreate && (
          <MessageCreate>Contact create successfullly!</MessageCreate>
        )}
      </Phonebook>
    );
  }
}
