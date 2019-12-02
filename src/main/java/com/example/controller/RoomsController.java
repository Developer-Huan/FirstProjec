package com.example.controller;

import com.example.entity.Rooms;
import com.example.utils.QiNiuUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/19 13:52
 */
@Controller
@RequestMapping("rooms")
public class RoomsController extends BaseController<Rooms> {


    @RequestMapping("uploadRoomPic")
    @ResponseBody
    public Map<String,Object> uploadRoomPic(MultipartFile file){
        return QiNiuUtil.upload(file);
    }

}
