package com.zmp.facean.tools;

public class ImageCheck {
	public static boolean checkType(String type) {
		String pre;
		String suf;
		int pos = type.lastIndexOf('/');
		pre = type.substring(0, pos);
		suf = type.substring(pos + 1);
		if ("image".equals(pre)) {
			String[] accept = {"jpeg", "png", "gif", "bmp"}; 
			for (int i = 0; i < 4; i++) {
				if (suf.equals(accept[i])) {
					return true;
				}
			}
			return false;
		} else {
			return false;
		}
	}
	
	public static String getSuf(String type) {
		int pos = type.lastIndexOf('/');
		return type.substring(pos + 1); 
	}
}
