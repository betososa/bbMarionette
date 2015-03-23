(function() {
  ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {
    var API, initializeContacts;
    Entities.Contact = Backbone.Model.extend({
      urlRoot: "contacts",
      defaults: {
        firstName: "",
        lastName: "",
        phoneNumber: ""
      },
      validate: function(attrs, options) {
        var errors;
        errors = {};
        if (!attrs.firstName) {
          errors.firstName = "cant be blank";
        }
        if (!attrs.lastName) {
          errors.lastName = "cant be blank";
        } else {
          if (attrs.lastName.length < 2) {
            errors.lastName = "is too short";
          }
        }
        if (!_.isEmpty(errors)) {
          return errors;
        }
      }
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
      return contacts.models;
    };
    API = {
      getContactEntities: function() {
        var contacts, defer, promise;
        contacts = new Entities.ContactCollection;
        defer = $.Deferred();
        contacts.fetch({
          success: function(data) {
            return defer.resolve(data);
          }
        });
        promise = defer.promise();
        return $.when(promise).done(function(contacts) {
          var models;
          if (contacts.length === 0) {
            models = initializeContacts();
            return contacts.reset(models);
          }
        });
      },
      getContactEntity: function(contactId) {
        var contact, defer;
        contact = new Entities.Contact({
          id: contactId
        });
        defer = $.Deferred();
        setTimeout((function() {
          return contact.fetch({
            success: function(data) {
              return defer.resolve(data);
            },
            error: function(data) {
              return defer.resolve(void 0);
            }
          });
        }), 2000);
        return defer.promise();
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
