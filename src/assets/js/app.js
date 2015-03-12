(function() {
  var ContactManager;

  ContactManager = new Marionette.Application();

  ContactManager.addRegions({
    mainRegion: "#main-region"
  });

  ContactManager.on("start", function() {
    ContactManager.ContactsApp.List.Controller.listContacts();
    return alert(JSON.stringify(ContactManager.request("contact:entities")));
  });

  window.ContactManager = ContactManager;

}).call(this);
