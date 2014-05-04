//禁止myModal以键盘Esc键退出模态框
function preEsc() {
	$('#myModal').modal({
		keyboard : false,
		show: false
	});
}

//关闭myModal
function hideModal() {
	$('#myModal').modal('hide');
}
