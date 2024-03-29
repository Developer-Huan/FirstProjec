<%--
  Created by IntelliJ IDEA.
  User: liuhuan
  Date: 2019/11/18
  Time: 9:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>退房界面</title>
</head>
<body>
<div style="display: none;margin-top: 20px;" id="checkOutDivId">
    <form class="layui-form layui-form-pane" action="" lay-filter="checkOutFormFilter" style="margin-left: 50px;">
        <input type="hidden" name="inRoomInfo_id"/>
        <input type="hidden" name="vipRate" id="vipRate" value="1"/>
        <div class="layui-form-item">
            <label class="layui-form-label">房间号：</label>
            <div class="layui-input-inline">
                <input type="text" name="roomNum" id="roomsNum" lay-verify="required" autocomplete="off" class="layui-input" disabled>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">客人姓名：</label>
                <div class="layui-input-block">
                    <input type="text" name="customerName" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">身份证号：</label>
                <div class="layui-input-inline">
                    <input type="text" name="idcard" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">是否会员：</label>
                <div class="layui-input-block">
                    <input type="text" name="isVip" id="isVip" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">会员卡号：</label>
                <div class="layui-input-inline">
                    <input type="text" name="vipNum" id="vipNum" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">房间单价：</label>
                <div class="layui-input-block">
                    <input type="text" name="roomPrice" id="unitPrice" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">其它消费：</label>
                <div class="layui-input-inline">
                    <input type="text" name="otherPrice" id="otherPrice" lay-verify="number|otherPrice" value="0" autocomplete="off" class="layui-input" placeholder="请输入金额" >
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">入住时间：</label>
                <div class="layui-input-block">
                    <input type="text" name="createDate" id="createDate" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">退房时间：</label>
                <div class="layui-input-inline">
                    <input type="text" name="endDate" id="endDate" autocomplete="off" class="layui-input" disabled/>
                </div>
            </div>
        </div>
        <div class="layui-form-item layui-form-text" style="width: 600px;">
            <label class="layui-form-label">退房备注</label>
            <div class="layui-input-block">
                <textarea rows="2" placeholder="请输入内容" lay-verify="required" name="remark" class="layui-textarea"></textarea>
            </div>
        </div>
        <div class="layui-form-item">
            <span style="margin-left: 20px;">住房天数：</span>
            <span style="font-size: 30px;color: green" id="days"></span>天
            <span style="margin-left: 160px;">消费总额：￥</span>
            <span style="font-size: 40px;color: red" id="totalPrice"></span>元
        </div>
        <div class="layui-form-item" style="margin-left: 70px;">
            <button id="checkOutButtonId" class="layui-btn layui-btn-lg" lay-submit="" lay-filter="checkOutButtonFilter"><i class="layui-icon">&#xe605;</i>结账退房</button>
        </div>
    </form>
</div>
</body>
</html>
