package com.example.service;

import com.example.entity.Orders;

/**
 * @Author: 刘欢
 * @Date: 2019/11/18 21:25
 */
public interface OrdersService extends BaseService<Orders> {

    /**
     * 根据主键 批量删除数据
     * @param ids
     * @return
     */
    String batchUpdateByPrimaryKey(String ids);


    /**
     * 重写父类方法
     * 该类为当支付完成后被调用的方法
     * 功能为
     * 1,根据id 修改orders 表的支付状态为已支付(orderStatus = 1)
     * 2,生成一条消费记录(向消费记录表插入一行数据)
     * @param orderNum
     * @return
     */
    public String paidDo(String orderNum);
}
