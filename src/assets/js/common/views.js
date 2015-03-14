(function() {
  ContactManager.module("Common.Views", function(Views, ContactManager, Backbone, Marionette, $, _) {
    return Views.Loading = Marionette.ItemView.extend({
      template: "#loading-view",
      initialize: function(options) {
        options = options || {};
        this.title = options.title || "Loading data...";
        return this.message = options.message || "Please wait data is loading";
      },
      serializeData: function() {
        return {
          title: this.title,
          message: this.message
        };
      },
      onShow: function() {
        var opts;
        opts = {
          lines: 13,
          length: 20,
          width: 10,
          radius: 30,
          corners: 1,
          rotate: 0,
          direction: 1,
          color: "#000",
          speed: 1,
          trail: 60,
          shadow: false,
          hwaccel: false,
          className: "spinner",
          zIndex: 2e9,
          top: "30px",
          left: "auto"
        };
        return $("#spinner").spin(opts);
      }
    });
  });

}).call(this);
