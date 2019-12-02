package com.example.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 将string 和 date 互转
 * @Author: 刘欢
 * @Date: 2019/11/22 16:30
 */
public class DateUtil {

    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:MM:ss");

    public static String parseDate(Date date){
        return simpleDateFormat.format(date);
    }

    public static Date formatString(String string){
        try {
            return simpleDateFormat.parse(string);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

}
