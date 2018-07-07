import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import contacts from './contacts';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contactList: contacts.slice(0, 5)
    }
  }

  displayContacts() {
    let result = [];
    for (let i = 0; i < this.state.contactList.length; i++) {
      result.push(
        <ContactRow
          key={i}
          contact={this.state.contactList[i]}
          onClickDelete={() => { this.deleteContact(i) }}
        />
      )
    }
    return result;
  }

  addNewRandomContact() {
    let newContactList = this.state.contactList;
    console.log("AddNewRandomContact", newContactList)
    newContactList.push(contacts[Math.floor
      (Math.random() * contacts.length)])
    this.setState({
      contactList: newContactList
    })
  }

  sortContacts(field) {
    console.log("sortContacts", field)
    let newContactList = this.state.contactList;
    newContactList.sort((a, b) => {
      return a[field] > b[field] ? -1 : 1;
    });
    this.setState({
      contactList: newContactList
    })
  }

  deleteContact(index) {
    console.log("deleteContact")
    let newContactList = this.state.contactList;
    newContactList.splice(index, 1)
    this.setState({
      contactList: newContactList
    })
  }

  render() {
    return (
      <div>
        <h1>Iron-Contacts</h1>
        {console.log(this.state)}
        <AddNewRandomContactButton onClick={() => { this.addNewRandomContact() }} />
        <SortButton field="name" onClick={(field) => { this.sortContacts(field) }} />
        <SortButton field="popularity" onClick={(field) => { this.sortContacts(field) }} />
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {this.displayContacts()}
          </tbody>
        </table>
      </div>
    );
  }
}

class ContactRow extends React.Component {
  render() {
    return (
      <tr>
        <td><img src={this.props.contact.pictureUrl} alt="pic-url" /></td>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.popularity}</td>
        <button onClick={this.props.onClickDelete}>
        Delete
      </button>
      </tr>
    )
  }
}

class AddNewRandomContactButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        Add Random Contact</button>
    )
  }
}

class SortButton extends React.Component {
  render() {
    return (
      <button onClick={() => { this.props.onClick(this.props.field) }}>
        Sort By {this.props.field}</button>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

