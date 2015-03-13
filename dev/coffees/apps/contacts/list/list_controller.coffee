ContactManager.module "ContactsApp.List", (List, ContactManager, Backbone, Marionette, $, _)->
	List.Controller = listContacts: ->
		contacts        = ContactManager.request('contact:entities')
		contactsListView = new (List.Contacts)(collection: contacts)
		contactsListView.on 'childview:contact:delete', (childView, model) ->
			contacts.remove(model)

		contactsListView.on 'childview:contact:show', (childView, model) ->
			ContactManager.ContactsApp.Show.Controller.showContact(model)

		ContactManager.mainRegion.show contactsListView
