ContactManager.module "ContactsApp.Show", (Show, ContactManager, Backbone, Marionette, $, _) ->
	Show.Controller = showContact: (id)->
		loadingView = new (ContactManager.Common.Views.Loading)
		ContactManager.mainRegion.show loadingView
		fetchingContact = ContactManager.request "contact:entity", id
		$.when(fetchingContact).done (contact)->
			contactView = undefined
			if contact isnt undefined
				contactView = new (Show.Contact)(model:contact)
				contactView.on "contact:edit", (contact)->
					ContactManager.trigger "contact:edit", contact.get "id"
			else
				contactView = new (Show.MissingContact)

			ContactManager.mainRegion.show contactView