<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/26
  Time: 8:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<%
    String path = request.getContextPath();
    String basePath=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>登录验证界面</title>
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <link rel="stylesheet" type="text/css" href="css/back/login.css" />
</head>

<body >
<div class="qiqiu1 qiqiu">
    <img src="http://q1cydzrcd.bkt.clouddn.com/q2.png" />
    <div class="text">韦氏集团</div>
</div>
<div class="qiqiu2 qiqiu">
    <img src="http://q1cydzrcd.bkt.clouddn.com/q3.png" />
    <div class="text">韦氏集团</div>
</div>
<div class="qiqiu3 qiqiu">
    <img src="http://q1cydzrcd.bkt.clouddn.com/q4.png" />
    <div class="text">韦氏集团</div>
</div>
<div class="qiqiu4 qiqiu">
    <img src="http://q1cydzrcd.bkt.clouddn.com/q5.png" />
    <div class="text">韦氏集团</div>
</div>
<div class="qiqiu5 qiqiu">
    <img src="http://q1cydzrcd.bkt.clouddn.com/q6.png" />
    <div class="text">韦氏集团</div>
</div>

<div class="qiqiu6 qiqiu">
    <img src="http://q1cydzrcd.bkt.clouddn.com/q2.png" />
    <div class="text">韦氏集团</div>
</div>


<div class="login" style="height: 300px;">
    <h1>用户后台登录</h1>
    <!--拦截后的提示 在js界面中将value弹出-->
    <input type="hidden" id="backMsg" value="${backMsg}">
    <form class="layui-form" action="" lay-filter="example">
        <div class="layui-form-item">
            <input id="userName" class="layui-input" name="username" placeholder="用户名"
                   lay-verify="required|userName" type="text" autocomplete="off">
        </div>
        <div class="layui-form-item">
            <input id="pwd" class="layui-input" name="pwd" placeholder="密码"
                   lay-verify="required|pwd" type="password" autocomplete="off">
        </div>
        <div class="layui-form-item">
            <input id="verifyCode" class="layui-input" placeholder="验证码(不区分大小写)"
                   type="text" autocomplete="off" style="margin-bottom: 10px;">
            <p align="center"><img src="login/getVerifyCode" onclick=flushCheckCode(this) alt="点击刷新验证码" style="cursor: hand" /></p>
        </div>
        <button type="button" class="layui-btn login_btn" lay-submit="" lay-filter="loginButtonFilter">登录</button>
    </form>
</div>

<script type="text/javascript">
    function flushCheckCode(obj) {
        obj.src = (obj.src + '?' + new Date())
    }
</script>

<script src="lib/layui/layui.js"></script>
<script src="js/login.js"></script>
</body>
</html>
