function uploadform() {
	var options = {
		url : "Up2Storage",
		type : "POST",
		dataType : "text",
		success : function(msg) {
			if (msg === '100') {
				add_info('(⊙o⊙),服务器被程序猿爆菊了...');
			} else if (msg === '200') {
				add_info('上传图片,好不好(⊙o⊙)?');
			} else if (msg === '300') {
				add_info('上传大小3MB以下的图片,好不好(⊙o⊙)?');
			} else if (msg === '500') {
				add_info('(⊙o⊙),服务器被程序猿爆菊了...');
			} else if (msg === '') {
				add_info('(⊙o⊙),服务器被程序猿爆菊了...');
			} else {
				$('#process').empty();
				$('#show').attr('src', 'http://facean-facean.stor.sinaapp.com/upimg/' + msg);
				face_an('http://facean-facean.stor.sinaapp.com/upimg/' + msg);
				$('#uploadModal').modal('hide');
			}
		},
		error: function(err) {
			add_info('(⊙o⊙),服务器被程序猿爆菊了...');
		}
	};
	$("#imgform").ajaxSubmit(options);
}

//添加进度条
function add_process() {
	$('#process').empty();
	$('#process').append('<div class="progress progress-striped active" id="loading"><div class="progress-bar"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>');
}

//添加提示信息
function add_info(info) {
	$('#process').empty();
	$('#process').append('<div class="alert alert-danger fade in">' + info + '</di>');
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
				var tag_smiling = '<li class="list-group-item">微笑指数:&nbsp;&nbsp;' + sub_param(att.smiling.value) + '</li>';
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