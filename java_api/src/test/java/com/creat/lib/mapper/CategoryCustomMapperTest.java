package com.creat.lib.mapper;

import com.creat.lib.po.CategoryCustom;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2017/5/22 0022.
 */
public class CategoryCustomMapperTest {
    private ApplicationContext applicationContext;

    @Before
    public void setUp(){
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext-dao.xml");
    }
    @Test
    public void selectByCid() throws Exception {
        CategoryCustomMapper mapper = (CategoryCustomMapper) applicationContext.getBean("categoryCustomMapper");
        CategoryCustom categoryCustom = mapper.selectByCid(1);
        System.out.println(categoryCustom.getStack().getsName());
    }

}