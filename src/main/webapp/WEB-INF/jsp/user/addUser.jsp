<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/30
  Time: 8:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"  pageEncoding="UTF-8" %>
<html>
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
</head>
<body>
<div align="center">
    <form class="layui-form" action="" lay-filter="userFormFilter">
        <div class="layui-form-item">
            <label class="layui-form-label">用户名:</label>
            <div class="layui-input-inline">
                <input type="text" name="username" id="username" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">密码:</label>
            <div class="layui-input-inline">
                <input type="password" name="pwd" required  lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
        </div>
        <!--isAdmin的作用还未找到 所以在这写个隐藏域 将所有的值都默认0-->
        <input type="hidden" name="isAdmin" value="0"/>
        <div class="layui-form-item">
            <label class="layui-form-label">用户角色类型：</label>
            <div class="layui-input-inline" style="width: 300px;">
                <select name="roleId" id="roleId" lay-filter="roleId" lay-verify="required"></select>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-inline">
                <button class="layui-btn" lay-submit lay-filter="addUserButtonFilter">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
</div>

<script src="js/addUser.js"></script>
</body>
</html>
