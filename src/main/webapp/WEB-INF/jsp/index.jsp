<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
String path = request.getContextPath();
String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<head>
	<base href="<%=basePath%>"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>韦氏集团酒店管理系统</title>
	<link rel="stylesheet" href="lib/layui/css/layui.css">
	<link rel="stylesheet" type="text/css" href="css/back/djin-layui.css" />
	<link rel="shortcut icon" href="favicon.ico" />
</head>
<body class="layui-layout-body hp-white-theme">
<div class="layui-layout layui-layout-admin">
	<div class="layui-header">
		<div class="layui-logo">
			韦氏集团酒店管理系统
		</div>
		<!-- 头部区域（可配合layui已有的水平导航） -->
		<ul class="layui-nav layui-layout-left">
			<c:forEach items="${authList}" var="map">
				<li class="layui-nav-item">
					<a href="javascript:;"><i class="layui-icon">&#xe63c;</i>${map.authorityName}</a>
					<dl class="layui-nav-child">

						<c:forEach items="${map.authority}" var="auth">
							<dd>
								<a class="hp-tab-add" hp-href="${auth.authorityUrl}" href="javascript:;" >${auth.authorityName}</a>
							</dd>
						</c:forEach>
					</dl>
				</li>
			</c:forEach>
		</ul>
		<ul class="layui-nav layui-layout-right">
			<li id="time" class="layui-nav-item"></li>
			<li class="layui-nav-item" style="margin-left: 30px;"><iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=10" width="300" height="25" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" ></iframe></li>
			<li class="layui-nav-item">
				<span class="hp-kd" style="color: red">${htUser.username }</span>
			</li>
			<li class="layui-nav-item">
				<a class="name" href="javascript:;"><i class="layui-icon"></i>主题<span class="layui-nav-more"></span></a>
				<dl class="layui-nav-child layui-anim layui-anim-upbit">
					<dd>
						<a skin="hp-black-theme" class="hp-theme-skin-switch"  href="javascript:;">低调黑</a>
					</dd>
					<dd >
						<a skin="hp-blue-theme" class="hp-theme-skin-switch" href="javascript:;">炫酷蓝</a>
					</dd>
					<dd>
						<a skin="hp-green-theme" class="hp-theme-skin-switch"  href="javascript:;">原谅绿</a>
					</dd>
				</dl>
			</li>
			<li class="layui-nav-item" style="color: lightyellow;">
				<c:if test="${user.isAdmin == '1'}">
					超级管理员
				</c:if>
				<c:if test="${user.isAdmin == '0'}">
					管理员
				</c:if>
			</li>
			<li class="layui-nav-item">
				<a href="javascript:;" id="zhuxiao">注销</a>
			</li>
			<li class="layui-nav-item">
				<a href="javascript:;" id="exit">退出</a>
			</li>

		</ul>
	</div>

	<div class="layui-side hp-left-menu">
		<div class="layui-side-scroll">
			<!-- 左侧导航区域（可配合layui已有的垂直导航） -->
			<ul class="layui-nav hp-nav-none">
				<li class="layui-nav-item">
					<a href="javascript:;"  class="hp-user-name">
						<img src="http://q1ivuydqx.bkt.clouddn.com/headimage.PNG" class="layui-circle-img layui-anim-upbit">
						<span class="hp-kd">${user.username}</span>
					</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="javascript:;">基本资料</a>
						</dd>
						<dd>
							<a href="javascript:;">密码修改</a>
						</dd>
					</dl>
				</li>
			</ul>
			<ul class="layui-nav layui-nav-tree" lay-filter="test">
			<c:forEach items="${authList}" var="map">
				<li class="layui-nav-item">
					<a href="javascript:;"><i class="layui-icon">&#xe63c;</i>${map.authorityName}</a>
					<dl class="layui-nav-child" style="padding-left: 15px">

						<c:forEach items="${map.authority}" var="auth">
							<dd>
								<a class="hp-tab-add" hp-href="${auth.authorityUrl}" href="javascript:;" >${auth.authorityName}</a>
							</dd>
						</c:forEach>
					</dl>
				</li>
			</c:forEach>
			</ul>
		</div>
	</div>

	<div class="layui-body">
		<!-- 内容主体区域 -->
		<div class="layui-tab hp-tab " style="" lay-filter="hp-tab-filter" lay-allowclose="true">
			<ul class="layui-tab-title" style="">
				<li class="layui-this" lay-id="0">首页</li>
			</ul>
			<div class="layui-tab-content">
				<div class="layui-tab-item layui-show">
					<div class="layui-carousel" id="test1">
						<div carousel-item style="height: 750px;">
							<div>
								<div class="layui-bg-green demo-carousel" style="background: url('http://q1ivuydqx.bkt.clouddn.com/4dd439bea9824a018c8851721a0d4ad1');background-size: cover">
									<p style="font-size: 30px;">韦氏集团酒店管理系统</p>
									<p style="font-size: 28px;">${htUser.username }</p>
								</div>
							</div>
							<div>
								<div class="layui-bg-red demo-carousel" style="background: url('http://q1ivuydqx.bkt.clouddn.com/490b0ab29b3642afb0a5f9fb1405fbfc');background-size: cover">
									<p style="font-size: 30px;">韦氏集团酒店管理系统</p>
									<p style="font-size: 28px;">${htUser.username }</p>
								</div>
							</div>
							<div>
								<div class="layui-bg-blue demo-carousel" style="background: url('http://q1ivuydqx.bkt.clouddn.com/f01e5c59549844c2809890e093ce3e58');background-size: cover">
									<p style="font-size: 30px;">韦氏集团酒店管理系统</p>
									<p style="font-size: 28px;">${htUser.username }</p>
								</div>
							</div>
							<div>
								<div class="layui-bg-orange demo-carousel" style="background: url('http://q1ivuydqx.bkt.clouddn.com/dd8caf4e467d4d80aa32d9013ea56000');background-size: cover">
									<p style="font-size: 30px;">韦氏集团酒店管理系统</p>
									<p style="font-size: 28px;">${htUser.username }</p>
								</div>
							</div>
							<div>
								<div class="layui-bg-cyan demo-carousel" style="background: url('http://q1ivuydqx.bkt.clouddn.com/a2234446511b4b70b425eb9df5272538');background-size: cover">
									<p style="font-size: 30px;">韦氏集团酒店管理系统</p>
									<p style="font-size: 28px;">${htUser.username }</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="layui-footer">
		<!-- 底部固定区域 -->
		© 韦氏集团
	</div>
</div>
		
		<script src="lib/layui/layui.js"></script>
		<script src="js/index.js"></script>
</body>
</html>