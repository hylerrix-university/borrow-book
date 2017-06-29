package com.creat.lib.mapper;

import com.creat.lib.po.Category;
import com.creat.lib.po.CategoryExample;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2017/5/21 0021.
 */
public class CategoryMapperTest {
    @Test
    public void insert1() throws Exception {
        CategoryMapper categoryMapper = (CategoryMapper) applicationContext.getBean("categoryMapper");
        Category category = new Category();
        category.setcName("艺术美学");
        category.setsId(2);
        categoryMapper.insert(category);
    }

    private ApplicationContext applicationContext;

    @Before
    public void setUp(){
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext-dao.xml");
    }
    @Test
    public void countByExample() throws Exception {

    }

    @Test
    public void deleteByExample() throws Exception {
    }

    @Test
    public void deleteByPrimaryKey() throws Exception {
    }

    @Test
    public void insert() throws Exception {
    }

    @Test
    public void insertSelective() throws Exception {
    }

    @Test
    public void selectByExample() throws Exception {
        CategoryMapper categoryMapper = (CategoryMapper) applicationContext.getBean("categoryMapper");
        List<Category> categories = categoryMapper.selectByExample(new CategoryExample());
        for (Category category : categories){
            System.out.println(category.getcName());
        }
    }

    @Test
    public void selectByPrimaryKey() throws Exception {
    }

    @Test
    public void updateByExampleSelective() throws Exception {
    }

    @Test
    public void updateByExample() throws Exception {
    }

    @Test
    public void updateByPrimaryKeySelective() throws Exception {
    }

    @Test
    public void updateByPrimaryKey() throws Exception {
    }

}