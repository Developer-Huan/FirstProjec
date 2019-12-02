layui.use(['jquery','form','table','laydate','layer'],function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        layer = layui.layer,
        laydate = layui.laydate;

    init();

    function init() {
        loadVipTable();
        listener();
    }

    function loadVipTable(params) {
        table.render({
            elem: '#vipTableId',
            height: 512,
            url: 'vip/queryOfPageByParams.lh',
            where: params,
            limit: 5,
            limits: [3,5,8,10],
            page: true,
            even: true,
            cols: [[
                {field: 'id', title: 'ID', width:80, align:'center',sort: true}
                ,{field: 'vipNum', title: '会员卡号', align:'center',width:200,sort: true}
                ,{field: 'customerName', title: '客人姓名',align:'center', width: 120, sort: true}
                ,{field: 'gender', title: '性别',align:'center',sort: true, width: 80, sort: true, templet:"#genderTpl"}
                ,{field: 'vipRate', title: '会员等级',align:'center', width: 100, sort: true, templet: "#vipRateTpl"}
                ,{field: 'idcard', title: '身份证号', align:'center',width: 200}
                ,{field: 'phone', title: '手机号',align:'center', width: 180, sort: true}
                ,{field: 'createDate', title: '会员办理日期',align:'center', width: 200, sort: true}
                ,{fixed: 'right', width:120,  title: '操作',align:'center', toolbar: '#vipToolbarId'}
            ]]
        });
    }

    function listener() {
        //查询按钮的监听
        form.on("submit(vipButtonFilter)",function (formData) {
            var paramsJson = formData.field;
            console.log(paramsJson);
            loadVipTable(paramsJson);
            return false;
        });

        //工具栏的监听
        table.on("tool(vipTableFilter)",function (obj) {
            var layEvent = obj.event;
            var data = obj.data;
            if (layEvent == "detail"){
                layer.msg("你查看了该行");
            }else if (layEvent == "edit"){
                //向隐藏div 填充数据 然后将其弹出
                $("#phone").val(data.phone);
                //因为就两个选项 所以使用拼接的方式加载下拉框
                var optionStr = "";
                if (data.vipRate == "0.8"){
                    optionStr = "<option value='0.8' selected>超级会员</option><option value='0.9'>会员</option>";
                }else{
                    optionStr = "<option value='0.9'>会员</option><option value='0.8'>超级会员</option>";
                }
                $("#vipRateDisplayId").html(optionStr);
                form.render("select");

                layer.open({
                    type:1,
                    title:"vip信息修改界面",
                    area:['500px','300px'],
                    content:$("#updateDivId"),
                    anim:5
                })
                //监听修改按钮的提交
                form.on("submit(updateButtonFilter)",function (formData) {
                    var dataJson = formData.field;
                    dataJson["id"] = data.id;
                    $.ajax({
                        url:"vip/updateByPrimaryKey.lh",
                        type:"POST",
                        dataType:"text",
                        data:dataJson,
                        success:function (data) {
                            if (data == "success"){
                                obj.update({
                                    phone: dataJson.phone
                                    ,vipRate: dataJson.vipRate
                                });
                                layer.msg("修改成功!");
                            }else{
                                layer.msg("修改失败!");
                            }
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });
                    //阻止表单跳转
                    layer.closeAll();
                    return false;
                });
            }
        });
    }

    function flush(page) {
        table.reload('vipTableId', {
            page: {
                curr: page
            }
        });

    }

});