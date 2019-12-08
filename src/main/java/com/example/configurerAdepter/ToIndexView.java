package com.example.configurerAdepter;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author huan
 * @date 2019/12/8下午4:13
 * 代替 web.xml中定义的默认访问页面的功能
 *
 **/
@Configuration
public class ToIndexView extends WebMvcConfigurerAdapter {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //该句类似于一个用于转发 "/" 路径的controller
        registry.addViewController("/").setViewName("login/login");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        super.addViewControllers(registry);
    }
}
