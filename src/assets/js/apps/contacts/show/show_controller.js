(function() {
  ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    return Show.Controller = {
      showContact: function(id) {
        var contact, contactView;
        contact = ContactManager.request("contact:entity", id);
        contactView = void 0;
        if (contact !== void 0) {
          contactView = new Show.Contact({
            model: contact
          });
        } else {
          contactView = new Show.MissingContact;
        }
        return ContactManager.mainRegion.show(contactView);
      }
    };
  });

}).call(this);
