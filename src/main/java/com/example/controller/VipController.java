package com.example.controller;

import com.example.entity.Vip;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author: 刘欢
 * @Date: 2019/11/18 11:47
 */
@Controller
@RequestMapping("vip")
public class VipController extends BaseController<Vip>{}
