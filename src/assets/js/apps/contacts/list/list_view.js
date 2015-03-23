(function() {
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
      template: "#contact-list-layout",
      regions: {
        panelRegion: "#panel-region",
        contactsRegion: "#contacts-region"
      }
    });
    List.Panel = Marionette.ItemView.extend({
      template: "#contact-list-panel",
      triggers: {
        "click button.js-new": "contact:new"
      }
    });
    List.Contact = Marionette.ItemView.extend({
      tagName: 'tr',
      template: '#contact-list-item',
      events: {
        "click": "highlightName",
        "click button.js-delete": "deleteButton",
        "click td a.js-show": "showClicked",
        "click td a.js-edit": "editClicked"
      },
      flash: function(cssClass) {
        var $view;
        $view = this.$el;
        return $view.hide().toggleClass(cssClass).fadeIn(800, function() {
          return setTimeout((function() {
            return $view.toggleClass(cssClass);
          }), 500);
        });
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
      editClicked: function(e) {
        e.preventDefault();
        e.stopPropagation();
        return this.trigger("contact:edit", this.model);
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
