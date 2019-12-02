package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @Author: 刘欢
 * @Date: 2019/11/15 14:12
 */
@Controller
@RequestMapping("model")
public class ModelController {

    @RequestMapping("toIndex")
    public String toIndex(){
        return "index";
    }

    @RequestMapping("toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inRoomInfo/showInRoomInfo";
    }

    @RequestMapping("toAddInRoomInfo")
    public String toAddInRoomInfo(){
        return "inRoomInfo/addInRoomInfo";
    }

    @RequestMapping("toShowOrders")
    public String toShowOrders(){
        return "orders/showOrders";
    }

    /**
     * 携带数据跳转到支付界面
     * @return
     */
    @RequestMapping("toOrderPay")
    public String toOrderPay(String orderNum, String orderMoney, Model model){
        model.addAttribute("orderNum",orderNum);
        model.addAttribute("orderMoney",orderMoney);
        return "alipay/orderPay_alipay";
    }

    @RequestMapping("toShowRoomSale")
    public String toShowRoomSale(){
        return "roomSale/showRoomSale";
    }

    @RequestMapping("toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }

    @RequestMapping("toAddVip")
    public String toAddVip(){
        return "vip/addVip";
    }

    @RequestMapping("toShowRooms")
    public String toShowRooms(){
        return "rooms/showRooms";
    }

    @RequestMapping("toLogin")
    public String toLogin(){
        return "login/login";
    }

    @RequestMapping("toShowUser")
    public String toShowUser(){
        return "user/showUser";
    }

    @RequestMapping("toShowRoles")
    public String toRoles(){
        return "roles/showRoles";
    }

    @RequestMapping("toShowIdd")
    public String toIdd(){
        return "idd/showIdd";
    }

    @RequestMapping("toAddUser")
    public String toAddUser(){
        return "user/addUser";
    }
}
