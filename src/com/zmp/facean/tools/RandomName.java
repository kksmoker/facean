package com.zmp.facean.tools;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class RandomName {
	//获取随机名
	public static String getName() {
		return getMD5Name(getDateStr() + getRandomNum()) + ".jpg";
	}
	
	//根据后缀名生成随机名称
	public static String getName(String suf) {
		return getMD5Name(getDateStr() + getRandomNum()) + "." + suf;
	}
	
	public static String getMD5Name(String name) {
		return EncryptMD5.getMD5(name.getBytes());
	}
	
	//获取本地时间
	public static String getDateStr() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSSS");
		return dateFormat.format(new Date());
	}
	
	//获取随机数
	public static String getRandomNum() {
		Random random = new Random(System.currentTimeMillis());
		return String.valueOf(random.nextInt());
	}
}
