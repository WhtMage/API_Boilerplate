var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/item/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occured' })
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/item/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occured' })
      } else {
        res.send('Item ' + id + ' deleted!');
      }
    });
  });

  app.put('/item/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').update(details, note, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occured' })
      } else {
        res.send(item);
      }
    });
  });

  app.post('/item', (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').insert(note, (err, results) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(results.ops[0]);
      }
    })
  })
}