(function() {
  var ContactManager;

  ContactManager = new Marionette.Application();

  ContactManager.addRegions({
    mainRegion: "#main-region"
  });

  ContactManager.navigate = function(route, options) {
    options || (options = {});
    return Backbone.history.navigate(route, options);
  };

  ContactManager.getCurrentRoute = function() {
    return Backbone.history.fragment;
  };

  ContactManager.on("start", function() {
    if (Backbone.history) {
      Backbone.history.start();
      if (this.getCurrentRoute() === '') {
        return ContactManager.trigger("contacts:list");
      }
    }
  });

  window.ContactManager = ContactManager;

}).call(this);
