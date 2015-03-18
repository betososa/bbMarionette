(function() {
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    return List.Controller = {
      listContacts: function() {
        var fetchingContacts, loadingView;
        loadingView = new ContactManager.Common.Views.Loading;
        ContactManager.mainRegion.show(loadingView);
        fetchingContacts = ContactManager.request('contact:entities');
        return $.when(fetchingContacts).done(function(contacts) {
          var contactsListView;
          contactsListView = new List.Contacts({
            collection: contacts
          });
          contactsListView.on('childview:contact:delete', function(childView, model) {
            return model.destroy();
          });
          contactsListView.on('childview:contact:show', function(childView, model) {
            return ContactManager.trigger("contact:show", model.get("id"));
          });
          contactsListView.on('childview:contact:edit', function(childview, model) {
            var view;
            view = new ContactManager.ContactsApp.Edit.Contact({
              model: model,
              asModal: true
            });
            view.on("form:submit", function(data) {
              if (model.save(data)) {
                childview.render();
                console.log('=================');
                console.dir(ContactManager.dialogRegion);
                console.log('=================');
                return childview.flash("success");
              } else {
                return view.triggerMethod("form:data:invalid", model.validationError);
              }
            });
            ContactManager.dialogRegion.show(view);
            return console.log(":)");
          });
          return ContactManager.mainRegion.show(contactsListView);
        });
      }
    };
  });

}).call(this);
