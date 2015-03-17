ContactManager.module 'ContactsApp.Edit', (Edit, ContactManager, Backbone, Marionette, $, _) ->
	Edit.Controller = editContact: (id) ->
		loadingView = new (ContactManager.Common.Views.Loading)(
			title   : "Artificial delay"
			message : "Data loading")
		ContactManager.mainRegion.show loadingView
		fetchingContact = ContactManager.request('contact:entity', id)
		$.when(fetchingContact).done (contact)->
			view = undefined
			if contact isnt undefined
				view = new (Edit.Contact)(model:contact)
			else
				view = new (ContactManager.ContactsApp.Show.MissingContact)
			ContactManager.mainRegion.show view