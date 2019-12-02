package com.example.service;

import com.example.entity.Authority;
import com.example.entity.Roles;

import java.util.List;

/**
 * @author liuhuan
 */
public interface RolesService extends BaseService<Roles>{

    /**
     * 根据role表的id 查询出对应的权限列表
     * @param roleId
     * @return
     */
    List<Authority>  queryAllAuthByRoleId(String roleId);
}
