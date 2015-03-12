ContactManager.module "ContactsApp.List", (List, ContactManager, Backbone, Marionette, $, _)->

	List.Contact = Marionette.ItemView.extend(
		tagName  : 'tr'
		template : '#contact-list-item'
		events:
			"click"                  : "highlightName"
			"click button.js-delete" : "deleteButton"
		highlightName: (e)->
			e.preventDefault()
			@$el.toggleClass "success"
		deleteButton: (e)->
			e.stopPropagation()
			@trigger "contact:delete", @model
		remove : ->
			self = @
			@$el.fadeOut ->
				Marionette.ItemView.prototype.remove.call self

	)
	List.Contacts = Marionette.CompositeView.extend(
		tagName   : 'table'
		className : 'table table-hover'
		template  : "#contact-list"
		childView : List.Contact
		childViewContainer : "tbody")