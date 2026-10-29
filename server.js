const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'contacts.json');

const sampleContacts = [
  {
    id: 'sample-1',
    name: 'Alicia Brown',
    email: 'alicia@gmail.com',
    phone: '+1 (415) 555-2839',
    company: 'Northwind Labs',
    notes: 'Client follow-up on Tuesday.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'sample-2',
    name: 'Marcus Lee',
    email: 'marcus.lee@gmail.com',
    phone: '+1 (206) 555-7712',
    company: 'Skyline Studio',
    notes: 'Needs a pricing update.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    const fileData = await fs.readFile(DATA_FILE, 'utf8');
    if (!fileData.trim()) {
      await fs.writeFile(DATA_FILE, JSON.stringify(sampleContacts, null, 2));
    }
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify(sampleContacts, null, 2));
  }
}

async function readContacts() {
  await ensureDataFile();
  const fileData = await fs.readFile(DATA_FILE, 'utf8');
  const contacts = JSON.parse(fileData);
  return Array.isArray(contacts) ? contacts : [];
}

async function writeContacts(contacts) {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2));
}

function validateContactPayload(payload) {
  const { name, email, phone } = payload;

  if (!name || !name.trim()) {
    return 'Name is required.';
  }

  if (!email || !email.trim()) {
    return 'Email is required.';
  }

  if (!phone || !phone.trim()) {
    return 'Phone number is required.';
  }

  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailCheck.test(email.trim())) {
    return 'Please enter a valid email address.';
  }

  return null;
}

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await readContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Unable to load contacts.' });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const payload = req.body || {};
    const validationError = validateContactPayload(payload);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const contacts = await readContacts();
    const now = new Date().toISOString();
    const newContact = {
      id: `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      company: payload.company ? payload.company.trim() : '',
      notes: payload.notes ? payload.notes.trim() : '',
      createdAt: now,
      updatedAt: now
    };

    contacts.unshift(newContact);
    await writeContacts(contacts);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create contact.' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const payload = req.body || {};
    const validationError = validateContactPayload(payload);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    const updatedContact = {
      ...contacts[index],
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      company: payload.company ? payload.company.trim() : '',
      notes: payload.notes ? payload.notes.trim() : '',
      updatedAt: new Date().toISOString()
    };

    contacts[index] = updatedContact;
    await writeContacts(contacts);
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update contact.' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contacts = await readContacts();
    const filtered = contacts.filter((contact) => contact.id !== req.params.id);

    if (filtered.length === contacts.length) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    await writeContacts(filtered);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete contact.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Gmail Phone Tracker is running on http://localhost:${PORT}`);
});
