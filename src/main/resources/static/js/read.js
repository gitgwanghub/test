$(document).ready(() => {
	if (board) {
		$("#titleDiv").html(`<p>${board.title}</p>`);
		$("#writerDiv").html(`<p>${board.writer}</p>`);
		$("#contentsDiv").html(`<p>${board.contents}</p>`);
	} else {
		window.location.href = "http://localhost:9090/table"
	}


	$("#list").click(() => {
		window.location.href = "http://localhost:9090/table"
	})

	$("#delete").click(() => {
		var data = {idList: [board.id]}
		$.ajax({
			type: "POST",
			url: "/table/delete",
			dataType: "json",
//			contentType: "application/json; charset=utf-8",
			data: data,
			success: function(result) {
				alert("삭제 성공")
				window.location.href = "http://localhost:9090/table";
			},
		});
	})

	$("#updateButton").click(() => {
		$("#titleDiv").html(`<input type="text" id="title" value="${board.title}"/>`);
		$("#writerDiv").html(`<input type="text" id="writer" value="${board.writer}"/>`);
		$("#contentsDiv").html(`<textarea id="contents" rows="10" cols="30">${board.contents}</textarea>`);
		$("#update").css("display", "block");
		$("#cancel").css("display", "block");
		$("#list").css("display", "none");
		$("#delete").css("display", "none");
		$("#updateButton").css("display", "none");
	})

	//동적으로 생성할경우 같은 {} 안에 넣어줘야함

	$("#update").on("click", () => {
		var data = {
			id: board.id,
			title: $("#title").val().trim(),
			writer: $("#writer").val().trim(),
			contents: $("#contents").val().trim(),
		}

		if (!data.title || !data.writer || !data.contents) {
			alert("내용을 입력해주세요")
		} else {
			$.ajax({
				type: "POST",
				url: "/table/update",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
				success: function(result) {
					var board = result.board
					$("#titleDiv").html(`<p>${board.title}</p>`);
					$("#writerDiv").html(`<p>${board.writer}</p>`);
					$("#contentsDiv").html(`<p>${board.contents}</p>`);
					$("#list").css("display", "block");
					$("#delete").css("display", "block");
					$("#updateButton").css("display", "block");
					$("#cancel").css("display", "none");
					$("#update").css("display", "none");
				},
			});
		}
	})


	$("#cancel").on("click", () => {
		window.location.href = "http://localhost:9090/table"
	});
});