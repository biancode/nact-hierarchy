#!/usr/bin/env node

/* The MIT License

Copyright (C) 2019 Bianco Royal Software Innovations(R)
      Inh. Klaus Landsdorf (http://bianco-royal.de/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const coreServices = require('./core/services');
const nact = require('nact');
const parentActor = nact.start();
const contactsService = coreServices.service.contactsService(parentActor);

const performQuery = async (msg, res) => {
  try {
    const result = await nact.query(contactsService, msg, 500);
    switch (result.type) {
      case coreServices.service.ContactProtocolTypes.SUCCESS:
        res.json(result.payload);
        break;
      case coreServices.service.ContactProtocolTypes.NOT_FOUND:
        res.sendStatus(404);
        break;
      default:
        console.error(JSON.stringify(result));
        res.sendStatus(500);
        break;
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(504);
  }
};

app.use(bodyParser.json());

app.get('/api/:user_id/contacts', (req, res) =>
  performQuery({ type: coreServices.service.ContactProtocolTypes.GET_CONTACTS, userId: req.params.user_id }, res)
);

app.get('/api/:user_id/contacts/:contact_id', (req, res) =>
  performQuery({ type: coreServices.service.ContactProtocolTypes.GET_CONTACT, userId: req.params.user_id, contactId: req.params.contact_id }, res)
);

app.post('/api/:user_id/contacts', (req, res) =>
  performQuery({ type: coreServices.service.ContactProtocolTypes.CREATE_CONTACT, userId: req.params.user_id, payload: req.body }, res)
);

app.patch('/api/:user_id/contacts/:contact_id', (req, res) =>
  performQuery({ type: coreServices.service.ContactProtocolTypes.UPDATE_CONTACT, userId: req.params.user_id, contactId: req.params.contact_id, payload: req.body }, res)
);

app.delete('/api/:user_id/contacts/:contact_id', (req, res) =>
  performQuery({ type: coreServices.service.ContactProtocolTypes.REMOVE_CONTACT, userId: req.params.user_id, contactId: req.params.contact_id }, res)
);

app.listen(process.env.PORT || 3000, function () {
  console.log(`Address book listening on port ${process.env.PORT || 3000}!`);
});
