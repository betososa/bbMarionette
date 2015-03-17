(function() {
  ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    return Show.Controller = {
      showContact: function(id) {
        var fetchingContact, loadingView;
        loadingView = new ContactManager.Common.Views.Loading;
        ContactManager.mainRegion.show(loadingView);
        fetchingContact = ContactManager.request("contact:entity", id);
        return $.when(fetchingContact).done(function(contact) {
          var contactView;
          contactView = void 0;
          if (contact !== void 0) {
            contactView = new Show.Contact({
              model: contact
            });
            contactView.on("contact:edit", function(contact) {
              return ContactManager.trigger("contact:edit", contact.get("id"));
            });
          } else {
            contactView = new Show.MissingContact;
          }
          return ContactManager.mainRegion.show(contactView);
        });
      }
    };
  });

}).call(this);
