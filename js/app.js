var go = function () {
	'use strict';
	$('#addComment').on('click', function () {	
		addComment();		
	})

	$('#newComment').on('keypress', function (event) {
		if (event.keyCode === 13) {
			addComment();
		};

	})

	var addComment = function () {
		var $wrapComment = $('<li>');
		if ($('#newComment').val() !=="" && $('#newComment').val() !==" ") {
			var $newComment = $wrapComment.text($('#newComment').val());
			$('.todolist').append($newComment);
			$('#newComment').val(" ");
			var pushed = toDos.push($newComment);

		} else{
			alert('Введите комментарий!')
		};
	}



	var toDos = [
		"Закончить писать эту книгу",
		"Вывести Грейси на прогулку в парк",
		"Ответить на электронные письма",
		"Подготовиться к лекции в понедельник",
		"Обновить несколько новых задач",
		"Купить продукты"
	];

	toDos.forEach(function (todo) {
		$('.todolist').append($("<li>").text(todo));
	});
//...
}


$(document).ready(go)