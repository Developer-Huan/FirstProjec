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
    <title>标题</title>
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
        <h1>入住信息查询</h1>
        <table id="inRoomInfoTableId" lay-filter="inRoomInfoTableFilter"></table>
    </div>
    <!--引入退房的div-->
    <jsp:include page="checkOut.jsp"/>
</body>
<script src="js/showInRoomInfo.js"></script>

<!--定义自定义模板 供js引用 模板内容的写法在html页面和js文件的写法极其相似 js使用‘’将模板内容包裹-->
<script type="text/html" id="genderTpl">
    <!--在双层花括号里面写js代码-->
    {{# if(d.gender==1){  }}
        <font color="blue">男</font>
    {{# }else{ }}
        <font color="yellow">女</font>
    {{# } }}
</script>
<!--房屋入住信息自定义模板-->
<script type="text/html" id="outRoomStatusTpl">
    {{#  if(d.outRoomStatus == 1){ }}
    <font color="#90ee90">已退房</font>
    {{#  } else { }}
    <font color="#dc143c">未退房</font>
    {{#  } }}
</script>

<!--添加工具条 使用模板 第一个按钮是查看 第二个按钮的位置 根据是否退房的状态加载不同的按钮 已退房就是删除 未退房就是退房-->
<script type="text/html" id="toolbar01">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
    {{#  if(d.outRoomStatus == 0){ }}
        <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="edit">退房</a>
    {{#  } else { }}
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    {{#  } }}
</script>
</html>