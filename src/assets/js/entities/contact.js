(function() {
  ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {
    var API, initializeContacts;
    Entities.Contact = Backbone.Model.extend({
      urlRoot: "contacts"
    });
    Entities.configureStorage(Entities.Contact);
    Entities.ContactCollection = Backbone.Collection.extend({
      url: "contacts",
      model: Entities.Contact,
      comparator: "firstName"
    });
    Entities.configureStorage(Entities.ContactCollection);
    initializeContacts = function() {
      var contacts;
      contacts = new Entities.ContactCollection([
        {
          id: 1,
          firstName: 'Alice',
          lastName: 'Arten',
          phoneNumber: '5566766'
        }, {
          id: 2,
          firstName: 'Bob',
          lastName: 'Brighman',
          phoneNumber: '21556567'
        }, {
          id: 3,
          firstName: 'Charlie',
          lastName: 'Campbell',
          phoneNumber: '988254'
        }
      ]);
      contacts.forEach(function(contact) {
        return contact.save();
      });
      return contacts;
    };
    API = {
      getContactEntities: function() {
        var contacts;
        contacts = new Entities.ContactCollection;
        contacts.fetch();
        if (contacts.length === 0) {
          return initializeContacts();
        }
        return contacts;
      },
      getContactEntity: function(contactId) {
        var contact;
        contact = new Entities.Contact({
          id: contactId
        });
        contact.fetch();
        return contact;
      }
    };
    ContactManager.reqres.setHandler('contact:entities', function() {
      return API.getContactEntities();
    });
    return ContactManager.reqres.setHandler('contact:entity', function(id) {
      return API.getContactEntity(id);
    });
  });

}).call(this);
