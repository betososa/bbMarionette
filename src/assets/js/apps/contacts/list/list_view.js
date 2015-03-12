(function() {
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Contact = Marionette.ItemView.extend({
      tagName: 'tr',
      template: '#contact-list-item',
      events: {
        "click": "highlightName",
        "click button.js-delete": "deleteButton"
      },
      highlightName: function(e) {
        e.preventDefault();
        return this.$el.toggleClass("success");
      },
      deleteButton: function(e) {
        e.stopPropagation();
        return this.trigger("contact:delete", this.model);
      },
      remove: function() {
        var self;
        self = this;
        return this.$el.fadeOut(function() {
          return Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });
    return List.Contacts = Marionette.CompositeView.extend({
      tagName: 'table',
      className: 'table table-hover',
      template: "#contact-list",
      childView: List.Contact,
      childViewContainer: "tbody"
    });
  });

}).call(this);
