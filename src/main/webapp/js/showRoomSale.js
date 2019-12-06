layui.use(['jquery','form','table','laydate','layer'],function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        layer = layui.layer,
        laydate = layui.laydate;

    init();

    function init() {
        loadRoomSaleTable();
        listener();
    }

    function loadRoomSaleTable(params) {
        table.render({
            elem: '#roomSaleTableId',
            height: 512,
            url: 'roomSale/queryOfPageByParams',
            where: params,
            limit: 5,
            limits: [3,5,8,10],
            page: true,
            even: true,
            cols: [[
                {field: 'id', title: 'ID', width:80, align:'center',sort: true}
                ,{field: 'roomNum', title: '房间号', align:'center',width:150,sort: true}
                ,{field: 'customerName', title: '客人姓名',align:'center', width: 120, sort: true}
                ,{field: 'startDate', title: '开始时间',align:'center', width: 200, sort: true}
                ,{field: 'endDate', title: '退房时间', align:'center',width: 200}
                ,{field: 'days', title: '住房天数',align:'center', width: 180, sort: true}
                ,{field: 'roomPrice', title: '房屋单价',align:'center', width: 120, sort: true}
                ,{field: 'rentPrice', title: '折后价格',align:'center',sort: true, width: 120, sort: true}
                ,{field: 'otherPrice', title: '其它消费',align:'center',sort: true, width: 120, sort: true}
                ,{field: 'salePrice', title: '实付金额',align:'center', width: 120, sort: true}
                ,{field: 'discountPrice', title: '优惠金额',align:'center', width: 120, sort: true}
                ,{fixed: 'right', width:120,  title: '操作',align:'center', toolbar: '#roomSaleToolbarId'}
            ]]
        });
    }

    function listener() {
        //监听表单的提交
        form.on("submit(roomSaleButtonFilter)",function (formData) {
            //将时间切割为开始时间和结束时间 添加到json参数中去
            var paramsJson = formData.field;
            var timeArea = paramsJson.timeText.split("~");
            var startTime = timeArea[0];
            var endTime = timeArea[1];
            paramsJson["startTime"] = startTime;
            paramsJson["endTime"]  = endTime;
            //删除json数据中的多余的字段
            delete paramsJson.timeText;
            //不需要提交表单 只要重新加载表格就行了(携带参数)
            loadRoomSaleTable(paramsJson);;
            return false;

        });

        //监听工具条
        table.on("tool(roomSaleTableFilter)",function (obj) {
            var layEvent = obj.event;
            if (layEvent=="detail"){
                layer.msg("你查看了。。。。");
            }
        })
    }

    laydate.render({
        elem:"#timeText",
        type:"datetime",
        range: "~" //开启时间范围选择 并且以 ~ 作为分隔符 range : true 表示开启选择
    });


})