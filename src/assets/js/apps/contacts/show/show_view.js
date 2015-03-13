(function() {
  ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    return Show.Contact = Marionette.ItemView.extend({
      template: "#contact-view"
    });
  });

}).call(this);
