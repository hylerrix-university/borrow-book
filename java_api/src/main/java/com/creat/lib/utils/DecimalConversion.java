package com.creat.lib.utils;

/**
 * Created by Administrator on 2017/5/14 0014.
 */
public class DecimalConversion {


    public static String toHexString(int number,int count){
        StringBuilder result = new StringBuilder();
        String s = Integer.toHexString(number);
        int length = s.length();
        for(int i = 0; i < (count-length); i++){
            result.append("0");
        }
        result.append(s);
        return result.toString();
    }
}
