import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handlerChange(evt) {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  }

  function handlerSubmit(evt) {
    evt.preventDefault();
    const contact = { name: name, number: number };

    onSubmit(contact);

    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handlerSubmit} className={css.form}>
      <ul className={css.formList}>
        <li className={css.formListItem}>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handlerChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </li>
        <li>
          <p>Contact</p>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handlerChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </li>
      </ul>

      <button type="submit">Add contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
