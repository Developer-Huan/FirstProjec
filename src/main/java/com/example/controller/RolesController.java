package com.example.controller;

import com.example.entity.Authority;
import com.example.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author liuhuan
 */
@Controller
@RequestMapping("roles")
public class RolesController extends BaseController<Roles>{

    @RequestMapping("queryAllAuthByRoleId")
    @ResponseBody
    public List<Authority> queryAllAuthByRoleId(@RequestParam(value = "id") String roleId){
        return rolesService.queryAllAuthByRoleId(roleId);
    }
}
