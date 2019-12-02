package com.example.controller;

import com.example.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

/**
 * @Author: 刘欢
 * @Date: 2019/11/26 10:59
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController<User>{

    /**
     * 判断账号密码是否正确 如果正确就将user 对象保存到session中(提供给过滤器判断是否允许访问)
     * 否则就返回 "fail"
     * @param user
     * @return
     */
    @RequestMapping("loginCheck")
    @ResponseBody
    public String login(User user, HttpSession session){
        User s = userService.isExistedUser(user);
        if (s != null){
            session.setAttribute("user",s);
            return "success";
        }else{
            return "fail";
        }
    }

    @RequestMapping("exitUser")
    @ResponseBody
    public String exitUser(HttpSession session){
        session.removeAttribute("user");
        return "success";
    }

    /**
     * 添加用户的时候检查用户名是否存在
     * @return
     */
    @RequestMapping("checkUsername")
    @ResponseBody
    public String checkUsername(User user){
        return userService.checkUsername(user);
    }

}