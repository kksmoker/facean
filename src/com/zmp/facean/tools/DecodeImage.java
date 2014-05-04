package com.zmp.facean.tools;

import java.io.FileOutputStream;
import java.io.OutputStream;
import sun.misc.BASE64Decoder;

public class DecodeImage {
	
	//对字节数组串进行Base64解码生成图片
	public static boolean generateImage(String imgStr, String path) {
		if (imgStr == null) // 图像数据为空
			return false;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			// Base64解码
			byte[] b = decoder.decodeBuffer(imgStr);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {// 调整异常数据
					b[i] += 256;
				}
			}
			// 生成jpeg图片
			OutputStream out = new FileOutputStream(path);
			out.write(b);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			System.out.println("此处异常抛出: " + e.getMessage());
			return false;
		}
	}
	
	public static boolean up2Sae(String imgstr, String name) {
		if (imgstr == null) // 图像数据为空
			return false;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			// Base64解码
			byte[] b = decoder.decodeBuffer(imgstr);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {// 调整异常数据
					b[i] += 256;
				}
			}
			// 生成jpeg图片,上传到sae,可以用
		    name = "saestor://facean/upimg/" + name;
			//name = "E:/uptest/";
			OutputStream out = new FileOutputStream(name);
			out.write(b);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			System.out.println("此处异常抛出: " + e.getMessage());
			return false;
		}
	
	}

}
