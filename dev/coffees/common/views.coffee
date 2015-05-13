ContactManager.module "Common.Views", (Views, ContactManager, Backbone, Marionette, $, _)->
  Views.Loading = Marionette.ItemView.extend(

    template: "#loading-view"

    initialize: (options)->
      options  = options         or {}
      @title   = options.title   or "Loading data..."
      @message = options.message or "Please wait data is loading"
    
    serializeData: ->
      {
        title   : @title
        message : @message
      }
    
    onShow: ->
      opts =
        lines    :13
        length   :20
        width    :10
        radius   :30
        corners  :1
        rotate   :0
        direction:1
        color    :"#000"
        speed    :1
        trail    :60
        shadow   :false
        hwaccel  : false
        className:"spinner"
        zIndex   : 2e9
        top      :"30px"
        left     :"auto"
      $("#spinner").spin(opts))