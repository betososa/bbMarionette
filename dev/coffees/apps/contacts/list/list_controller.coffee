ContactManager.module "ContactsApp.List", (List, ContactManager, Backbone, Marionette, $, _)->
  
  List.Controller = listContacts: ->

    loadingView = new (ContactManager.Common.Views.Loading)
    ContactManager.mainRegion.show(loadingView)
    fetchingContacts = ContactManager.request('contact:entities')
    contactsListLayout = new (List.Layout)
    contactsListPanel  = new (List.Panel)
    $.when(fetchingContacts).done (contacts) ->
      contactsListView = new (List.Contacts)(collection: contacts)
      contactsListLayout.on "show", ->
        contactsListLayout.panelRegion.show contactsListPanel
        contactsListLayout.contactsRegion.show contactsListView

      contactsListPanel.on "contact:new", ->
        newContact = new (ContactManager.Entities.Contact)
        view = new (ContactManager.ContactsApp.New.Contact)(
          model:newContact
          asModal:true)
        view.on 'form:submit', (data)->
          if contacts.length > 0
            highestId = contacts.max((c)->
              c.id
            ).get('id')
            data.id = highestId + 1
          else
            data.id = 1
          if newContact.save(data)
            contacts.add newContact
            # ContactManager.removeRegion("dialogRegion")
            ContactManager.dialogRegion.empty()
            # layoutView.removeRegion("foo");
            contactsListView.children.findByModel(newContact).flash 'success'
          else
            view.triggerMethod 'form:data:invalid', newContact.validationError
        ContactManager.dialogRegion.show view

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
            ContactManager.removeRegion("dialogRegion")
            # ContactManager.dialogRegion.close()
            childview.flash("success")
          else
            view.triggerMethod "form:data:invalid", model.validationError
        ContactManager.dialogRegion.show view
        console.log ":)"

      ContactManager.mainRegion.show contactsListLayout
