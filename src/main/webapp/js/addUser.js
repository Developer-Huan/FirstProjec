layui.use(['jquery','form'],function () {
    var $ = layui.jquery,
        form = layui.form;

    init();

    function init() {
        loadRolesSelect();
        listener();
    }

    //加载权限的下拉框
    function loadRolesSelect() {
        $.ajax({
            url:"roles/queryAllByParams.lh",
            type:"post",
            dataType:"json",
            success:function (data) {
                var optionStr = "<option value=''>==请选择用户对应的角色==</option>";
                $.each(data,function (i, e) {
                    optionStr += "<option value='"+ e.id +"'>" + e.roleName + "</option>";
                });
                $("#roleId").html(optionStr);
                form.render("select");
            }
        });
    }

    function listener() {
        var isUsername = false;
        //用户名 失去焦点事件判断是否已存在
        $("#username").blur(function () {
            var usernameValue = $(this).val();
            if (usernameValue == ''){
                layer.tips("用户名不能为空!","#username",{tips:[2,"#fc1505"],time:3000});
            } else{
               isUsername = checkUsername(usernameValue);
               if (isUsername) {
                   layer.tips("用户名可用!","#username",{tips:[2,"#63fc41"],time:3000});
               }else{
                   layer.tips("该用户已存在!","#username",{tips:[2,"#fc1505"],time:3000});
               }
            }
        });

        //监听表单的提交
        form.on("submit(addUserButtonFilter)",function (formData) {
           if (!isUsername){
               layer.msg("请正确填写数据!");
           }else if (!checkUsername($("#username").val())){
               layer.msg("用户名重复!");
           }  else{
               var paramsJson = formData.field;
               //当前paramsJson 要组成一个完整的userBean 还差 createDate = 当前时间; useStatus = 1(刚建立的用户是可用的)
               paramsJson["useStatus"] = 1;
               paramsJson["createDate"] = getStringOfDate(new Date());
               $.ajax({
                   url : "user/insertSelective.lh",
                   type:"post",
                   dataType:"text",
                   data:paramsJson,
                   success:function (data) {
                       if (data == "success") {
                           layer.msg("创建用户成功!");
                       }else{
                           layer.msg("创建用户失败!");
                       }
                   },
                   error:function () {
                       layer.msg("创建用户服务器错误!");
                   }
               });
           }
           return false;
        });
    }

    //获取时间对应的字符串     Date()   ---->  yyyy-MM-dd HH:mm:ss 格式的字符串
    function getStringOfDate(date) {
        var sign1 = "-";
        var sign2 = ":";
        var year = date.getFullYear(); // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds(); //秒
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


    //验证用户名是否可用 返回 true:可以添加  false:不能添加
    function checkUsername(usernameValue) {
        //访问数据库看该用户是否存在
        var isUsername = false;
        $.ajax({
            url : "user/checkUsername.lh",
            type:"post",
            dataType:"text",
            async:false,
            data:{"username":usernameValue},
            success:function (data) {
                if (data != "success") {
                    isUsername = true;
                }
            },
            error:function () {
                layer.msg("验证用户名服务器错误!");
            }
        });
        return isUsername;
    }
});