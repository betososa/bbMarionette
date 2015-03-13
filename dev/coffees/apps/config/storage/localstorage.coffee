ContactManager.module "Entities", (Entities, ContactManager, Backbone, Marionette, $, _)->
	
	findStorageKey = (entity)->
		if entity.urlRoot
			return _.result(entity, 'urlRoot')
		if entity.url
			return _.result(entity, 'url')
		if entity.collection and entity.collection.url
			return _.result(entity.collection, 'url')
		throw new Error ('Unable to determine storage key')

	StorageMixin = (entityPrototype)->
		storageKey = findStorageKey(entityPrototype)
		{ localStorage: new (Backbone.LocalStorage)(storageKey) }

	Entities.configureStorage = (entity)->
		_.extend entity.prototype, new StorageMixin(entity.prototype)
