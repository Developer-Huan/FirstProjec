package com.example.mapper;

import com.example.entity.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author liuhuan
 */
public interface AuthorityMapper extends BaseMapper<Authority>{

    /**
     * 根据用户名和其要查询的权限等级及其所属上一级权限的id 查询出该等级id的权限列表
     * @param username 用户名
     * @param parent 上一级权限的id
     * @return 本级id 的列表
     */
    List<Authority> queryByUsernameAndParent(@Param("username") String username, @Param("parent") Integer parent);

    /**
     * 根据roleId 查询出其所对应的所有权限
     * @param roleId
     * @return
     */
    List<Authority> queryAllByRoleId(String roleId);


}