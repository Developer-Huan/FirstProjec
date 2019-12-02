package com.example.mapper;

import java.util.List;
import java.util.Map;

/**
 * @Author: 刘欢
 * @Date: 2019/11/15 22:27
 */
public interface  BaseMapper<T> {

    /**
     * 根据id 插入一行数据
     * @param t
     * @return
     */
    int insert(T t);

    /**
     * 插入任意个字段的一行数据
     * @param t
     * @return
     */
    int insertSelective(T t);

    /**
     * 根据主键查询一行
     * @param id
     * @return
     */
    T queryByPrimaryKey(Integer id);


    /**
     * 根据多个参数查询一行
     * @param t
     * @return
     */
    T queryByParams(T t);


    /**
     * 根据条件查询数据
     * @param map
     * @return
     */
    List<T> queryAllByParams(Map<String,Object> map);

    /**
     * 根据主键删除一行
     * @param key
     * @return
     */
    Integer deleteByPrimaryKey(String key);

    /**
     * 通过主键更新表数据
     * @param t
     * @return
     */
    Integer updateByPrimaryKey(T t);

    /**
     * 求出给定字段的count值
     * @param t
     * @return
     */
    Integer countByParam(T t);

}
