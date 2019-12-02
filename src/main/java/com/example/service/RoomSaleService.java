package com.example.service;

import com.example.entity.RoomSale;

import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/22 21:38
 */
public interface RoomSaleService extends BaseService<RoomSale> {

    /**
     * 分组查询出每个房间的消费总额
     * @return
     */
    Map<String,Object> loadIddData();
}
