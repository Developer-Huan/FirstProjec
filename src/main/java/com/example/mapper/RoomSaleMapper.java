package com.example.mapper;

import com.example.entity.RoomSale;

import java.util.List;
import java.util.Map;

/**
 * @author liuhuan
 */
public interface RoomSaleMapper extends BaseMapper<RoomSale>{

    /**
     * 分组查询出每个房间的消费总额
     * @return
     */
    List<Map<String,Object>> queryPriceByGroup();

}