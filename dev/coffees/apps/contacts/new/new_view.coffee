ContactManager.module "ContactsApp.New", (New, ContactManger, Backbone, Marionette, $, _)->
  New.Contact = ContactManger.ContactsApp.Common.Views.Form.extend(
    title: "New Contact")