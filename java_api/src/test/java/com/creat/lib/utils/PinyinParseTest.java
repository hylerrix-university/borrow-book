package com.creat.lib.utils;


import org.junit.Test;

/**
 * Created by Administrator on 2017/5/14 0014.
 */
public class PinyinParseTest {


    @Test
    public void getPingYin() throws Exception {
        System.out.print(PinyinParse.getPingYin("java编程思想"));
    }

    @Test
    public void getPinYinHeadChar() throws Exception {
        System.out.print(PinyinParse.getPinYinHeadChar("java编程思想"));
    }

}