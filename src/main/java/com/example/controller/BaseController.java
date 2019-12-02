package com.example.controller;

import com.example.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/16 16:46
 */
public class BaseController<T> {

    @Autowired
    BaseService<T> baseService;

    @Autowired
    OrdersService ordersService;

    @Autowired
    RoomsService roomsService;

    @Autowired
    AuthorityService authorityService;

    @Autowired
    RolesService rolesService;

    @Autowired
    RoomSaleService roomSaleService;

    @Autowired
    UserService userService;


    /**
     * 分页查询的控制层
     * @param page
     * @param limit
     * @param params 使用map接收数据是因为 (1) map接受不会出现类型不匹配的错误 (2)条件查询的参数有可能实体类中没有 所以map可以保证接受到所有的参数
     * @return
     */
    @RequestMapping("queryOfPageByParams")
    @ResponseBody
    public Map<String,Object> queryOfPageByParams(Integer page,Integer limit, @RequestParam Map<String,Object> params){
        Map<String,Object> map = new HashMap<>();
        try {
            map = baseService.queryOfPageAllByParams(page, limit, params);
            map.put("code",0);
        } catch (Exception e) {
            map.put("code",200);
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping("updateByPrimaryKey")
    @ResponseBody
    public String updateByPrimaryKey(T t){
        return baseService.updateByPrimaryKey(t);
    }


    @RequestMapping("deleteByPrimaryKey")
    @ResponseBody
    public String deleteByPrimaryKey(String id){
        return baseService.deleteByPrimaryKey(id);
    }


    @RequestMapping("queryByParams")
    @ResponseBody
    public T queryByParams(T t){
        return baseService.queryByParams(t);
    }

    @RequestMapping("insertSelective")
    @ResponseBody
    public String insertSelective(T t){
        System.out.println(t);
        return baseService.insertSelective(t);
    }

    @RequestMapping("queryAllByParams")
    @ResponseBody
    public List<T> queryAllByParams(@RequestParam Map<String,Object> map){
        return baseService.queryAllByParams(map);
    }

    @RequestMapping("batchUpdateByPrimaryKey")
    @ResponseBody
    public String batchUpdateByPrimaryKey(String ids){
        return ordersService.batchUpdateByPrimaryKey(ids);
    }

    /**
     * 判断一个字段是否存在表中
     * @param object
     * @return
     */
    @RequestMapping("isExisted")
    @ResponseBody
    public String isExisted(T t){
        return baseService.isExisted(t);
    }
}
