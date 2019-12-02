<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/28
  Time: 15:28
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
    <title>角色信息管理页面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">

    <!--引入ztree相关css和js文件-->
    <link rel="stylesheet" href="lib/zTree/css/icomoon_styles.css" type="text/css">
    <link rel="stylesheet" href="lib/zTree/css/metroStyle.css" type="text/css">
    <script type="text/javascript" src="lib/zTree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.exedit.js"></script>

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

    <!--添加树形结构容器-->
    <div id="treeDivId" class="content_wrap" style="display: none;">
        <div class="zTreeDemoBackground left">
            <ul id="tree" class="ztree"></ul>
        </div>
    </div>

    <table id="rolesTableId" lay-filter="rolesTableFilter"></table>
</div>
<script src="js/showRoles.js"></script>
</body>
<script type="text/html" id="rolesToolbarId">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
    {{#  if(d.status == 1){ }}
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="down">禁用</a>
    {{#  } else { }}
    <a class="layui-btn layui-btn-xs layui-btn-warm" lay-event="up">启用</a>
    {{#  } }}

</script>
<script type="text/html" id="statusTpl">
    {{#  if(d.status == 1){ }}
    <font color="#bdb76b">启用</font>
    {{#  } else { }}
    <font color="#dc143c">禁用</font>
    {{#  } }}
</script>
<script type="text/html" id="flagTpl">
    {{#  if(d.flag == 1){ }}
    <font color="#bdb76b">超级管理员</font>
    {{#  } else { }}
    <font color="#dc143c">管理员</font>
    {{#  } }}
</script>
</html>