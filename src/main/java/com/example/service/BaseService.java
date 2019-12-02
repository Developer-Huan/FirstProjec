package com.example.service;


import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/16 16:43
 */
public interface BaseService<T> {


    /**
     * 根据主键查询一行
     * @param id
     * @return
     */
    T queryByPrimaryKey(Integer id);

    /**
     * 根据条件查询数据且分页
     * @param page 当前第几页
     * @param limit 每页的行数
     * @param params
     * @return
     */
    Map<String,Object> queryOfPageAllByParams(Integer page, Integer limit, Map<String,Object> params);

    /**
     * 根据条件查询数据
     * @param map
     * @return
     */
    List<T> queryAllByParams(Map<String,Object> map);

    /**
     * 根据主键查询一行
     * @param t
     * @return
     */
    T queryByParams(T t);

    /**
     * 通过主键删除一行
     * @param id
     * @return
     */
    String deleteByPrimaryKey(String id);

    /**
     * 通过主键更新表数据
     * @param t
     * @return
     */
    String updateByPrimaryKey(T t);

    /**
     * 插入任意个字段的一行数据
     * @param t
     * @return
     */
    String insertSelective(T t);


    /**
     * 判断该字段值在表中是否存在,实体类中一般只含有那个需要判断是否存在的字段值 其它为null
     * @param t
     * @return
     */
    String isExisted(T t);

}
