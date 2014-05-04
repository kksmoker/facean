package com.zmp.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zmp.facean.tools.DecodeImage;
import com.zmp.facean.tools.RandomName;

/**
 * Servlet implementation class ImagePath
 */
public class ImagePath extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ImagePath() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain");
		if (request.getParameter("data") == null) {
			response.getWriter().print("500");
		} else {			
			String data = (String) request.getParameter("data");
			data = data.substring(data.indexOf(',') + 1);
			String name = RandomName.getName();
			if (DecodeImage.up2Sae(data, name)) {
				request.getSession().setAttribute("name", name);
				response.getWriter().print(name);
			} else {
				response.getWriter().print("500");
			}
		}
	}

}
