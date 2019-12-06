layui.use(['table'],function () {
    var table = layui.table;

    init();

    function init() {
        loadRolesTable();
        listener();
    }


    function loadRolesTable(params) {
        table.render({
            elem: '#rolesTableId',
            height: 512,
            url: 'roles/queryOfPageByParams',
            where: params,
            limit: 5,
            limits: [3,5,8,10],
            page: true,
            even: true,
            cols: [[
                {field: 'id', title: 'ID', width:80, align:'center',sort: true}
                ,{field: 'roleName', title: '角色名', align:'center',width:150,sort: true}
                ,{field: 'createDate', title: '角色创建时间',align:'center', width: 220, sort: true}
                ,{field: 'status', title: '角色状态',align:'center',sort: true, width: 120, sort: true, templet:"#statusTpl"}
                ,{field: 'flag', title: '角色类型',align:'center', width: 150, sort: true, templet: "#flagTpl"}
                ,{fixed: 'right', width:120,  title: '操作',align:'center', toolbar: '#rolesToolbarId'}
            ]]
        });
    }

    function listener() {
        //监听工具条
        table.on("tool(rolesTableFilter)",function (obj) {
            var layEvent = obj.event;
            if (layEvent == "detail"){
                //先加载树状图
                loadTreeData(obj.data.id);

                //再显示树状图
                layer.open({
                    type:1,
                    title:"角色信息树状图界面",
                    area:['380px','500px'],
                    shade:0.5,
                    content:$("#treeDivId"),
                    anim:5,
                    cancel:function (index) {
                        $("#treeDivId").hide();
                        layer.close(index);
                    }
                });
            } else if (layEvent == "down"){
                changeStatus(obj,0,"禁用");
            }else if(layEvent == "up"){
                //启用
                changeStatus(obj,1,"启用");
            }
        });
    }


    function loadTreeData(roleId) {
        var setting = {
            data : {  //设置节点数据
                simpleData : {
                    enable : true,  //使用格式化后的数据(简易版数据)
                    idKey : "id",    //节点数据的key 在获取到的数据中的名称 这里叫id
                    pIdKey : "parent",  //节点数据pId在获得的数据中的名称 这里叫parent
                    rootId : 0        //节点中根目录id 在获取到的数据中的名称
                },
                key : {
                    name : "authorityName"  //每个节点显示的文字 在获得的数据中的显示名称
                }
            },
            check : {
                enable : true  //是否开启复选框，默认是不开启(false)
            },
            async : {
                enable : true,
                url : "roles/queryAllAuthByRoleId?id="+roleId, //访问服务器的路径 带上id 是因为后台需要id来指明要查询的字段
                autoParam : ["id","name=n", "level=lv"], //能否自动加载
                otherParam : {"otherParam" : "zTreeAsyncTest"}  //异步数据的样式设计
            }
        };
        $.fn.zTree.init($("#tree"),setting);
    }


    /**
     * 将禁用和启用封装为一个方法 禁用传值的 status=0
     * 启用传值 status=1
     * @param obj 改行的对象
     * @param status 要修改的状态
     * @param msg 要弹出的消息 ("禁用" or "启用")
     */
    function changeStatus(obj,status,msg) {
        //将roles表的该条信息改为禁用
        var paramJson = {};
        paramJson["id"] = obj.data.id;
        paramJson["status"] = status;
        $.ajax({
            url:"roles/updateByPrimaryKey",
            type:"post",
            dataType:"text",
            data:paramJson,
            success:function (data) {
                if (data == "success") {
                    loadRolesTable();
                    layer.msg(msg + "成功!");
                }else{
                    layer.msg(msg + "失败!");
                }
            },
            error:function () {
                layer.msg(msg + "服务器错误!");
            }
        });
    }

});