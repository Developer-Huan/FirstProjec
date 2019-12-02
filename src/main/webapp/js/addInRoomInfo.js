layui.use(['jquery','form','laydate'],function () {
    var $ = layui.jquery,
        form = layui.form,
        laydate = layui.laydate;

    init();

    function init() {
        loadSelect();
        listener();
        showDateOfText();
    }

    /**
     * 首先向下拉框中填充数据
     */
    function loadSelect() {
        //定义json,查询出可用的房间列表 roomStatus=0 表示查询处于未入住状态的房间
        var roomJson = {};
        roomJson["roomStatus"] = 0;
        console.log(roomJson);
        $.ajax({
            url:"rooms/queryAllByParams.lh",
            type:"POST",
            dataType:"json",
            data:roomJson,
            async:false,
            success:function (data) {
                var optionStr = "<option value=''>--请选择房间信息--</option>";
                $.each(data,function (i, e) {
                    optionStr += "<option value='"+e.id+"'>"+e.roomType.roomTypeName+" - ￥"+e.roomType.roomPrice+"</option>"
                });
                $("#roomId").html(optionStr);
                form.render("select");
            },
            error:function () {
                layer.msg("服务器错误!");
            }
        });
    }

    /**
     * 所有的监听操作
     */
    function listener() {
        //对是否会员按钮的监听
        /**
         * layui的监听事件中 radio的监听里面
         * data.value 表示 当前点击的radio 的value值
         * data.elem 表示原始的radio 的DOM对象
         */
        form.on("radio(isVipFilter)",function (data) {
            var value = data.value;
            /**
             * 判断点击的是哪一个 然后清空数据 设置不可用
             */
            if(value==1){//选中了会员，就将某些输入框设置位不可用 disabled
                $("#vipNum").removeAttr("disabled");
                for (var i = 3;i <=5;i++){
                    $(":input").eq(i).val("");
                    loadSelect();
                    $(":input").eq(i).attr("disabled","disabled");
                }

            }else{
                $("#vipNum").attr("disabled","disabled");
                for (var i = 3;i <=5;i++){
                    $(":input").eq(i).val("");
                    $("#vipNum").val("");
                    loadSelect();
                    $(":input").eq(i).removeAttr("disabled");
                }
            }
        });

        /**
         * 对会员号失去焦点事件的监听 当失去焦点的时候通过会员号 将数据从数据库中查询出来 并显示到表单里面
         */
        $("#vipNum").blur(function () {
            if ($(this).val().length != 16){
                //tip是弹出指向指定标签的提示
                layer.tips('卡号格式输入有误！', '#vipNum', {tips: [2,'#fc1505'], time:3000});  //吸附框
            }else{
                //加载数据
                $.ajax({
                    url:"vip/queryByParams.lh",
                    type:"POST",
                    dataType:"json",
                    data:{"vipNum":$("#vipNum").val()},
                    success:function (data) {
                        if (data!=""){
                            //通过得到的数据将标签赋值
                            form.val("vipFormFilter",{
                                "customerName": data.customerName,
                                "idcard": data.idcard,
                                "phone": data.phone,
                            })
                            //选中性别
                            if (data.gender === "1"){
                                $(":radio").eq(2).attr("checked","true");
                            }else{
                                $(":radio").eq(3).attr("checked","true");
                            }
                            form.render("radio");
                        }else{
                            layer.tips('没有该会员！', '#vipNum', {tips: [2,'#fc1505'], time:3000});
                        }

                    },
                    error:function () {
                        layer.msg("服务器错误!");
                    }
                });
            }
        });

        /**
         * 监听表单的提交
         */
        form.on("submit(addButtonFilter)",function (data) {
            console.log(data.field);
            //需要自己给两个参数赋值(status=1 outRoomStatus=0) 其它字段表达那数据中都有
            var inRoomInfoJson = data.field;
            inRoomInfoJson["status"] = 1;
            inRoomInfoJson["outRoomStatus"] = 0;

            $.ajax({
                url:"inRoomInfo/insertSelective.lh",
                type:"POST",
                dataType:"text",
                data:inRoomInfoJson,
                success:function (data) {
                    if (data=="success"){
                        layer.msg("插入成功!");
                        setTimeout("window.location='model/toShowInRoomInfo.lh'",1000);
                    }else{
                        layer.msg("插入失败!");
                    }
                },
                error:function () {
                    layer.msg("服务器错误!");
                }
            });
            return false;
        });

    }


    /**
     * 自定义的表单验证
     */
    form.verify({
        money: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value<0) {
                return '押金不能小于0';
            }
        },
        vip_num: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value<0) {
                return '会员卡号不能为负数';
            }
        }
    });

    //获取时间对应的字符串     Date()   ---->  yyyy-MM-dd HH:mm:ss 格式的字符串
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

    function showDateOfText() {
        laydate.render({
            elem:"#createDate",
            type:"datetime"
        });
    }

});