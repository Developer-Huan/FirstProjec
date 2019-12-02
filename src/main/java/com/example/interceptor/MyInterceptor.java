package com.example.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: 刘欢
 * @Date: 2019/11/26 19:35
 */
public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //拦截器执行拦截操作的方法 是否放行由 return决定 true放行 false拦截
        //在这里对session域中user是否为空的判断 为空就不允许访问
        Object user = request.getSession().getAttribute("user");
        if (user == null){
            //将页面转发到登录界面 并提示信息(使用转发而不是重定向的原因是 提示消息使用request域存储 转发域中数据无法到达页面)
            request.setAttribute("backMsg","请先登录!");
            //不能在这转发到一个被拦截的地址 因为转发到被拦截的地址 最后地址又被拦截器拦截 然后死循环
            request.getRequestDispatcher("/model/toLogin.lh").forward(request,response);
            return false;
        }
        return true;

    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
