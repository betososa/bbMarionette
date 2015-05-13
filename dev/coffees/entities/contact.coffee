ContactManager.module "Entities", (Entities, ContactManager, Backbone, Marionette, $, _)->

  Entities.Contact = Backbone.Model.extend (
    urlRoot  : "contacts"
    defaults :
      firstName   : ""
      lastName    : ""
      phoneNumber : ""
    validate: (attrs, options)->
      errors = {}
      if not attrs.firstName
        errors.firstName  = "cant be blank"
      if not attrs.lastName
        errors.lastName   = "cant be blank"
      else
        if attrs.lastName.length < 2
          errors.lastName = "is too short"
      if not _.isEmpty(errors)
        return errors)

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

    return contacts.models

  API =
    getContactEntities: ->
      contacts = new (Entities.ContactCollection)
      defer    = $.Deferred()
      contacts.fetch success: (data) ->
        defer.resolve data
      promise = defer.promise()
      $.when(promise).done (contacts) ->
        if contacts.length is 0
          models = initializeContacts()
          contacts.reset models

    getContactEntity: (contactId) ->
      contact = new (Entities.Contact)(id: contactId)
      defer = $.Deferred()
      setTimeout (->
        contact.fetch(
          success: (data)->
            defer.resolve(data)
          error: (data)->
            defer.resolve(undefined))
        ), 2000
      return defer.promise()

  ContactManager.reqres.setHandler 'contact:entities', ->
    API.getContactEntities()

  ContactManager.reqres.setHandler 'contact:entity',(id) ->
    API.getContactEntity(id)
