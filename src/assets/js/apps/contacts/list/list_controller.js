(function() {
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    return List.Controller = {
      listContacts: function() {
        var fetchingContacts;
        fetchingContacts = ContactManager.request('contact:entities');
        return $.when(fetchingContacts).done(function(contacts) {
          var contactsListView;
          contactsListView = new List.Contacts({
            collection: contacts
          });
          contactsListView.on('childview:contact:delete', function(childView, model) {
            return model.destroy();
          });
          contactsListView.on('childview:contact:show', function(childView, model) {
            return ContactManager.trigger("contact:show", model.get("id"));
          });
          return ContactManager.mainRegion.show(contactsListView);
        });
      }
    };
  });

}).call(this);
