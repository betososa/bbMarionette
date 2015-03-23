ContactManager.module "ContactsApp.Common.Views", (Views, ContactManager, Backbone, Marionette, $, _)->

  Views.Form = Marionette.ItemView.extend(
    template : "#contact-form"
    events   : "click button.js-submit":"submitClicked"

    submitClicked: (e)->
      e.preventDefault()
      data = Backbone.Syphon.serialize @
      @trigger "form:submit", data

    onRender: ->
      if not @options.asModal
        $title = $("<h1>", text: @title)
        @$el.prepend $title

    onShow: ->
      if @options.asModal
        @$el.dialog(
          modal:true
          title:@title
          width:"auto")

    onFormDataInvalid: (errors)->
      $view = @$el

      clearFormErrors = ->
        $form = $view.find("form")
        $form.find(".help-inline.error").each ->
          $(this).remove()
        $form.find('control-group.error').each ->
          $(this).removeClass 'error'

      markErrors = (value, key)->
        $controlGroup = $view.find("#contact-#{key}").parent()
        $errorEl = $("<span>",
          class:"help-inline error"
          text: value)
        $controlGroup.append($errorEl).addClass 'error'

      clearFormErrors()
      _.each errors, markErrors
  )