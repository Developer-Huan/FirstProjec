package com.example.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @author liuhuan
 */
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
public class User {
    /** 主键 */
    private Integer id;

    /** 账号 */
    private String username;

    /** 密码 */
    private String pwd;

    /** 创建时间 */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createDate;

    /** 启用状态：1启用，0禁用 */
    private String useStatus;

    /** 1超级管理员，0普通管理员 */
    private String isAdmin;

    /** 角色id */
    private Integer roleId;


    /** 该用户所拥有的权限的名称的拼接字符串 */
    private String authorityNames;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd == null ? null : pwd.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUseStatus() {
        return useStatus;
    }

    public void setUseStatus(String useStatus) {
        this.useStatus = useStatus == null ? null : useStatus.trim();
    }

    public String getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(String isAdmin) {
        this.isAdmin = isAdmin == null ? null : isAdmin.trim();
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }


    public String getAuthorityNames() {
        return authorityNames;
    }

    public void setAuthorityNames(String authorityNames) {
        this.authorityNames = authorityNames;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", pwd='" + pwd + '\'' +
                ", createDate=" + createDate +
                ", useStatus='" + useStatus + '\'' +
                ", isAdmin='" + isAdmin + '\'' +
                ", roleId=" + roleId +
                ", authorityNames='" + authorityNames + '\'' +
                '}';
    }
}