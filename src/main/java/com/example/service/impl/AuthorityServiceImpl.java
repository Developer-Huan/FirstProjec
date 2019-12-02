package com.example.service.impl;

import com.example.entity.Authority;
import com.example.entity.User;
import com.example.service.AuthorityService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/27 9:13
 */
@Service
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements AuthorityService {

    /**
     * list结构为
     * list<map>    map---->含有一级权限的名称和其拥有的二级权限的list(authority_name:"XXXX",authorityList:List<authority>)
     * @param user
     * @return
     */
    @Override
    public List<Map<String, Object>> authList(User user) {
        //声明最后返回的数据容器
        List<Map<String,Object>> authList = new ArrayList<>();
        //得到一级权限列表
        List<Authority> authorities = authorityMapper.queryByUsernameAndParent(user.getUsername(), 0);
        //遍历一级列表 根据权限id 查询出其对应的二级权限 并将其封装到map 添加到authList
        for (Authority authority : authorities) {
            //声明map
            Map<String,Object> map = new HashMap<>();
            //填充一级权限名称到map
            map.put("authorityName",authority.getAuthorityName());
            //填充该一级权限所属的二级权限对象列表到map
            map.put("authority",authorityMapper.queryByUsernameAndParent(user.getUsername(),authority.getId()));
            authList.add(map);
        }
        return authList;
    }
}
