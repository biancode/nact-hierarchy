# nact-hierarchy

The application we made in the [querying section](https://github.com/biancode/nact-query) isn't very useful. For one it only supports a single user's contacts, and secondly it forgets all the user's contacts whenever the system restarts. In this section we'll solve the multi-user problem by exploiting an important feature of any blue-blooded actor system: [the hierarchy](https://nact.io/en_uk/lesson/javascript/hierarchy).

## API

### RESTClient

  https://addons.mozilla.org/en-US/firefox/addon/restclient/

### GET contacts

  curl -X GET -i http://localhost:3000/api/:userId/contacts

  curl -X GET -i http://localhost:3000/api/:userId/contacts/:id

### POST contacts

  curl -X POST -H 'Content-Type: application/json' -i http://localhost:3000/api/:userId/contacts --data '{"name": "Test", "surname": "User"}'

### PATCH contacts

  curl -X PATCH -H 'Content-Type: application/json' -i http://localhost:3000/api/:userId/contacts/:id --data '{"company": "Bianco Royal"}'

### Hints

* the :id has to be replaced with the UUID of a contact record 
* the :userId has to be replaced with the id of the user of a contact request

## License
MIT - [Klaus Landsdorf](http://bianco-royal.de/)