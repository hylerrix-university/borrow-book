package com.creat.lib.mapper;

import com.creat.lib.po.IsbnCount;
import com.creat.lib.po.RecordCustom;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2017/5/31 0031.
 */
public class RecordCustomMapperTest {
    @Test
    public void selectIsbnCountByUid() throws Exception {
        RecordCustomMapper recordCustomMapper = (RecordCustomMapper) applicationContext.getBean("recordCustomMapper");
        List<IsbnCount> isbnCountList = recordCustomMapper.selectIsbnCountByUid(2);
        for(IsbnCount isbnCount : isbnCountList){
            System.out.println(isbnCount.getCount()+" "+isbnCount.getIsbn());
        }
    }

    private ApplicationContext applicationContext;
    @Before
    public void setUp(){
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext-dao.xml");
    }
    @Test
    public void selectAllRecordCustom() throws Exception {
        RecordCustomMapper recordCustomMapper = (RecordCustomMapper) applicationContext.getBean("recordCustomMapper");
        List<RecordCustom> recordCustoms = recordCustomMapper.selectAllRecordCustom();
        for(RecordCustom recordCustom : recordCustoms){
            System.out.print(recordCustom.getuId()+" ");
            for(long l :recordCustom.getIsbn()){
                System.out.print(l+" ");
            }
            System.out.println();
        }
    }

    @Test
    public void selectIsbnByUid() throws Exception {
    }

}