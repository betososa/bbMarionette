ContactManager.module "ContactsApp.Edit", (Edit, ContactManager, Backbone, Marionette, $, _) ->
	Edit.Contact = ContactManager.ContactsApp.Common.Views.Form.extend(
		initialize: ->
			@title = "Edit " + @model.get "firstName"
			@title += " " + @model.get "lastName")
	# Edit.Contact = Marionette.ItemView.extend(
	# 	template: "#contact-form"
	# 	initialize: ->
	# 		@title = "Edit " + @model.get "firstName"
	# 		@title += " " + @model.get "lastName"
	# 	events:
	# 		"click button.js-submit" : "submitClicked"
	# 	submitClicked:(e)->
	# 		e.preventDefault()
	# 		console.log "Edit contact"
	# 		data = Backbone.Syphon.serialize @
	# 		@trigger "form:submit", data

	# 	onRender: ->
	# 		if not @options.asModal
	# 			$title = $("<h1>",text:@title)
	# 			@$el.prepend($title)

	# 	onShow: ->
	# 		if @options.asModal
	# 			@$el.dialog(
	# 				modal:true
	# 				title:@title
	# 				width:"auto")

	# 	onFormDataInvalid: (errors)->
	# 		$view = @$el
	# 		# self = @
	# 		clearFormErrors = ->
	# 			$form = $view.find("form")
	# 			$form.find(".help-inline.error").each ->
	# 				$(this).remove()
	# 			$form.find(".control-group.error").each ->
	# 				$(this).removeClass "error"
	# 		markErrors = (value, key)->
	# 			$control_group = $view.find("#contact-#{key}").parent()
	# 			$errorEl = $("<span>",
	# 				class:"help-inline error"
	# 				text: value)
	# 			$control_group.append($errorEl).addClass("error")
	# 		clearFormErrors()
	# 		_.each errors, markErrors)
