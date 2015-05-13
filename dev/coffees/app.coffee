ContactManager = new Marionette.Application()

ContactManager.addRegions(
  mainRegion   : "#main-region"
  dialogRegion : "#dialog-region")

ContactManager.navigate = (route, options)->
  options or (options = {})
  Backbone.history.navigate route, options

ContactManager.getCurrentRoute = ->
  Backbone.history.fragment

ContactManager.on "start", ->
  if Backbone.history
    Backbone.history.start()
    if @getCurrentRoute() is ''
      ContactManager.trigger "contacts:list"
      # ContactManager.ContactsApp.List.Controller.listContacts()

window.ContactManager = ContactManager
