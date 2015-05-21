(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {},
		Router: {}
	}

	window.template = function(id){
		return  _.template($('#' + id).html());
	}

	var vent = _.extend({}, Backbone.Events);

	App.Views.SpecialTask = Backbone.View.extend({
		initialize: function() {
			vent.on('specialTasks:show', this.show, this);
		},
		show: function(id){
			console.log('Task number: ' + id);
		}
	});

	App.Router = Backbone.Router.extend({
		routes: {
			"edit" : "edit",
			"read" : 'read',
			"page/:id" : 'page',
			'post/*simbo' : 'splat',
			'specialTasks/:id' : 'showSpecial',
			'*other ' : "default"
		},

		index: function() {
			console.log('router : edit');
		},
		read: function() {
			console.log('router : read')
		},
		page: function(id){
			console.log('router : page - id=' + id)
		},
		splat: function() {
			console.log('router : splat')
		},
		showSpecial: function(id) {
			vent.trigger('specialTasks:show', id);
		},
		default: function() {
			console.log('nothing to do here')
		}
	});

	new App.Views.SpecialTask();

	new App.Router();
	Backbone.history.start();

	App.Models.Task = Backbone.Model.extend({});

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',
		className: 'tasks',
		template: template('taskTemplate'),
		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		render: function (){
			var template = this.template(this.model.toJSON());
			this.$el.html( template );
			return this;
		},
		remove: function(){
			this.$el.remove();
		},

		events: {
			'click .edit' : 'editTask',
			'click .delete' : 'deleteTask',
		},
		editTask: function(){
			var newTaskTitle = prompt('What new name of task?', this.model.get('title'));
			if(! $.trim(newTaskTitle)) return;
			this.model.set('title', newTaskTitle)
			console.log(newTaskTitle)
		},
		deleteTask: function(){
			var accept = prompt('Are you want delete task?', this.model.get('title'));
			if(!accept){
				return false
			}
			else{
				this.model.destroy()
			}
		}
	})

	App.Collections.Task = Backbone.Collection.extend({
		model: App.Models.Task
	})

	App.Views.Tasks = Backbone.View.extend({
		tagName: 'ul',

		initialize: function() {
			this.collection.on('add', this.addOne, this)
		},

		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(task) {
			var taskView = new App.Views.Task({model: task});
			this.$el.append(taskView.render().el);
		}
	})

	App.Views.AddTask = Backbone.View.extend({
		el: '#addTask',

		events: {
			'submit' : 'submit'
		},

		submit: function(event) {
			event.preventDefault();

			var newTaskTitle = $(event.currentTarget).find('input[type="text"]').val();

			var newTaskModel = new App.Models.Task( {title: newTaskTitle} );

			this.collection.add(newTaskModel);

			console.log(tasksCollection.toJSON());
		},

		initialize: function() {
			console.log(this.el.innerHML);
		}	
	})

	var tasksCollection = new App.Collections.Task([
		{
			title: 'learn Backbone',
			priority: 5
		},
		{
			title: 'develop first app',
			priority: 1
		},
		{
			title: 'layout USA template',
			priority: 3
		}
	])

	var tasksView = new App.Views.Tasks({collection: tasksCollection});

	tasksView.render();

	$('.task-wrap').html(tasksView.el);

	var addTask = new App.Views.AddTask({ collection: tasksCollection });



}())