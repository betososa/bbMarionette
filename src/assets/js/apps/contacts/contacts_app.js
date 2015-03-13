(function() {
  ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    var API;
    ContactsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "contacts": "listContacts"
      }
    });
    API = {
      listContacts: function() {
        console.log("si lo lees esta bien :)");
        return ContactsApp.List.Controller.listContacts();
      }
    };
    ContactManager.on('contacts:list', function() {
      ContactManager.navigate('contacts');
      return API.listContacts();
    });
    return ContactManager.addInitializer(function() {
      return new ContactsApp.Router({
        controller: API
      });
    });
  });

}).call(this);
