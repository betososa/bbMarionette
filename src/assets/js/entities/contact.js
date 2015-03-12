(function() {
  ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {
    var API, contacts, initializeContacts;
    Entities.Contact = Backbone.Model.extend({});
    Entities.ContactCollection = Backbone.Collection.extend({
      model: Entities.Contact,
      comparator: "firstName"
    });
    contacts = void 0;
    initializeContacts = function() {
      return contacts = new Entities.ContactCollection([
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
    };
    API = {
      getContactEntities: function() {
        if (contacts === void 0) {
          initializeContacts();
        }
        return contacts;
      }
    };
    return ContactManager.reqres.setHandler('contact:entities', function() {
      return API.getContactEntities();
    });
  });

}).call(this);
