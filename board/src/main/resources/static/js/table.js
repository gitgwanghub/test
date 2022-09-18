$(document).ready(() => {
	var now = parseInt(boardList[0].pg);
	var max = Math.ceil(total / 10);
	var tableHtml = '';
	var data = {
		pg: 1,
		title: '',
		writer: '',
		contents: ''
	}
	getTable(data)
	getPage(data);


	$("#prev").on("click", () => {
		now = boardList[0].pg;
		if (now > 1) {
			now = parseInt(now) - 1;
			data.pg = now;
			getTable(data);
			getPage(data);
		}
	})

	$("#next").on("click", () => {
		now = boardList[0].pg;
		max = Math.ceil(total / 10);
		if (now < max) {
			now = now + 1;
			data.pg = now;
			getTable(data);
			getPage(data)
		}
	})


	$("#create").click(() => {
		window.location.href = "http://localhost:9090/table/create";
	})
	$("#delete").click(() => {
		// 배열로 ajax 보낼땐 JSON.stringify(data) 사용x , contentType 사용 x
		var idList = [];
		$("input[name=deleteBtn]:checked").each((i, iVal) => {
			idList.push($(iVal).val());
			//this가 안먹음..
		});
		data = { idList: idList }
		$.ajax({
			type: "POST",
			url: "table/delete",
			dataType: "json",
			//			contentType: "application/json; charset=utf-8",
			data: data,
			success: function() {
				alert("삭제 완료")
				window.location.href = "http://localhost:9090/table";
			},
		});
	})

	$("#search").click(() => {
		data = {
			pg: 1,
			title: '',
			writer: '',
			contents: ''
		}
		switch ($("#menu option:selected").val()) {
			case 'title':
				data.title = $("input[name=searchText]").val();
				break;
			case 'writer':
				data.writer = $("input[name=searchText]").val();
				break;
			case 'contents':
				data.contents = $("input[name=searchText]").val();
				break;
			default:
				break;
		}
		getTable(data)
		getPage(data)
	})
})

function getTable(data) {
	$.ajax({
		type: "POST",
		url: "table",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(result) {
			var tableHtml = ''
			boardList = result.boardList;
			tableHtml += `	<tr>
								<th><b>체크</b></th>
								<th><b>ID</b></th>
								<th><b>제목</b></th>
								<th><b>작성자</b></th>
								<th><b>날짜</b></th>
								<th><b>조회수</b></th>
							</tr>`
			if (!boardList[0]) {
				tableHtml += `<tr><td colspan="6">내용이 없습니다</td></tr>`
			} else {
				for (board of boardList) {
					tableHtml += `<tr>`
					tableHtml += `<td><input type="checkbox" name="deleteBtn" value="${board.id}"></td>`
					tableHtml += `<td class="${board.id}" value="${board.views}">${board.id}</td>`
					tableHtml += `<td class="${board.id}" value="${board.views}">${board.title}</td>`
					tableHtml += `<td class="${board.id}" value="${board.views}">${board.writer}</td>`
					tableHtml += `<td class="${board.id}" value="${board.views}">${board.cdate}</td>`
					tableHtml += `<td class="${board.id}" value="${board.views}">${board.views}</td>`
					tableHtml += `</tr>`
					// es6 안먹음 () => {}  --> function() {}
					$(document).on("click", `.${board.id}`, function() {
						data.id = $(this).attr('class');
						countView(data)
					});
				}
			}

			$("#board").html(tableHtml);
		}
	});
}

function getPage(data) {
	$.ajax({
		type: "POST",
		url: "table",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(result) {
			var pageHtml = ``
			boardList = result.boardList;
			if (!boardList[0]) {
				$("#prev").css("display", "none");
				$("#next").css("display", "none");
			}
			else {
				total = result.total;
				now = boardList[0].pg;
				max = Math.ceil(total / 10);
				var start = 1;
				var end = 5;

				if (max < 5) {
					end = max
				} else if (max >= 5 && now < 3) {
					start = 1;
					end = 5;
				} else if (max >= 5 && now >= 3 && now < max - 2) {
					start = parseInt(now) - 2;
					end = parseInt(now) + 2;
				} else {
					end = max;
					start = max - 4;
				}
				for (var i = start; i <= end; i++) {
					pageHtml += `<a href="#" id="${i}">${i}</a>`
					$(document).on("click", `#${i}`, function() {
						data.pg = $(this).attr("id");
						getTable(data);
					});
				}
				$("#prev").css("display", "block");
				$("#next").css("display", "block");
			}
			$("#page").html(pageHtml);
		}
	});
}

function countView(data) {
	$.ajax({
		type: "POST",
		url: "table/read",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(result) {
			board = result.board;
			window.location.href = `http://localhost:9090/table/read/${board.id}`;
		}
	})
}