layui.use(['jquery','form','table','layer', 'upload'],function () {
    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        upload = layui.upload;

    init()

    function init() {
        loadRoomsData();
        listener();
    }

    /**
     * 房屋信息的显示使用的是: ul 下面动态添加 li 的模式，通过对房屋状态(roomStatus)的判断将其分类到不同的ul下面
     */
    function loadRoomsData() {
        //先获取数据 不分页的数据 queryAllByParams
        $.ajax({
            url:"rooms/queryAllByParams.lh",
            type:"POST",
            dataType:"json",
            success:function (data) {
                var ul1 = '';
                var ul2 = '';
                var ul3 = '';
                //获取到三个ul的数组对象
                var uls = $("ul");
                $.each(data,function (index, element) {
                    //判断类型 然后添加到不同的字符串
                    if (element.roomStatus=="0"){
                        ul1 += '<li style="background-color: #009688;">';
                        ul1 += '<img class="layui-anim"  src="'+element.roomPic+'" width="135px" height="135px"/>';
                        ul1 += '<div class="code">';
                        ul1 += '<span style="display: block;color: #0C0C0C;">'+element.roomNum+'-'+element.roomType.roomTypeName+'-'+element.roomType.roomPrice+'元/天</span>';
                        ul1 += '<button type="button" value="del" roomid="'+element.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        ul1 += '<button type="button" value="edit" roomid="'+element.id+'" roomData="'+element.roomPic+','+element.roomNum+','+element.roomType.id+','+element.roomType.roomTypeName+'" class="layui-btn layui-btn-danger layui-btn-xs">修改</button>';
                        ul1 += '</div>';
                        ul1 += '</li>';
                    }else if (element.roomStatus == "1"){
                        ul2 += '<li style="background-color: red;">';
                        ul2 += '<img class="layui-anim"  src="'+element.roomPic+'" width="135px" height="135px"/>';
                        ul2 += '<div class="code">';
                        ul2 += '<span style="display: block;color: #0C0C0C;">'+element.roomNum+'-'+element.roomType.roomTypeName+'-'+element.roomType.roomPrice+'元/天</span>';
                        ul2 += '</div>';
                        ul2 += '</li>';
                    }else if (element.roomStatus == "2"){
                        ul3 += '<li style="background-color: blueviolet;">';
                        ul3 += '<img class="layui-anim" src="'+element.roomPic+'" width="135px" height="135px"/>';
                        ul3 += '<div class="code">';
                        ul3 += '<span style="display: block;color: #0C0C0C;">'+element.roomNum+'-'+element.roomType.roomTypeName+'-'+element.roomType.roomPrice+'元/天</span>';
                        ul3 += '<button type="button" value="del" roomid="'+element.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        ul3 += '<button type="button" value="kong" roomid="'+element.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        ul3 += '</div>';
                        ul3 += '</li>';
                    }
                    //然后将三种情况添加到html页面 每个对象都是js对象 先将其转换位jquery对象然后使用html()方法 或者直接用js对象使用innerHTML方法
                    $(uls[0]).html(ul1);
                    $(uls[1]).html(ul2);
                    $(uls[2]).html(ul3);
                })
                reloadSelect("#roomTypeId");
            },
            error:function () {
                layer.msg("服务器异常!");
            }
        });
    }

    function listener(){
        //是否允许提交的标志
        var addSubmit = false;

        //对上传图片按钮的监听,layui提供的前台上传文件的方法
        var uploadObj = upload.render({
            elem:"#uploadButtonId", //使用按钮id 将其与本事件绑定
            url: "rooms/uploadRoomPic.lh", //服务器端的访问路径
            field: "file", //文件域字段名(在后台接收的名称)
            before:function (obj) { //上传之前执行的回调函数  obj 表示选择的上传文件的对象
                //预读本地文件，将其显示到上面的img 标签上面
                /**
                 * index:
                 * file:
                 * result: 表示当前选择的文件的绝对路径
                 */
                obj.preview(function (index, file, result) {
                    $("#imgId").attr("src",result);
                });

            },
            done:function (res) {//上传完成后的回调函数 res 表示服务端返回的map 被解析位json
                //判断是否上传成功，提示 并且将form里面的隐藏域设置为文件访问路径。
                if(res.code == 0){//上传成功
                    $("#roomPic").val(res.newFileName);
                    return layer.msg("上传成功");
                }else{//上传失败
                    //重新上传
                    return layer.msg("上传失败");
                }
            },
            error:function () {//上传失败的回调函数
                //将上传失败信息显示到p标签  并且监听事件(使用uploadObj)重新发起上传请求
                var uploadStatus = $("#uploadStatus");
                uploadStatus.html("<span style=\"color: #FF5722;\">上传失败</span> <a class=\"layui-btn layui-btn-xs img-reload\">重试</a>");
                uploadStatus.find(".img-reload").on("click",function () {
                    uploadObj.upload();
                });
            }
        });
        

        //监听添加按钮的点击 弹出添加框 offset : 表示弹出层的位置 相对于父容器["垂直坐标","水平坐标"] 单个表示垂直坐标
        $("#addRoomsButtonId").click(function () {
            //先将隐藏div 中的数据清空(默认)
            $("#imgId").attr("src","/image/icon001.png");
            $("#roomNum").val("");
            $("#roomPic").val("icon001.png");
            //重新加载下拉框
            reloadSelect("#roomTypeId");
            //弹出隐藏div
            layer.open({
                type:1,
                title:"添加房屋信息界面",
                area:['600px','500px'],
                offset:"20px",
                content:$("#addRoomsDivId"),
                anim:5
            });

            //对房间号失去焦点事件的监听
            $("#roomNum").blur(function () {
                addSubmit = listenBlur();
            });

            //监听提交按钮(因为修改和添加使用的是用一个界面 所以对弹出框提交的监听要局部监听避免两者混淆)
            form.on("submit(submitButtonFilter)",function (formData) {
                if (!addSubmit){
                    alert("hello")
                    layer.msg("请正确填写信息");
                }else{
                    //提交请求
                    //拼接json 表单元素中含有三个参数roomNum roomTypeId roomPic 还需要手动添加的有 flag roomStatus 主键id自动生成
                    var roomJson = formData.field;
                    //显示状态默认是显示的
                    roomJson["flag"] = "1";
                    //刚创建的房屋 其应该是可入住的 roomStatus = "0"
                    roomJson["roomStatus"] = "0";
                    $.ajax({
                        url:"rooms/insertSelective.lh",
                        type:"post",
                        dataType:"text",
                        data:roomJson,
                        success:function (data) {
                            if (data == 'success'){
                                layer.msg("插入成功!");
                                layer.closeAll();
                            }else{
                                layer.msg("插入失败!");
                            }
                        },
                        error:function () {
                            layer.msg("服务器错误!");
                        }
                    });
                }
            });
        });

        //对删除和修改按钮的监听 使用的是标签选择器 实现对所有ul 里面的button的监听
        $("ul").on("click","button",function () {
            var buttonObj  = $(this);
            var value = $(this).val();
            if (value == "del"){
                var roomJson = {};
                roomJson["id"] = buttonObj.attr("roomId");
                roomJson["flag"] = "0";
                $.ajax({
                    url:"rooms/updateByPrimaryKey.lh",
                    type:"POST",
                    dataType:"text",
                    data:roomJson,
                    success:function (data) {
                        if(data == 'success'){
                            layer.msg("删除成功");
                        }else{
                            layer.msg("删除失败 ");
                        }
                    },
                    error:function () {
                        layer.msg("删除服务器错误!");
                    }
                });
            }else if (value == "edit"){
                //取消对roomNum失去焦点事件的监听
                // $("#roomNum").off('blur');

                //修改的监听 先回显数据
                var backData = buttonObj.attr("roomData").split(",");
                $("#imgId").attr("src",backData[0]);
                $("#roomPic").val(backData[0]);
                $("#roomNum").val(backData[1]);
                //将第一个option替换
                $("#roomTypeId option").eq(0).replaceWith("<option value='"+backData[2]+"' selected>"+backData[3]+"</option>");
                form.render("select");

                //再将其弹出
                layer.open({
                    type:1,
                    title:"修改房屋信息界面",
                    area:['600px','500px'],
                    offset:"20px",
                    content:$("#addRoomsDivId"),
                    anim:5
                });

                //监听提交按钮
                form.on("submit(submitButtonFilter)",function (formData) {
                    var updateJson = formData.field;
                    updateJson['id'] =  buttonObj.attr("roomId");
                    $.ajax({
                        url:"rooms/updateByPrimaryKey.lh",
                        type:"POST",
                        dataType:"text",
                        data:updateJson,
                        success:function (data) {
                            if(data == 'success'){
                                layer.msg("更新成功");
                            }else{
                                layer.msg("更新失败 ");
                            }
                        },
                        error:function () {
                            layer.msg("更新服务器错误!");
                        }
                    });

                });
            }else if (value == "kong"){
                //空闲就是将rooms表的roomStatus状态改为0
                $.ajax({
                    url:"rooms/updateByPrimaryKey.lh",
                    type:"POST",
                    dataType:"text",
                    data:{"id":buttonObj.attr("roomId"),"roomStatus":"0"},
                    success:function (data) {
                        if(data == 'success'){
                            layer.msg("删除成功");
                        }else{
                            layer.msg("删除失败 ");
                        }
                    },
                    error:function () {
                        layer.msg("删除服务器错误!");
                    }
                });
                //刷新界面
                loadRoomsData();
            }
        })


    }

    /*************************分割线*************************/
    //该方法用于重新加载下拉框
    function reloadSelect(jqueryId) {
        $.ajax({
            url:"roomType/queryAllByParams.lh",
            type:"POST",
            dataType:"json",
            success:function (data) {
                var optionStr = "<option value=''>--请选择--</option>";
                $.each(data,function (index, element) {
                    optionStr += "<option value='"+element.id+"'>"+element.roomTypeName+"</option>";
                })
                $(jqueryId).html(optionStr);
                form.render("select");
            },
            error:function () {
                layer.msg("刷新下拉框错误!");
            }
        });
    }


    //对房间号是否重复的判断
    function listenBlur() {
        var flag = false;
        //对房间号输入框 失去焦点事件的监听 判断该房间号是否已被使用(放在外层 因为修改和添加都需要验证);
        var roomNum = $("#roomNum").val();
        if (roomNum == ''){
            layer.tips("房间号不能为空!","#roomNum",{tips:[2,"#fc1505"],time:3000});
        }else{
            //服务端判断是否存在
            $.ajax({
                url:"rooms/isExisted.lh",
                type:"post",
                dataType:"text",
                async:false,
                data:{"roomNum":roomNum},
                success:function (data) {
                    if (data == 'success'){
                        layer.tips("房间号已被使用!","#roomNum",{tips:[2,"#fc1505"],time:3000});
                    }else{
                        flag = true;
                        layer.tips("房间号可用!","#roomNum",{tips:[2,"#30fc1a"],time:3000});
                    }
                },
                error:function () {
                    layer.msg("房间号验证服务器错误!");
                }
            });
        }
        return flag;
    }

})