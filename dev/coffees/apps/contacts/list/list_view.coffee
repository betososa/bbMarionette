ContactManager.module "ContactsApp.List", (List, ContactManager, Backbone, Marionette, $, _)->

	List.Layout = Marionette.LayoutView.extend(
		template:"#contact-list-layout"
		regions:
			panelRegion:"#panel-region"
			contactsRegion: "#contacts-region")

	List.Panel = Marionette.ItemView.extend(
		template:"#contact-list-panel"
		triggers:
			"click button.js-new": "contact:new")

	List.Contact = Marionette.ItemView.extend(
		tagName  : 'tr'
		template : '#contact-list-item'
		events:
			"click"                  : "highlightName"
			"click button.js-delete" : "deleteButton"
			"click td a.js-show"     : "showClicked"
			"click td a.js-edit"     : "editClicked"
		flash : (cssClass)->
			$view = @$el
			$view.hide().toggleClass(cssClass).fadeIn 800, ->
				setTimeout (->
					$view.toggleClass cssClass
				), 500
		showClicked: (e)->
			e.preventDefault()
			e.stopPropagation()
			@trigger "contact:show", @model
		highlightName: (e)->
			e.preventDefault()
			@$el.toggleClass "success"
		editClicked: (e)->
			e.preventDefault()
			e.stopPropagation()
			@trigger "contact:edit", @model
		deleteButton: (e)->
			e.stopPropagation()
			@trigger "contact:delete", @model
		remove : ->
			self = @
			@$el.fadeOut ->
				Marionette.ItemView.prototype.remove.call self

	)
	List.Contacts = Marionette.CompositeView.extend(
		tagName                 : 'table'
		className               : 'table table-hover'
		template                : "#contact-list"
		childView               : List.Contact
		childViewContainer      : "tbody"
		onChildviewContactDelete : ->
			@$el.fadeOut 1000, ->
				$(this).fadeIn 1000
	)