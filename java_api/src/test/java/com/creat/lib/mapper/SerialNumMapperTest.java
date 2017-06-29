package com.creat.lib.mapper;

import com.creat.lib.po.SerialNum;
import com.creat.lib.po.SerialNumExample;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2017/5/19 0019.
 */
public class SerialNumMapperTest {

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
        SerialNumMapper serialNumMapper = (SerialNumMapper) applicationContext.getBean("serialNumMapper");
        SerialNumExample example = new SerialNumExample();
        SerialNumExample.Criteria criteria = example.createCriteria();
        criteria.andCIdEqualTo(1);
        List<SerialNum> serialNums = serialNumMapper.selectByExample(example);
        for(SerialNum serialNum: serialNums){
            System.out.println(serialNum.getNumber());
        }
//        SerialNum serialNum = serialNumMapper.selectByPrimaryKey(1);
//        System.out.println("num"+serialNum.getNumber());
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