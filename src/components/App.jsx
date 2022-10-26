import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from './contacts/ContactList';
import ContactForm from './form/ContactForm';
import { Filter } from './filter/Filter';
import css from './App.module.css';

document.title = 'PhonebookBox';

// список контактів
// const sampleContacts = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => parsedContacts ?? []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('contacts', contacts);
  }, [contacts]);

  function formSubmitHemdler({ name, number }) {
    const newContact = { id: nanoid(), name: name, number: number };

    if (contacts.find(contact => contact.name === name)) {
      return toast.warn(`${name} is alredy in contacts.`);
    }
    setContacts(prevState => [...prevState, newContact]);
    return toast.success(`${name} is added to the contact list`);
  }

  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));

    return toast.info('The contact has been deleted');
  }

  function handlerChangeFilter(evt) {
    setFilter(evt.currentTarget.value);
  }

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={css.phonebookBox}>
      <h1>Phonebook</h1>

      <ContactForm onSubmit={formSubmitHemdler} />
      <h2>Contacts</h2>
      <Filter onChange={handlerChangeFilter} />
      <ContactList contacts={filterContacts} onClick={deleteContact} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
