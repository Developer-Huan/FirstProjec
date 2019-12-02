<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/20
  Time: 13:29
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
    <title>订单信息显示界面</title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
    </style>
</head>
<body>
<div align="center">
    <h1>订单显示</h1>
    <!--查询的表单-->
    <form class="layui-form" action="" lay-filter="orderFormFilter" style="margin-top: 20px;">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">订单编号</label>
                <div class="layui-input-inline">
                    <input type="text" name="orderNum" autocomplete="off" class="layui-input" placeholder="请输入订单编号">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">时间范围</label>
                <div class="layui-input-inline" style="width: 420px;">
                    <input type="text" class="layui-input" id="timeText" placeholder="选则时间范围" name="timeText">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">订单状态</label>
                <div class="layui-input-inline">
                    <select name="orderStatus">
                        <option value="" selected>全部</option>
                        <option value="1">已支付</option>
                        <option value="0">未支付</option>
                    </select>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="ordersButtonFilter"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button type="button" class="layui-btn layui-btn-danger" id="batchButtonId"><i class="layui-icon">&#xe640;</i>批量删除</button>
                </div>
            </div>
        </div>
    </form>

    <table id="ordersTableId" lay-filter="ordersTableFilter"></table>
</div>
<script src="js/showOrders.js"></script>
</body>
<!--是否会员自定义模板-->
<script type="text/html" id="isVipTpl">
    {{#  if(d.inRoomInfo.isVip == 1){ }}
    <font color="red">是</font>
    {{#  } else { }}
    <font color="gray">否</font>
    {{#  } }}
</script>
<!--房屋入住信息自定义模板-->
<script type="text/html" id="orderStatusTpl">
    {{#  if(d.orderStatus == 1){ }}
    <font color="green">已结算</font>
    {{#  } else { }}
    <font color="red">未结算</font>
    {{#  } }}
</script>
<!--工具条-->
<script type="text/html" id="ordersToolbarId">
    {{#  if(d.orderStatus == 0){ }}
    <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="alipay">支付</a>
    {{#  } else { }}
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    {{#  } }}
</script>
</html>
