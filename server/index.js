const express = require('express');
const fetch = require('node-fetch');
const Imap = require('imap')
const inspect = require('util').inspect;

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.get('/api/location', (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: 'Missing required parameter `q`'
    });
    return;
  }

  fetch(`http://api.geonames.org/searchJSON?q=${param}&maxRows=10&username=dimagi`)
    .then(res => res.json())
    .then(json => res.json(json));
});

app.post('/api/userlocations', (req, res) => {
  console.log(req.body);
});

let imap = new Imap({
  user: 'tylerdimagitest@gmail.com',
  password: 'Dimagi1!',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: {
    rejectUnauthorized: false
  }
});

imap.once('ready', () => {
  imap.openBox('INBOX', true, (err, box) => {
    if (err) throw err;
    var f = imap.seq.fetch('1:3', {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    });

    f.on('message', (msg, seqno) => {
      console.log(`Message #${seqno}`);
      msg.once('body', (stream, info) => {
        let buffer = '';
        stream.on('data', chunk => {
          buffer += chunk.toString('utf8');
        });
        console.log(inspect(Imap.parseHeader(buffer)));
      });
    });
  });
});

imap.once('error', function(err) {
  console.log(err);
});

imap.connect();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});