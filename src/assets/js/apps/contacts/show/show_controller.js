(function() {
  ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    return Show.Controller = {
      showContact: function(model) {
        var contactView;
        alert("modulo show :)");
        console.dir(Show);
        contactView = new Show.Contact({
          model: model
        });
        return ContactManager.mainRegion.show(contactView);
      }
    };
  });

}).call(this);
