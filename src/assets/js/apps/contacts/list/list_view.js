(function() {
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Contact = Marionette.ItemView.extend({
      tagName: 'tr',
      template: '#contact-list-item',
      events: {
        "click": "highlightName",
        "click button.js-delete": "deleteButton",
        "click td a.js-show": "showClicked"
      },
      showClicked: function(e) {
        e.preventDefault();
        e.stopPropagation();
        return this.trigger("contact:show", this.model);
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
      childViewContainer: "tbody",
      onChildviewContactDelete: function() {
        return this.$el.fadeOut(1000, function() {
          return $(this).fadeIn(1000);
        });
      }
    });
  });

}).call(this);
