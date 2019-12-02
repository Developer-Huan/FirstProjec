package com.example.controller;

import com.example.entity.Orders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: 刘欢
 * @Date: 2019/11/18 21:57
 */
@Controller
@RequestMapping("orders")
public class OrdersController extends BaseController<Orders> {

    /**
     * 当支付成功后回调来需要做的操作 比如生成消费记录 修改订单状态
     * 支付宝的回调会携带很多数据 比如 订单编号 支付金额 支付时间 等 可以按需求获取
     * eg:
     * {charset=utf-8,
     * out_trade_no=20190719150739894533,
     * method=alipay.trade.page.pay.return,
     * total_amount=216.00,
     * sign=AoX1cQjxMH2MUUPstbulr41goJFAxL9ckcuV4ngdAthEdn5Mhkvu5KyvSi52Qa/hotoR+EHc9Q2KJDnBWnsYWGgLQW3Y4LQHzlgCqXnzMUKnw/LQGCwdlyK8byHX0bNaDkB0VDJOlHur+WMuR9ZU6ct497f96Hr+Dgt4gTfiPL6aZm3hRaYdtu9/aobBirgW7khuwst7+KhWRLy5dqy3EXgL87hNu6gvCzQ0Ra+t/o2U8y8D3tDynEiDJ5TPy+2YM1eQQ54DQoXfF+cNrrygVgsds8C5YBlejRLhDyI3+RH6FScu2ak6S84mAhQKl7fQSO/wFM0h/k288jzvtpZiEQ==,
     * trade_no=2019112222001429221000046875,
     * auth_app_id=2016101700707037,
     * version=1.0,
     * app_id=2016101700707037,
     * sign_type=RSA2,
     * seller_id=2088102179970347,
     * timestamp=2019-11-22 11:22:57}
     */
    @RequestMapping("paidDo")
    public String paidDo(String out_trade_no){
        ordersService.paidDo(out_trade_no);
        return "redirect: /one_war_exploded/model/toIndex.lh";
    }

}
