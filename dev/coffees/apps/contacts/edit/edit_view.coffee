ContactManager.module "ContactsApp.Edit", (Edit, ContactManager, Backbone, Marionette, $, _) ->
	Edit.Contact = Marionette.ItemView.extend(
		template: "#contact-form"
		events:
			"click button.js-submit" : "submitClicked"
		submitClicked:(e)->
			e.preventDefault()
			console.log "Edit contact"
			data = Backbone.Syphon.serialize @
			@trigger "form:submit", data
		onFormDataInvalid: (errors)->
			$view = @$el
			# self = @
			clearFormErrors = ->
				$form = $view.find("form")
				$form.find(".help-inline.error").each ->
					$(this).remove()
				$form.find(".control-group.error").each ->
					$(this).removeClass "error"
			markErrors = (value, key)->
				$control_group = $view.find("#contact-#{key}").parent()
				$errorEl = $("<span>",
					class:"help-inline error"
					text: value)
				$control_group.append($errorEl).addClass("error")
			clearFormErrors()
			_.each errors, markErrors)
