$(document).ready(() => {

	$("#create").click(() => {
		var data = {
			title: $("#title").val().trim(),
			writer: $("#writer").val().trim(),
			contents: $("#contents").val().trim()
		}
		if (!data.title || !data.writer || !data.contents) {
			alert("빈칸을 입력해 주세요");
		} else {

			$.ajax({
				type: "POST",
				url: "/table/create/insert",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(data),
				success: function(result) {
					window.location.href = "http://localhost:9090/table";
				},
			});
		}
	});

	$("#cancel").click(() => {
		alert("목록으로 돌아가시겠습니까?")
		window.location.href = "http://localhost:9090/table";
	});
});