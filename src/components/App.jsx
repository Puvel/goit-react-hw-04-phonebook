import { useState, useEffect } from 'react';
import { Section } from 'components/section/Section';
import { ContactForm } from 'components/contactForm/ContactForm';
import { ContactsList } from 'components/contactsList/ContactsList';
import { Filter } from 'components/filter/Filter';

const contactsArrey = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || contactsArrey
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getContactInfo = newContact => {
    setContacts(contacts => [...contacts, newContact]);
  };

  const filterInput = e => {
    setFilter(e.target.value);
  };

  const contactsFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = e => {
    const id = e.target.id;
    setContacts(contacts => [...contacts.filter(contact => contact.id !== id)]);
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm getContactInfo={getContactInfo} contacts={contacts} />
      </Section>
      <Section title="Contacts">
        {!!contacts.length && (
          <Filter filter={filter} filterInput={filterInput} />
        )}
        <ContactsList
          contacts={contactsFilter()}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
