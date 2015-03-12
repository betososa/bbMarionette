ContactManager.module "Entities",(Entities, ContactManager, Backbone, Marionette, $, _)->
	Entities.Contact = Backbone.Model.extend({})

	Entities.ContactCollection = Backbone.Collection.extend(
		model      : Entities.Contact
		comparator : "firstName")

	contacts = undefined

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

	API = getContactEntities: ->
		if contacts is undefined
			initializeContacts()
		contacts

	ContactManager.reqres.setHandler 'contact:entities', ->
		API.getContactEntities()
