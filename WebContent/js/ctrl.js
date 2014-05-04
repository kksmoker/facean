$(document).ready(function() {
	//拍照按钮事件按下所发生的事件,即弹出dialog
	$('#btn-camera').click(function() {
		//设置dialog大小并弹出
		$('#capture-modal').dialog({
			closeOnEscape : false,
			height : 430,
			width : 550,
			minHeight : 430,
			minWidth : 550,
			resizable : false,
			draggable : false,
			modal : true,
			//隐藏右上角关闭按钮
			open : function(event, ui) {
				$(".ui-dialog-titlebar-close", $(this).parent()).hide();
			}
		});
		$('#btn-group').empty();
		$('#btn-group').append('<button class="btn btn-success col-lg-offset-5" id="capture"><span class="glyphicon glyphicon-camera"></span></button>&nbsp;&nbsp;<button class="btn btn-danger" id="abort"><span class="glyphicon glyphicon-off"></span></button>');
		Webcam.attach('#photograph');

		//dialog拍照按钮事件
		$('#capture').click(function() {
			take_snapshot();
			$('#capture-modal').dialog('close');
			Webcam.reset();
		});

		//点击放弃按钮,放弃拍照
		$('#abort').click(function() {
			//关闭对话框,关闭摄像头
			$('#capture-modal').dialog('close');
			Webcam.reset();
		});
	});

	//点击url按钮,通过url上传图片,本地加载到本页面
	$('#btn-url').click(function() {
		var urlstr = $.trim($('#urlstr').val());
		if (urlstr === "" || !url_check(urlstr)) {
			alert('正确的图片url地址!');
		} else {
			//$('#photo').append('<img class="img-responsive" src="' + urlstr + '" onload="ResizePic(this);"/>');
			//$('#photo').css('background-image', 'url(' + urlstr + ')');
			$('#show').attr('src', urlstr);
			face_an(urlstr);
		}
	});
	
	var filesize = 0;
	$('#imgfile').change(function() {
		filesize = this.files[0].size;
	});

	//点击上传按钮,异步上传图片
	$('#btn-upload').click(function() {
		if (filesize > 3145728) {
			add_info('上传大小3MB以下的图片,好不好(⊙o⊙)?');
		} else if (filesize <= 0) {
			add_info('咱图片能稍微大一点么o(╯□╰)o?');
		} else if (!imgname_check($.trim($('#imgfile').val()))) {
			add_info('上传图片,好不好(⊙o⊙)?');
		} else {
			setTimeout('uploadform()', 2 * 1000);
			add_process();
		}
	});
});

//拍照,并且将生成的照片添加到展示框中
function take_snapshot() {
	var data_uri = Webcam.snap();
	//var path = '';
	$.post('ImagePath', {
		data : data_uri,
		dataType: 'text'
	}, function(info) {
		if (info === '500') {
			$('#panel-result').empty();
			$('#panel-result').append('<li class="list-group-item"><img src="img/busy.png" class="img-responsive img-rounded" alt="服务器在思考人生..."><span class="label label-danger">@</span>&nbsp;&nbsp;服务器在思考人生...</li>');
		} else {
			$('#show').attr('src', data_uri);
			//分析图片结果
			//face_an('http://zmpandzmp.sinaapp.com/images/me.jpg');
			face_an('http://facean-facean.stor.sinaapp.com/upimg/' + info);
		}
	});
}

//分析图片并向网页中插入分析结果
function face_an(urlv) {
	$('#panel-result').empty();
	$('#panel-result').append('<li class="list-group-item"><img src="img/loading.gif" class="img-responsive img-rounded" alt="玩命加载中..."></li>');
	var api = new FacePP('98ecc66ca00b76a8e9d30bac87b61a5d', 'muJgnTswMmxdR9qjxucEwLK5PNGqD5OE');
	api.requestAsync('detection/detect', {
		url : urlv
	}, function(err, result) {
		if (err) {
			$('#panel-result').empty();
			$('#panel-result').append('<li class="list-group-item"><img src="img/busy.png" class="img-responsive img-rounded" alt="服务器在思考人生..."><span class="label label-danger">@</span>&nbsp;&nbsp;服务器在思考人生...</li>');
		} else {
			if (eval(result.face).length == 0) {
				$('#panel-result').empty();
				tag_no = '<li class="list-group-item">' + '<img src="img/no.png" class="img-responsive img-rounded" alt="没有嗅到人脸哎...">' + '<span class="label label-danger">1</span>&nbsp;&nbsp;没有嗅到人脸哎...' + '</li><li class="list-group-item">' + '<img src="img/again.png" class="img-responsive img-rounded" alt="换个姿势,再来一次...">' + '<span class="label label-danger">2</span>&nbsp;&nbsp;换个姿势,再来一次...' + '</li>';
				$('#panel-result').append(tag_no);
			} else {
				var att = result.face[0].attribute;
				//性别标签
				var tag_gender = function() {
					if (att.gender.value === 'Male') {
						return '<li class="list-group-item">性别:&nbsp;&nbsp;男<span class="badge pull-right">置信度: ' + sub_param(att.gender.confidence) + '</span></li>';
					} else {
						return '<li class="list-group-item">性别:&nbsp;&nbsp;女<span class="badge pull-right">置信度: ' + sub_param(att.gender.confidence) + '</span></li>';
					}
				};
				//年龄标签
				var tag_age = '<li class="list-group-item">年龄:&nbsp;&nbsp;' + att.age.value + '<span class="badge pull-right">波动区间:' + att.age.range + '</span></li>';
				//种族标签
				var tag_race = function() {
					if (att.race.value === 'Asian') {
						return '<li class="list-group-item">人种:&nbsp;&nbsp;黄种人<span class="badge pull-right">置信度:' + sub_param(att.race.confidence) + '</span></li>';
					} else if (att.race.value === 'White') {
						return '<li class="list-group-item">人种:&nbsp;&nbsp;白种人<span class="badge pull-right">置信度:' + sub_param(att.race.confidence) + '</span></li>';
					} else {
						return '<li class="list-group-item">人种:&nbsp;&nbsp;黑种人<span class="badge pull-right">置信度:' + sub_param(att.race.confidence) + '</span></li>';
					}
				};
				//微笑指数标签
				var tag_smiling = '<li class="list-group-item" id="smile">微笑指数:&nbsp;&nbsp;' + sub_param(att.smiling.value) + '</li>';
				//照片宽度标签
				var tag_width = '<li class="list-group-item">照片宽度:&nbsp;&nbsp;' + result.img_width + '</li>';
				//照片高度标签
				var tag_height = '<li class="list-group-item">照片高度:&nbsp;&nbsp;' + result.img_height + '</li>';
				var intag = tag_gender() + tag_age + tag_race() + tag_smiling + tag_width + tag_height;
				$('#panel-result').empty();
				$('#panel-result').append(intag);
			}
		}
	});
}

//判断网址是否符合要求
function url_check(str) {
	var isurl = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/;
	if (str.match(isurl)) {
		return true;
	} else {
		return false;
	}
}

//判断上传图片名称是否符合要求
function imgname_check(str) {
	var isimg = /\.(jpg|png|gif|jpeg|bmp)$/i;
	if (str.match(isimg)) {
		return true;
	} else {
		return false;
	}
}

//为置信度等参数缩小字符串长度,并加上%结尾
function sub_param(param) {
	param = param.toString();
	return param.substring(0, 7) + '%';
}