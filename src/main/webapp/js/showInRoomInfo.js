layui.use(['jquery','form','table','laydate'],function () {
    var $ = layui.jquery,
        form = layui.form,
        table = layui.table,
        laydate = layui.laydate;

    init();

    /**
     * 初始化各种渲染和监听
     */
    function init() {
        loadTable();
        listener();
    }

    /**
     * 渲染出table，向其中填充数据
     * done : 每次加载渲染表格时候的回调函数
     */
    function loadTable(){
        table.render({
            elem: '#inRoomInfoTableId',
            height: 512,
            url: 'inRoomInfo/queryOfPageByParams.lh',
            limit: 5,
            limits: [3,5,8,10],
            page: true,
            even: true,
            cols: [[
                {field: 'id', title: 'ID', width:80, align:'center',sort: true}
                ,{field: 'roomNum', title: '房屋号', align:'center',width:100,templet: '<div>{{d.rooms.roomNum}}</div>'}
                ,{field: 'roomPic', title: '封面图',align:'center', width:100, sort: true,templet: '<div><img src="{{d.rooms.roomPic}}"/></div>'}
                ,{field: 'roomTypeName', title: '类型',align:'center', width:100,templet: '<div>{{d.rooms.roomType.roomTypeName}}</div>'}
                ,{field: 'roomPrice', title: '价格',align:'center',sort: true, width: 100,templet: '<div>{{d.rooms.roomType.roomPrice}}</div>'}
                ,{field: 'customerName', title: '客人姓名',align:'center', width: 120, sort: true}
                ,{field: 'gender', title: '性别',align:'center', width: 80, sort: true,templet: '#genderTpl'}
                ,{field: 'isVip', title: 'VIP', align:'center',width: 80,templet: '#isVipTpl'}
                ,{field: 'idcard', title: '身份证号',align:'center', width: 235, sort: true}
                ,{field: 'phone', title: '手机号',align:'center', width: 180, sort: true}
                ,{field: 'money', title: '押金',align:'center', width: 100, sort: true}
                ,{field: 'createDate', title: '入住时间',align:'center',sort: true, width: 215, sort: true}
                ,{field: 'outRoomStatus', title: '状态',align:'center', width: 120, sort: true,templet: '#outRoomStatusTpl'}
                ,{fixed: 'right', width:150,  title: '操作',align:'center', toolbar: '#toolbar01'}
            ]],
            done:function (res, curr, count) {
                hoverOpenImg();
            }
        });
    }

    /**
     * 这个方法里面做监听
     */
    function listener(){
        /**
         * 监听工具条
         */
        table.on("tool(inRoomInfoTableFilter)",function (obj) {
            var data = obj.data;
            var layEvent = obj.event;
            if (layEvent=='detail'){
                layer.msg("查看信息");
            }else if (layEvent=='del'){
                //点击删除就将inRoomInfo 表中status字段值改为0 表示不显示(不会被查询出来)
                layer.confirm("是否删除该行",function (index) {
                    var updateJson = {};
                    updateJson["id"] = data.id;
                    updateJson["status"] = 0;

                    $.ajax({
                        url:"inRoomInfo/updateByPrimaryKey.lh",
                        type:"POST",
                        dataType:"text",
                        data:updateJson,
                        success:function (data) {
                            if (data=='success'){
                                obj.del();
                                layer.msg("删除成功");
                            }else{
                                layer.msg("删除失败");
                            }
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });

                    layer.close(index);
                })
            }else if (layEvent=="edit"){
                //如果点击了退房按钮,填充数据，弹出退房界面，
                /**
                 * 先填充数据
                 * 第一个参数 : "checkOutFormFilter" 要弹出的表单的lay-filter属性值
                 * 第二个参数 : json格式给表单里面的标签赋值 {name:value}
                 */
                form.val("checkOutFormFilter",{
                    inRoomInfo_id : data.id,//不能叫id 是因为后面向orders表插入数据 使用id做name值  就会混淆
                    roomNum:data.rooms.roomNum,
                    customerName:data.customerName,
                    idcard: data.idcard,
                    roomPrice: data.rooms.roomType.roomPrice,
                    createDate: data.createDate
                });
                //是否会员 以及会员号的显示
                if (data.isVip==0){
                    $("#isVip").val("否");
                }else{
                    $("#isVip").val("是");
                    /**
                     * 然后加载会员号 ajax访问
                     * sync : false 表示同步请求
                     * 因为需要将获取的数据显示到页面上 所以需要同步请求 (异步请求的数据是不被允许在ajax外使用的)
                     */
                    $.ajax({
                        url:"vip/queryByParams.lh",
                        type:"POST",
                        dataType:"json",
                        sync:false,
                        data:{"idcard":data.idcard},
                        success:function(data){
                            $("#vipNum").val(data.vipNum);
                            $("#vipRate").val(data.vipRate);
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });
                }
                /**
                 * 退房日期的选择与默认值
                 * elem: 要设置时间插件的id
                 * type: 要显示的时间类型(date 或者 datetime)
                 */
                $("#endDate").val(getStringOfDate(new Date()));
                // laydate.render({
                //     elem:"#endDate",
                //     type:"datetime"
                // });
                /**
                 * 监听其它消费 标签的失去焦点事件
                 * 在事件中计算出最终消费
                 */
                var days,totalPrice;
                $("#otherPrice").blur(function () {
                    days = getDays($("#createDate").val(),$("#endDate").val());
                    totalPrice = $("#unitPrice").val()*days*$("#vipRate").val()+$("#otherPrice").val()*1;
                    $("#totalPrice").text(totalPrice);
                    $("#days").text(days);
                });

                /**
                 * 弹出界面
                 */
                layer.open({
                    type:1,
                    title:"退房信息界面",
                    area:['850px','610px'],
                    content:$("#checkOutDivId"),
                    anim:5
                });

                /**
                 * 监听表单
                 */
                form.on("submit(checkOutButtonFilter)",function (formData) {
                    /**
                     * 当点击了退房按钮后 要做的操作有
                     * 1，将当前房屋的状态改为打扫
                     * 2, 生成一条订单
                     */
                    //先拼接出要插入到order表的数据
                    var ordersJson = formData.field;
                    var orderNum = getDateNum(getStringOfDate(new Date())) + getRandomNumber(6);
                    ordersJson["orderNum"] = orderNum;
                    ordersJson["orderMoney"] = totalPrice;
                    ordersJson["orderStatus"] = 0;
                    ordersJson["iriId"] = ordersJson.inRoomInfo_id;
                    ordersJson["flag"] = 1;
                    var orderOther = ordersJson.roomNum+","+ordersJson.customerName+","+ordersJson.createDate+","+ordersJson.endDate+","
                    orderOther +=  days;
                    ordersJson["orderOther"] = orderOther;
                    var priceOfVip = totalPrice - ordersJson.otherPrice;//本行的otherPrice表示的是标签值 代表的是其它消费的值
                    var otherPrice = ordersJson.roomPrice+","+ordersJson.otherPrice+","+priceOfVip;
                    ordersJson["otherPrice"] = otherPrice;
                    console.log(ordersJson);

                    $.ajax({
                        url:"orders/insertSelective.lh",
                        type:"POST",
                        dataType:"text",
                        data:ordersJson,
                        success:function (data) {
                            if (data=="success"){
                                layer.msg("退房成功");
                            }else{
                                layer.msg("退房失败");
                            }
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });
                    return true;
                });
            }
        });
    }

    function flush(page) {
        /**
         * 将表格进行重新加载 重新访问后台加载数据 page表示刷新后显示第几页
         *
         */
        table.reload('empInfo', {
            page: {
                curr: page
            }
        });
    }

    //获取当前时间字符串     Date()   ---->  yyyy-MM-dd HH:mm:ss 格式的字符串
    function getStringOfDate(date) {
        var sign1 = "-";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    /**
     * 得到住宿的天数
     * @param startTime
     * @param endTime
     */
    function getDays(startTime,endTime){
        //将两个字符串转化为Date类型后使用getTime获取到毫秒数相减 再除以一天的毫秒数。结果向上取整
        var start = startTime.split(" ");
        var startOne = start[0].split("-");
        var startTwo = start[1].split(":");
        var end = endTime.split(" ");
        var endOne = end[0].split("-");
        var endTwo = end[1].split(":");
        var dateStart = new Date(startOne[0],startOne[1],startOne[2],startTwo[0],startTwo[1],startTwo[2]);
        var dateEnd = new Date(endOne[0],endOne[1],endOne[2],endTwo[0],endTwo[1],endTwo[2]);
        var dayTime = 24*60*60*1000;
        var days =   Math.ceil((dateEnd.getTime()-dateStart.getTime())/dayTime);
        return days;
    }

    /**
     * 将时间字符串去掉连接符和空格 eg:2019-11-18 17:45:33  ---->   20191118174533
     * 由于js里面没有replaceAll 方法 所以替换所有可以使用正则表达式  /要匹配的字符串/g  表示
     * 且replace 并不会改变字符串 而是返回结果字符串
     */
    function getDateNum(dateStr) {
        dateStr = dateStr.replace(/-/g,"");
        dateStr = dateStr.replace(/:/g,"");
        dateStr = dateStr.replace(/ /g,"");
        return dateStr;
    }

    /**
     * 得到一个随机的6位数
     * index 表示随机数的位数
     */
    function getRandomNumber(index) {
        var num="";
        for (var i = 0; i < index;i++){
            num = num + "" + Math.floor(Math.random()*10);
        }
        return num;
    }

    //放大图像
    function hoverOpenImg(){
        var img_show = null; // tips提示
        $('td img').hover(function(){
            var img = "<img class='img_msg' src='"+$(this).attr('src')+"' style='width:230px;' />";
            img_show = layer.tips(img, this,{
                tips:[2, 'rgba(41,41,41,.5)']
                ,area: ['260px']
            });
        },function(){
            layer.close(img_show);
        });
        $('td img').attr('style','max-width:70px');
    }
});