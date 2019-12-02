package com.example.service.impl;

import com.example.entity.RoomSale;
import com.example.service.RoomSaleService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/22 21:39
 */
@Service
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {
    @Override
    public Map<String, Object> loadIddData() {
        List<Map<String, Object>> mapList = roomSaleMapper.queryPriceByGroup();
        List<Object> roomNumList = new ArrayList();
        List<Object> sumPriceList = new ArrayList();
        for (Map<String, Object> map : mapList) {
            roomNumList.add(map.get("roomNum"));
            sumPriceList.add(map.get("sumPrice"));
        }
        Map<String,Object> map = new HashMap<>();
        map.put("roomNumList",roomNumList);
        map.put("sumPriceList",sumPriceList);
        return map;
    }
}
