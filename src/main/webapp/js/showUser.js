layui.use(['jquery','form','table','layer', 'upload'],function () {
    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        upload = layui.upload,
        table = layui.table;

    init()

    function init() {
        loadUserTable();
        // listener();
    }


    function loadUserTable(params) {
        table.render({
            elem: '#userTableId',
            height: 512,
            where: params,
            url: 'user/queryOfPageByParams.lh',
            limit: 5,
            limits: [3,5,8,10],
            page: true,
            even: true,
            cols: [[
                {field: 'id', title: 'ID', width:80, align:'center',sort: true}
                ,{field: 'username', title: '用户名', align:'center',width:100, sort: true}
                ,{field: 'pwd', title: '密码',align:'center', width:280}
                ,{field: 'isAdmin', title: '管理员等级',align:'center', width:110}
                ,{field: 'authorityNames', title: '所拥有权限', align:'center', width:500, sort: true}
                ,{field: 'createDate', title: '创建时间',align:'center', width:150}
                ,{field: 'useStatus', title: '状态',align:'center', width:100, templet:'#useStatusTpl'}
                ,{fixed: 'right', width:150,  title: '操作',align:'center', toolbar: '#userToolbarId'}
            ]]
        });
    }


})
