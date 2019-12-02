package com.example.service;

import com.example.entity.User;

import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/26 10:54
 */
public interface UserService extends BaseService<User> {


    /**
     * 如果该用户存在 就返回这个用户的对像(含有表中所有字段数据)
     * @param user
     * @return
     */
    User isExistedUser(User user);

    /**
     * 检查用户名是否存在
     * @param user
     * @return
     */
    String checkUsername(User user);
}
