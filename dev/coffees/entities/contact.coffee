ContactManager.module "Entities", (Entities, ContactManager, Backbone, Marionette, $, _)->

	Entities.Contact = Backbone.Model.extend (urlRoot:"contacts")

	Entities.configureStorage Entities.Contact

	Entities.ContactCollection = Backbone.Collection.extend(
		url        : "contacts"
		model      : Entities.Contact
		comparator : "firstName")

	Entities.configureStorage Entities.ContactCollection

	# contacts = undefined

	initializeContacts = ->
		contacts = new (Entities.ContactCollection)([
			{
				id          : 1
				firstName   : 'Alice'
				lastName    : 'Arten'
				phoneNumber :'5566766'
			}
			{
				id          : 2
				firstName   : 'Bob'
				lastName    : 'Brighman'
				phoneNumber : '21556567'
			}
			{
				id          : 3
				firstName   : 'Charlie'
				lastName    : 'Campbell'
				phoneNumber : '988254'
			}
		])
		contacts.forEach (contact) ->
			contact.save()

		return contacts

	API =
		getContactEntities: ->
			contacts = new (Entities.ContactCollection)
			contacts.fetch()
			if contacts.length is 0
				return initializeContacts()
			contacts
		getContactEntity: (contactId) ->
			contact = new (Entities.Contact)(id: contactId)
			contact.fetch()
			contact

	ContactManager.reqres.setHandler 'contact:entities', ->
		API.getContactEntities()

	ContactManager.reqres.setHandler 'contact:entity',(id) ->
		API.getContactEntity(id)
