ContactManager.module "ContactsApp.Show", (Show, ContactManager, Backbone, Marionette, $, _) ->
	Show.Controller = showContact: (id)->
		fetchingContact = ContactManager.request "contact:entity", id
		$.when(fetchingContact).done (contact)->
			contactView = undefined
			if contact isnt undefined
				contactView = new (Show.Contact)(model:contact)
			else
				contactView = new (Show.MissingContact)

			ContactManager.mainRegion.show contactView