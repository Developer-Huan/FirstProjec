layui.use(['jquery','form'],function () {
    var $ = layui.jquery,
        form = layui.form;

    listener();

    function listener() {
        //能否提交表单的标志位
        var isIdCard = false;
        var isPhone = false;

        $("#idcard").blur(function () {
            //监听身份证号的失去焦点事件，判断该身份证是否已经存在
            var card = $("#idcard").val();
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!reg.test(card)){
                layer.tips("身份证号格式错误!","#idcard",{tips:[2,"#fc1505"],time:3000});
            }else{
                $("#idcard").blur(function () {
                    $.ajax({
                        url:"vip/isExisted",
                        type:"post",
                        dataType:"text",
                        async:false,
                        data:{"idcard":card},
                        success:function (data) {
                            if (data == "success"){
                                //表示查到了该条身份证，即该vip已存在 提示已存在
                                layer.tips("该会员已存在!","#idcard",{tips:[2,"#fc1505"],time:3000});
                            }else{
                                isIdCard = true;
                                layer.tips("该身份证号可使用!","#idcard",{tips:[2,"#30fc1a"],time:3000});
                            }
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });
                });
            }
        });

        //监听手机标签的失去焦点事件 判断其是否合格
        $("#phone").blur(function () {
            var phoneValue = $("#phone").val();
            var rex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if (!rex.test(phoneValue)){
                layer.tips("手机号格式错误!","#phone",{tips:[2,"#fc3120"],time:3000});
            }else{
                $.ajax({
                    url:"vip/isExisted",
                    type:"post",
                    dataType:"text",
                    data:{"phone":phoneValue},
                    async:false,
                    success:function (data) {
                        if (data == "success"){
                            layer.tips("该手机号已被使用!","#phone",{tips:[2,"#fc1505"],time:3000});
                        }else{
                            isPhone = true;
                            layer.tips("手机号可用!","#phone",{tips:[2,"#2cfc2e"],time:3000});
                        }
                    }
                });
            }
        });

        //监听下拉框的选择事件,根据vipRate的不同生成不同的会员号。凡是form.on table.on 里面都是使用lay-filter来绑定标签
        form.on("select(vipRate)",function (formData) {
            //由于下拉框里面只有option 所以formData 就相当于被选中的option 对象
            var vipRate = formData.value;
            var vipNum = getDateNum(getStringOfDate(new Date()));
            if (vipRate == "0.8"){
                //超级会员 后缀01
                vipNum += "01";
            }else if (vipRate){
                vipNum += "02";
            }
            $("#vipNum").val(vipNum);
        });



        //表单提交的监听
        form.on("submit(addVipButtonFilter)",function (formData) {
            if (isIdCard && isPhone){
                var data = formData.field;
                $.ajax({
                    url:"vip/insertSelective",
                    type:"post",
                    dataType:"text",
                    data:data,
                    async:false,
                    success:function (data) {
                        if (data == "success"){
                            layer.msg("数据添加成功")
                        }else{
                            layer.msg("数据添加失败");
                        }
                    },
                    error:function () {
                        layer.msg("服务器错误");
                    }
                });
            }else{
                layer.msg("请正确填写所有字段!");
            }
            return false;
        });

    }


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


})