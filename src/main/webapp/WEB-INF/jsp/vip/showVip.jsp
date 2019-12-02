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
    <!--隐藏DIV-->
    <div align="center" id="updateDivId" style="display: none;margin-top: 20px;">
        <form class="layui-form layui-form-pane" action="" lay-filter="updateFormFilter" style="margin-left: 50px;">
            <div class="layui-form-item">
                <label class="layui-form-label">手机号:</label>
                <div class="layui-input-inline">
                    <input type="text" name="phone" id="phone" lay-verify="required|pbone" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">会员等级</label>
                <div class="layui-input-inline">
                    <select name="vipRate" id="vipRateDisplayId"></select>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="updateButtonFilter"><i class="layui-icon">&#xe615;</i>提交</button>
                </div>
            </div>
        </form>
    </div>
    <h1>消费记录界面</h1>
    <!--查询的表单-->
    <form class="layui-form" action="" lay-filter="roomSaleFormFilter" style="margin-top: 20px;">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">身份证号</label>
                <div class="layui-input-inline">
                    <input type="text" name="idcard" autocomplete="off" class="layui-input" placeholder="身份证号模糊查询">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">会员卡号</label>
                <div class="layui-input-inline" style="width: 420px;">
                    <input type="text" class="layui-input" id="vipNum" name="vipNum" placeholder="会员卡号模糊查询">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">会员等级</label>
                <div class="layui-input-inline">
                    <select name="vipRate">
                        <option value="" selected>全部</option>
                        <option value="0.8">超级会员</option>
                        <option value="0.9">普通会员</option>
                    </select>
                </div>
            </div>
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn" lay-submit="" lay-filter="vipButtonFilter"><i class="layui-icon">&#xe615;</i>查询</button>
                </div>
            </div>
        </div>
    </form>
    <table id="vipTableId" lay-filter="vipTableFilter"></table>
</div>

<script src="js/showVip.js"></script>
</body>
<script type="text/html" id="genderTpl">
    {{#  if(d.gender == 1){ }}
    <div>男</div>
    {{#  } else { }}
    <div>女</div>
    {{#  } }}
</script>
<script type="text/html" id="vipRateTpl">
    {{#  if(d.vipRate == 0.8){ }}
    <font color="#bdb76b">超级会员</font>
    {{#  } else { }}
    <font color="#dc143c">会员</font>
    {{#  } }}
</script>
<script type="text/html" id="vipToolbarId">
    <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
    <a class="layui-btn layui-btn-xs layui-btn layui-btn-warm" lay-event="edit">修改</a>
</script>
</html>
