import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const contactsPath = path.join('db', 'contacts.json');

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

export async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const result = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
}

export async function addContact(name, email, phone) {
  const contactsArr = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

  return newContact;
}
