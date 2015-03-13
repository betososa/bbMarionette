(function() {
  ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.MissingContact = Marionette.ItemView.extend({
      template: '#missing-contact-view'
    });
    Show.Contact = Marionette.ItemView.extend({
      template: "#contact-view"
    });
    return Show.InvalidId = Marionette.ItemView.extend({
      template: "#invalid-id"
    });
  });

}).call(this);
