$(document).ready(() => {
	var now = parseInt(boardList[0].pg);
	var max = Math.ceil(total / 10);
	var tableHtml = '';
	var pageHtml = ''
	var data = {
		pg: 1,
		title: '',
		writer: '',
		contents: ''
	}
	getTable(data)


	$("#prev").on("click", () => {
		now = boardList[0].pg;
		if (now > 1) {
			now = parseInt(now) - 1;
			data.pg = now;
			getTable(data);
		}
	})

	$("#next").on("click", () => {
		now = boardList[0].pg;
		max = Math.ceil(total / 10);
		if (now < max) {
			now = now + 1;
			data.pg = now;
			getTable(data);
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
		if (idList.length == 0) {
			alert("체크된 아이템이 없습니다");
		} else {
			$.ajax({
				type: "POST",
				url: "table/delete",
				dataType: "json",
				//			contentType: "application/json; charset=utf-8",
				data: data,
				success: function(result) {
					alert("삭제 완료")
					data.pg = boardList[0].pg;
					getTable(data)
				},
			});
		}
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
		if (data.title.length > 10 || data.contents.length > 10 || data.writer.length > 10) {
			alert("검색어는 10자 이하로 입력해주세요");
		} else {
			getTable(data)
		}
	})
})

function getTable(data) {
	$(document).off();
	$.ajax({
		type: "POST",
		url: "table",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(data),
		success: function(result) {
			tableHtml = ''
			pageHtml = ''
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
				tableHtml += `<tr><td colspan="6" style="text-align: center;">내용이 없습니다</td></tr>`;
				$("#prev").css("display", "none");
				$("#next").css("display", "none");
			} else {
				total = result.total;
				now = boardList[0].pg;
				max = Math.ceil(total / 10);
				start = Math.ceil(now / 5) * 5 - 4;
				end = Math.ceil(now / 5) * 5;

				if (end >= max) {
					end = max
				}

				for (board of boardList) {
					tableHtml += `<tr>`
					tableHtml += `<td><input type="checkbox" name="deleteBtn" value="${board.id}"></td>`
					tableHtml += `<td> <a class="${board.id}" value="${board.views}">${board.id}</a></td>`
					tableHtml += `<td> <a class="${board.id}" value="${board.views}">${board.title}</a></td>`
					tableHtml += `<td> <a class="${board.id}" value="${board.views}">${board.writer}</a></td>`
					tableHtml += `<td> <a class="${board.id}" value="${board.views}">${board.cdate}</a></td>`
					tableHtml += `<td> <a class="${board.id}" value="${board.views}">${board.views}</a></td>`
					tableHtml += `</tr>`
					// es6 안먹음 () => {}  --> function() {}

					$(document).on("click", `.${board.id}`, function() {
						data.id = $(this).attr('class');
						countView(data)
					});
				}

				for (var i = start; i <= end; i++) {
					pageHtml += `<a href="#" id="${i}" class="">${i}</a>`;
					$(document).on("click", `#${i}`, function() {
						data.pg = $(this).attr("id");

						getTable(data);
					})
				}
				$("#prev").css("display", "block");
				$("#next").css("display", "block");
			}
			console.log(now)
			$("#board").html(tableHtml);
			$("#page").html(pageHtml);
			$(`#${data.pg}`).addClass("active")
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