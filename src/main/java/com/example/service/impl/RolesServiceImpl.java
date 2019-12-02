package com.example.service.impl;

import com.example.entity.Authority;
import com.example.entity.Roles;
import com.example.service.RolesService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 刘欢
 * @description Roles表对应业务层
 * @date 2019/11/28
 */
@Service
public class RolesServiceImpl extends BaseServiceImpl<Roles> implements RolesService {
    @Override
    public List<Authority> queryAllAuthByRoleId(String roleId) {
        return authorityMapper.queryAllByRoleId(roleId);
    }
}
