<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/19
  Time: 9:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
    <title>入住信息添加界面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>
<div align="center">
    <form class="layui-form" action="" lay-filter="vipFormFilter">
        <div class="layui-form-item">
            <label class="layui-form-label">是否会员:</label>
            <div class="layui-input-inline">
                <input type="radio" name="isVip" value="1" title="是" lay-filter="isVipFilter">
                <input type="radio" name="isVip" value="0" title="否" lay-filter="isVipFilter" checked>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">会员卡号:</label>
            <div class="layui-input-inline">
                <input type="text" name="vipNum" id="vipNum" required  lay-verify="required|number|vip_num" placeholder="请输入会员卡号" autocomplete="off" class="layui-input" disabled>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">客人姓名:</label>
            <div class="layui-input-inline">
                <input type="text" name="customerName" required  lay-verify="required" placeholder="请输入客人姓名" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">身份证号:</label>
            <div class="layui-input-inline">
                <input type="text" name="idcard" required lay-verify="required|identity" placeholder="请输入身份证号" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">手机号:</label>
            <div class="layui-input-inline">
                <input type="text" name="phone" required  lay-verify="required|phone" placeholder="请输入手机号" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">性别:</label>
            <div class="layui-input-inline">
                <input type="radio" name="gender" value="1" title="男">
                <input type="radio" name="gender" value="0" title="女" checked>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">请选择房间:</label>
            <div class="layui-input-inline">
                <select name="roomId" id="roomId" lay-verify="required"></select>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">入住时间:</label>
            <div class="layui-input-inline">
                <input type="text" name="createDate" id="createDate" required lay-verify="required" placeholder="请选择当前时间" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">押金:</label>
            <div class="layui-input-inline">
                <input type="text" name="money" value="200" required lay-verify="required" placeholder="请输入押金" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-inline">
                <button class="layui-btn" lay-submit lay-filter="addButtonFilter">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
</div>
<script src="js/addInRoomInfo.js"></script>
</body>
</html>
