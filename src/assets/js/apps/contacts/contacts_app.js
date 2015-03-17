(function() {
  ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
    var API;
    ContactsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "contacts": "listContacts",
        "contacts/:id": "showContact",
        "contacts/:id/edit": "editContact"
      }
    });
    API = {
      listContacts: function() {
        return ContactsApp.List.Controller.listContacts();
      },
      showContact: function(id) {
        return ContactsApp.Show.Controller.showContact(id);
      },
      editContact: function(id) {
        return ContactsApp.Edit.Controller.editContact(id);
      }
    };
    ContactManager.on('contacts:list', function() {
      ContactManager.navigate('contacts');
      return API.listContacts();
    });
    ContactManager.on('contact:show', function(id) {
      ContactManager.navigate("contacts/" + id);
      return API.showContact(id);
    });
    ContactManager.on('contact:edit', function(id) {
      ContactManager.navigate("contacts/" + id + "/edit");
      return API.editContact(id);
    });
    return ContactManager.addInitializer(function() {
      return new ContactsApp.Router({
        controller: API
      });
    });
  });

}).call(this);
