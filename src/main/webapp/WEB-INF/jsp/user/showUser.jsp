<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/28
  Time: 15:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="utf-8" %>
<html>
<!--http://localhost:8080/-->
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <!--引用基础路径-->
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>用户信息管理页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
        .layui-table td img{
            width:60px;
            height: 60px;
        }
    </style>
</head>
<body>
<div algin="center">
    <table id="userTableId" lay-filter="userTableFilter"></table>
</div>
<script src="js/showUser.js"></script>
</body>
<script type="text/html" id="userToolbarId">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
</script>
<script type="text/html" id="useStatusTpl">
    {{#  if(d.useStatus == 1){ }}
    <font color="#bdb76b">启用</font>
    {{#  } else { }}
    <font color="#dc143c">禁用</font>
    {{#  } }}
</script>
</html>
