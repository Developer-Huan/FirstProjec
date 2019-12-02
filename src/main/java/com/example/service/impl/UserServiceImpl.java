package com.example.service.impl;

import com.example.entity.Authority;
import com.example.entity.User;
import com.example.service.UserService;
import com.example.utils.MD5;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/26 10:54
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

    @Override
    public User isExistedUser(User user) {
        //将原始的密码经过加密后去数据库验证
        //验证账号密码 首先必须都不为null 和 ""
        if (user == null || user.getUsername() == null || user.getUsername() == "" || user.getPwd() == null || user.getPwd() == ""){
            return null;
        }
        user.setPwd(MD5.md5crypt(user.getPwd()));
        //当查询的结果不是一条的时候也不允许登录
        Integer count = baseMapper.countByParam(user);
        if (count != 1){
            return null;
        }
        return userMapper.queryByParams(user);
    }

    @Override
    public Map<String, Object> queryOfPageAllByParams(Integer page, Integer limit, Map<String, Object> params) {
        Map<String, Object> map = super.queryOfPageAllByParams(page, limit, params);
        List<User> userList = (List<User>) map.get("data");
        for (User user : userList) {
            //查询该用对应的所有1级权限
            List<Authority> authorities = authorityMapper.queryByUsernameAndParent(user.getUsername(), 0);
            //将这些二级权限中的权限名拼接为字符串 然后添加到user.authorityNames中去
            String authNames = "";
            for (Authority authority : authorities) {
                authNames += authority.getAuthorityName()+",";
            }
            //去除句尾逗号
            int last = authNames.lastIndexOf(",");
            if (last < 0 ){
                last = 0;
            }
            authNames = authNames.substring(0,last);
            user.setAuthorityNames(authNames);
        }
        return map;
    }

    @Override
    public String checkUsername(User user) {
        return super.isExisted(user);
    }

    @Override
    public String insertSelective(User user) {
        //将user中的密码加密后存入到数据库
        user.setPwd(MD5.md5crypt(user.getPwd()));
        return super.insertSelective(user);
    }
}
