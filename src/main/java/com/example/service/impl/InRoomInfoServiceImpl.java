package com.example.service.impl;

import com.example.entity.InRoomInfo;
import com.example.entity.Rooms;
import com.example.service.InRoomInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Author: 刘欢
 * @Date: 2019/11/16 17:49
 */
@Service
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements InRoomInfoService {
    @Transactional(readOnly = false)
    @Override
    public String insertSelective(InRoomInfo inRoomInfo) {
        /**
         * 多表操作 使用事务 同步内容为
         * 1，向inRoomInfo表中插入数据
         * 2，修改rooms表中房屋状态为已入住 roomStatus = "1"
         */

        Integer i  = baseMapper.insertSelective(inRoomInfo);
        Rooms rooms = new Rooms();
        rooms.setRoomStatus("1");
        rooms.setId(inRoomInfo.getRoomId());
        Integer i2 = roomsMapper.updateByPrimaryKey(rooms);

        if (i > 0  && i2 > 0){
            return "success";
        }else{
            return "fail";
        }

    }
}
