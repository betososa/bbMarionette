(function() {
  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
    return List.Controller = {
      listContacts: function() {
        var contactsListLayout, contactsListPanel, fetchingContacts, loadingView;
        loadingView = new ContactManager.Common.Views.Loading;
        ContactManager.mainRegion.show(loadingView);
        fetchingContacts = ContactManager.request('contact:entities');
        contactsListLayout = new List.Layout;
        contactsListPanel = new List.Panel;
        return $.when(fetchingContacts).done(function(contacts) {
          var contactsListView;
          contactsListView = new List.Contacts({
            collection: contacts
          });
          contactsListLayout.on("show", function() {
            contactsListLayout.panelRegion.show(contactsListPanel);
            return contactsListLayout.contactsRegion.show(contactsListView);
          });
          contactsListPanel.on("contact:new", function() {
            var newContact, view;
            newContact = new ContactManager.Entities.Contact;
            view = new ContactManager.ContactsApp.New.Contact({
              model: newContact,
              asModal: true
            });
            view.on('form:submit', function(data) {
              var highestId;
              if (contacts.length > 0) {
                highestId = contacts.max(function(c) {
                  return c.id;
                }).get('id');
                data.id = highestId + 1;
              } else {
                data.id = 1;
              }
              if (newContact.save(data)) {
                contacts.add(newContact);
                ContactManager.dialogRegion.empty();
                return contactsListView.children.findByModel(newContact).flash('success');
              } else {
                return view.triggerMethod('form:data:invalid', newContact.validationError);
              }
            });
            return ContactManager.dialogRegion.show(view);
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
                ContactManager.removeRegion("dialogRegion");
                return childview.flash("success");
              } else {
                return view.triggerMethod("form:data:invalid", model.validationError);
              }
            });
            ContactManager.dialogRegion.show(view);
            return console.log(":)");
          });
          return ContactManager.mainRegion.show(contactsListLayout);
        });
      }
    };
  });

}).call(this);
