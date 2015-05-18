(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	}

	var template = function(id){
		return  _.template($('#' + id).html());
	}

	App.Models.Task = Backbone.Model.extend({
		// validate: function (attrs, options) {
		// 	if ( ! $.trim(attrs.title) ){
		// 		console.log('Task name must be valid!')
		// 		return false;				
		// 	}			
		// }
	});

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
		initialize: function() {

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

}())