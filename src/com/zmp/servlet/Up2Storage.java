package com.zmp.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.sina.sae.storage.SaeStorage;
import com.sina.sae.util.SaeUserInfo;
import com.zmp.facean.tools.ImageCheck;
import com.zmp.facean.tools.RandomName;

/**
 * Servlet implementation class Up2Storage
 */
public class Up2Storage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Up2Storage() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/**
		 * 返回数据 100 提交不是表单的multipart形式 200 文件格式不对 300 文件大小超过了3M 500 上传失败,抛出异常
		 * "字符串(文件名)" 成功上传,返回文件名
		 */
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		//String path = "saestor://facean/upimg/" + RandomName.getName();
		String path = "E:\\uptest\\";
		//String path = "saestor://facean/upimg/";
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		//2sae
		String realPath= SaeUserInfo.getSaeTmpPath()+"/"; 
		if (isMultipart) {
			try {
				FileItemFactory factory = new DiskFileItemFactory();
				ServletFileUpload upload = new ServletFileUpload(factory);
				List<FileItem> items = upload.parseRequest(request);
				Iterator<FileItem> iterator = items.iterator();
				while (iterator.hasNext()) {
					FileItem item = (FileItem) iterator.next();
					if (ImageCheck.checkType(item.getContentType())) {
						if (item.getSize() <= 1024 * 1024 * 3) {
							/*String savename = RandomName.getName(ImageCheck
									.getSuf(item.getContentType()));
							File savedFile = new File(path, savename);
							item.write(savedFile);
							response.getWriter().print(savename);*/
							/*String savename = RandomName.getName(ImageCheck
									.getSuf(item.getContentType()));*/
							String savename = RandomName.getName();
							File fullFile = new File(item.getName());
							File uploadFile = new File(realPath,fullFile.getName());
		                    item.write(uploadFile);
							SaeStorage ss = new SaeStorage();
							ss.upload("facean", realPath + fullFile.getName(), "upimg/" + savename);
							response.getWriter().print(savename);
							/*//写到sae
							String savename = RandomName.getName(ImageCheck
									.getSuf(item.getContentType()));
							InputStream is = item.getInputStream();
							System.out.println(is.read());
							OutputStream op = new FileOutputStream("saestor://facean/upimg/" + savename);
							op.write(is.read());
							response.getWriter().print(savename);*/
						} else {
							response.getWriter().print("300");
						}
					} else {
						response.getWriter().print("200");
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				response.getWriter().println("500");
			}
		} else {
			response.getWriter().print("100");
		}
	}

}
