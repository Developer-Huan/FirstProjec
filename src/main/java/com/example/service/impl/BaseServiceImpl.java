package com.example.service.impl;

import com.example.mapper.*;
import com.example.service.BaseService;
import com.example.service.InRoomInfoService;
import com.example.service.RoomsService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/16 16:43
 */
public class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    BaseMapper<T> baseMapper;
    @Autowired
    InRoomInfoMapper inRoomInfoMapper;
    @Autowired
    RoomsMapper roomsMapper;
    @Autowired
    OrdersMapper ordersMapper;
    @Autowired
    RoomSaleMapper roomSaleMapper;
    @Autowired
    AuthorityMapper authorityMapper;
    @Autowired
    UserMapper userMapper;



    @Override
    public T queryByPrimaryKey(Integer id) {
        return baseMapper.queryByPrimaryKey(id);
    }

    @Override
    public Map<String, Object> queryOfPageAllByParams(Integer page, Integer limit, Map<String,Object> params) {
        Map<String,Object> map = new HashMap<>();
        PageHelper.startPage(page,limit);
        PageInfo<T> pageInfo = new PageInfo<>(baseMapper.queryAllByParams(params));
        map.put("data",pageInfo.getList());
        map.put("count",pageInfo.getTotal());
        return map;
    }

    @Override
    public List<T> queryAllByParams(Map<String,Object> map) {
        return baseMapper.queryAllByParams(map);
    }


    @Override
    public T queryByParams(T t) {
        return baseMapper.queryByParams(t);
    }



    @Override
    public String deleteByPrimaryKey(String id){
        return baseMapper.deleteByPrimaryKey(id)>0?"success":"fail";
    }

    @Override
    public String updateByPrimaryKey(T t) {
        return baseMapper.updateByPrimaryKey(t)>0?"success":"fail";
    }

    @Override
    public String insertSelective(T t) {
        return baseMapper.insertSelective(t)>0?"success":"fail";
    }

    @Override
    public String isExisted(T t) {
        return baseMapper.countByParam(t)>0?"success":"fail";
    }
}
