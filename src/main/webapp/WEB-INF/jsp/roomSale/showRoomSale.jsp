<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
    <title>消费记录信息页面</title>
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
<div align="center">
    <h1>消费记录界面</h1>
    <!--查询的表单-->
    <form class="layui-form" action="" lay-filter="roomSaleFormFilter" style="margin-top: 20px;">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">房间编号</label>
                <div class="layui-input-inline">
                    <input type="text" name="roomNum" autocomplete="off" class="layui-input" placeholder="请输入房间编号">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">时间范围</label>
                <div class="layui-input-inline" style="width: 420px;">
                    <input type="text" class="layui-input" id="timeText" placeholder="选则时间范围" name="timeText">
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="roomSaleButtonFilter"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
        </div>
    </form>
    <table id="roomSaleTableId" lay-filter="roomSaleTableFilter"></table>
</div>
<script src="js/showRoomSale.js"></script>
</body>
<script type="text/html" id="roomSaleToolbarId">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
</script>
</html>
