package com.creat.lib.utils;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2017/5/14 0014.
 */
public class DecimalConversionTest {
    @Test
    public void toHexString() throws Exception {
        System.out.println(DecimalConversion.toHexString(140,3));
        System.out.println(Integer.parseInt("0000000f",16));
    }

}