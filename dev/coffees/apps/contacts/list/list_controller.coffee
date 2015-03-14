ContactManager.module "ContactsApp.List", (List, ContactManager, Backbone, Marionette, $, _)->
	List.Controller = listContacts: ->

		loadingView = new (ContactManager.Common.Views.Loading)
		ContactManager.mainRegion.show(loadingView)
		fetchingContacts = ContactManager.request('contact:entities')
		$.when(fetchingContacts).done (contacts) ->
			contactsListView = new (List.Contacts)(collection: contacts)

			contactsListView.on 'childview:contact:delete', (childView, model) ->
				model.destroy()

			contactsListView.on 'childview:contact:show', (childView, model) ->
				ContactManager.trigger "contact:show", model.get("id")

			ContactManager.mainRegion.show contactsListView
