<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/24
  Time: 11:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>房间信息添加界面</title>
</head>
<body>
<!--房间添加的表单-->
<div style="display: none;margin-top: 20px;" id="addRoomsDivId">
    <!--做文件上传的div-->
    <div class="layui-upload" align="center" style="margin-bottom: 20px;">
        <div class="layui-upload-list">
            <img class="layui-upload-img" id="imgId" src="/image/icon001.png" width="150px" height="150px"/>
            <p id="uploadStatus"></p>
        </div>
        <button type="button" class="layui-btn" id="uploadButtonId">上传图片</button>
    </div>

    <form class="layui-form layui-form-pane" action="" style="margin-left: 50px;">
        <!--使用隐藏域来存储对应图片的名字 没次上传图片成功的时候就将其重新赋值 -->
        <input type="hidden" name="roomPic" id="roomPic" value="icon001.png"/>
        <div class="layui-form-item">
            <label class="layui-form-label">房间号：</label>
            <div class="layui-input-inline">
                <input type="text" id="roomNum" name="roomNum" placeholder="请输入房间号" lay-verify="required|number" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">房间类型：</label>
            <div class="layui-input-inline">
                <select id="roomTypeId" name="roomTypeId" lay-verify="required"></select>
            </div>
        </div>
        <div class="layui-form-item" style="margin-left: 70px;margin-top: 30px;">
            <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="submitButtonFilter"><i class="layui-icon">&#xe605;</i>提交</button>
        </div>
    </form>
</div>

</body>
</html>
