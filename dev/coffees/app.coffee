ContactManager = new Marionette.Application()

ContactManager.addRegions mainRegion : "#main-region"

ContactManager.on "start", ->
	ContactManager.ContactsApp.List.Controller.listContacts()
	alert JSON.stringify ContactManager.request("contact:entities")

window.ContactManager = ContactManager
