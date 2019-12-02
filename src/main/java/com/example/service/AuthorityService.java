package com.example.service;

import com.example.entity.Authority;
import com.example.entity.User;

import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/27 9:12
 */
public interface AuthorityService extends BaseService<Authority> {

    /**
     * 使用user查询出其对应的权限列表
     * @param user
     * @return
     */
    List<Map<String,Object>> authList(User user);
}
