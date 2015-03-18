ContactManager.module "ContactsApp.List", (List, ContactManager, Backbone, Marionette, $, _)->
	List.Controller = listContacts: ->

		loadingView = new (ContactManager.Common.Views.Loading)
		ContactManager.mainRegion.show(loadingView)
		fetchingContacts = ContactManager.request('contact:entities')
		$.when(fetchingContacts).done (contacts) ->
			contactsListView = new (List.Contacts)(collection: contacts)

			contactsListView.on 'childview:contact:delete', (childView, model) ->
				model.destroy()

			contactsListView.on 'childview:contact:show', (childView, model) ->
				ContactManager.trigger "contact:show", model.get("id")

			contactsListView.on 'childview:contact:edit', (childview, model) ->
				view = new (ContactManager.ContactsApp.Edit.Contact)(
					model:model
					asModal:true)
				view.on "form:submit", (data)->
					if model.save data
						childview.render()
						console.log '================='
						console.dir ContactManager.dialogRegion
						
						console.log '================='
						# ContactManager.dialogRegion.close()
						childview.flash("success")
					else
						view.triggerMethod "form:data:invalid", model.validationError
				ContactManager.dialogRegion.show view
				console.log ":)"

			ContactManager.mainRegion.show contactsListView
