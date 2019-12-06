package com.example.controller;

import com.example.entity.Authority;
import com.example.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/27 9:15
 */
@Controller
@RequestMapping("authority")
public class AuthorityController extends BaseController<Authority> {
    /**
     * 将数据封装到session中 在index页面提取，完成角色对应的界面
     * @return
     */
    @RequestMapping("authList")
    public String authList(HttpSession session){
        User user = (User) session.getAttribute("user");
        session.setAttribute("authList",authorityService.authList(user));
        return "redirect:/model/toIndex";
    }

}
