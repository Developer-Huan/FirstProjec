layui.use(['jquery','form','table','laydate'],function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        laydate = layui.laydate;

    init();

    function init() {
        loadOrdersTable();
        listener();
    }

    function loadOrdersTable(params) {
        table.render({
            elem: '#ordersTableId',
            height: 512,
            url: 'orders/queryOfPageByParams.lh',
            where: params,
            limit: 5,
            limits: [3,5,8,10],
            page: true,
            even: true,
            cols: [[
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', width:80, align:'center',sort: true}
                ,{field: 'orderNum', title: '订单编号', align:'center',width:250}
                ,{field: 'customerName', title: '客人姓名',align:'center', width: 120, sort: true,templet: '<div>{{d.inRoomInfo.customerName}}</div>'}
                ,{field: 'idcard', title: '身份证号',align:'center', width: 230, sort: true,templet: '<div>{{d.inRoomInfo.idcard}}</div>'}
                ,{field: 'isVip', title: 'VIP', align:'center',width: 80,templet: '#isVipTpl'}
                ,{field: 'phone', title: '手机号',align:'center', width: 180, sort: true,templet: '<div>{{d.inRoomInfo.phone}}</div>'}
                ,{field: 'createDate', title: '下单时间',align:'center', width: 220, sort: true}
                ,{field: 'orderMoney', title: '总价',align:'center',sort: true, width: 120, sort: true}
                ,{field: 'remark', title: '备注',align:'center',sort: true, width: 235, sort: true}
                ,{field: 'orderStatus', title: '状态',align:'center', width: 120, sort: true,templet: '#orderStatusTpl'}
                ,{fixed: 'right', width:120,  title: '操作',align:'center', toolbar: '#ordersToolbarId'}
            ]]
        });
    }

    function listener() {
        //监听表单提交(模糊查询)
        form.on("submit(ordersButtonFilter)",function (data) {
            /**
             * 将表单数据中的时间拆分 添加到json 数据中 然后作为参数条件 查询出结果
             */
            var paramsJson = data.field;
            var timeArea = paramsJson.timeText.split("~");
            var startTime = timeArea[0];
            var endTime = timeArea[1];
            paramsJson["startTime"] = startTime;
            paramsJson["endTime"]  = endTime;
            //删除json数据中的多余的字段
            delete paramsJson.timeText;

            //不需要提交表单 只要重新加载表格就行了(携带参数)
            loadOrdersTable(paramsJson);
            return false;
        });

        /**
         * 对工具条的监听
         */
        table.on("tool(ordersTableFilter)",function (obj) {
            var layEvent = obj.event;
            var data = obj.data;
            if (layEvent == "del"){
                layer.confirm("确定删除该条记录吗?",function (index) {
                    $.ajax({
                        url:"orders/updateByPrimaryKey.lh",
                        type:"POST",
                        dataType:"text",
                        data:{"id":data.id,"flag":"0"},
                        success:function (backData) {
                            if (backData == "success"){
                                obj.del();
                                layer.msg("删除成功!");
                            }else{
                                layer.msg("删除失败!");
                            }
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });
                    layer.close(index);
                });
            }else if (layEvent == "alipay"){
                //携带数据跳转到支付页面 orderNum(订单编号) 和 orderMoney(要支付的金额)
                window.open("model/toOrderPay.lh?orderNum="+data.orderNum+"&orderMoney="+data.orderMoney);
            }

        });

        //监听批量删除按钮 因为不是submit 所以是对button的点击事件的监听
        $("#batchButtonId").click(function () {
            //获取被选中的数据行 然后如果其中含有未支付的行就提示无法删除 直到用户选择的不包含未支付的
            //table.checkStatus("table容器id") :  得到所有被选择了的行的对象
            var checkStatus = table.checkStatus("ordersTableId");
            //table.checkStatus("ordersTableId").data 表示获取行数据 数组形式表示
            var checkData  = checkStatus.data;
            console.log(checkData);
            if (checkData.length == 0){
                layer.msg("请选择要删除的行",{icon:3,time:2000,shade:0.5,anim:6});
            }else{
                var flag = true;
                var ids = '';
                //循环判断订单是否支付
                $.each(checkData,function (i,e) {
                    if (e.orderStatus=="0"){
                        flag = false;
                        layer.msg("无法删除未支付的行!",{icon:2,time:2000,shade:0.5,anim:6});
                        /**
                         * each循环中无法使用break和continue来结束循环 要跳出循环应该按如下方式
                         * 回调函数中使用return false表示跳出循环==break  , return true等价于 continue
                         */
                        return false;
                    }else{
                        //否则就向字符串添加数据
                        ids += e.id + ",";
                    }
                });
                //当flag为true的时候才发起Ajax请求
                if (flag){
                    $.ajax({
                        url:"orders/batchUpdateByPrimaryKey.lh",
                        type:"post",
                        dataType:"text",
                        data:{"ids":ids},
                        success:function (data) {
                            if (data == "success"){
                                flush(1);
                                layer.msg("批量删除成功!");
                            }else{
                                layer.msg("批量删除失败!");
                            }
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });
                }
            }
        });

    }

    function flush(page){
        table.reload("ordersTableId",{
            page:{
                curr:page
            }
        });
    }

    laydate.render({
        elem:"#timeText",
        type:"datetime",
        range: "~" //开启时间范围选择 并且以 ~ 作为分隔符 range : true 表示开启选择
    });
});