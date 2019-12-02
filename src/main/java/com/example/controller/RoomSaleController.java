package com.example.controller;

import com.example.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/22 21:40
 */
@RequestMapping("roomSale")
@Controller
public class RoomSaleController extends BaseController<RoomSale> {


    @RequestMapping("loadIddData")
    @ResponseBody
    public Map<String,Object> loadIddData(){
        return roomSaleService.loadIddData();
    }
}
