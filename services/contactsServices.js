import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const contactsPath = path.join('db', '/contacts.json');

export async function listContacts() {
  const contactsArr = JSON.parse(
    await fs.readFile(contactsPath, { encoding: 'utf-8' })
  );

  return contactsArr;
}

export async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find(contact => contact.id === contactId);

  return contact || null;
}

export async function removeContactById(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const result = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
}

export async function addContact(body) {
  const contacts = await listContacts();

  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export async function updateContactById(id, data) {
  const contacts = await listContacts();

  const contactIndex = contacts.findIndex(contact => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  const contactToUpdate = contacts.find(contact => contact.id === id);
  contacts[contactIndex] = { id, ...contactToUpdate, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
}
