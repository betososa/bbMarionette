ContactManager.module "ContactsApp.Show", (Show, ContactManager, Backbone, Marionette, $, _) ->
	Show.Controller = showContact: (id)->

		contact = ContactManager.request("contact:entity", id)
		
		contactView = undefined
		
		if contact isnt undefined
			contactView = new (Show.Contact)(model:contact)
		else
			contactView = new (Show.MissingContact)

		ContactManager.mainRegion.show contactView