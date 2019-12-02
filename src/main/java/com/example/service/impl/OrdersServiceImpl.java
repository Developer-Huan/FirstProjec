package com.example.service.impl;

import com.example.entity.InRoomInfo;
import com.example.entity.Orders;
import com.example.entity.RoomSale;
import com.example.entity.Rooms;
import com.example.service.OrdersService;
import com.example.utils.DateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Author: 刘欢
 * @Date: 2019/11/18 21:27
 */
@Service
public class OrdersServiceImpl extends BaseServiceImpl<Orders> implements OrdersService {

    /**
     * 重写父类
     * 三表同步
     * 在方法中要实现 修改inRoomInfo的out_room_status为1(已退房) 和向orders表插入数据 将rooms表的房屋状态改为2(打扫) 的事务同步
     * @param orders
     * @return
     */
    @Transactional(readOnly = false)
    @Override
    public String insertSelective(Orders orders) {
        //1,向Orders 表插入数据
        Integer i3 = ordersMapper.insertSelective(orders);
        //2,修改inRoomInfo表的入住状态
        InRoomInfo inRoomInfo = new InRoomInfo();
        inRoomInfo.setId(orders.getIriId());
        inRoomInfo.setOutRoomStatus("1");
        Integer i1 = inRoomInfoMapper.updateByPrimaryKey(inRoomInfo);
        //3, 修改Rooms表的房屋状态
        Rooms rooms = new Rooms();
        Integer roomId = inRoomInfoMapper.queryByPrimaryKey(orders.getIriId()).getRoomId();
        rooms.setId(roomId);
        rooms.setRoomStatus("2");
        Integer i2= roomsMapper.updateByPrimaryKey(rooms);

        if (i3 >0 && i1>0 && i2>0){
            return "success";
        }else{
            return "fail";
        }
    }

    /**
     * 自定义方法
     * @param ids
     * @return
     */
    @Override
    public String batchUpdateByPrimaryKey(String ids) {
        String[] batchId = ids.split(",");
        int num = batchId.length;
        for (String id : batchId) {
            Orders orders = new Orders();
            orders.setId(Integer.valueOf(id));
            orders.setFlag("0");
            num -= ordersMapper.updateByPrimaryKey(orders);
        }
        return num==0?"success":"fail";
    }


    /**
     * 重写父类方法
     * 该类为当支付完成后被调用的方法
     * 功能为
     * 1,根据id 修改orders 表的支付状态为已支付(orderStatus = 1)
     * 2,生成一条消费记录(向消费记录表插入一行数据)
     * @param orderNum
     * @return
     */
    @Transactional(readOnly = false)
    @Override
    public String paidDo(String orderNum) {
        //1, 根据订单id查询信息 然后拼接出消费信息后插入 roomSale表
        Orders orders = new Orders();
        orders.setOrderNum(orderNum);
        Orders orders1 = baseMapper.queryByParams(orders);
        String[] sp = orders1.getOrderOther().split(",");
        RoomSale roomSale = new RoomSale();
        roomSale.setRoomNum(sp[0]);
        roomSale.setCustomerName(sp[1]);
        roomSale.setStartDate(DateUtil.formatString(sp[2]));
        roomSale.setEndDate(DateUtil.formatString(sp[3]));
        roomSale.setDays(Integer.valueOf(sp[4]));
        String[] prices = orders1.getOrderPrice().split(",");
        roomSale.setRoomPrice(Double.valueOf(prices[0]));
        roomSale.setOtherPrice(Double.valueOf(prices[1]));
        roomSale.setRentPrice(Double.valueOf(prices[2]));
        roomSale.setSalePrice(orders1.getOrderMoney());
        roomSale.setDiscountPrice(roomSale.getRoomPrice()*roomSale.getDays()-roomSale.getRentPrice());
        Integer j = roomSaleMapper.insertSelective(roomSale);

        //2,根据id 修改orders 表的该字段的显示状态
        Orders orders2 = new Orders();
        orders2.setId(orders1.getId());
        orders2.setOrderStatus("1");
        Integer i = baseMapper.updateByPrimaryKey(orders2);

        return (i > 0 && j >0)?"success":"fail";
    }
}
