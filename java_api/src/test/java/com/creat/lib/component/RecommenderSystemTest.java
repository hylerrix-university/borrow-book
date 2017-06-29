package com.creat.lib.component;

import com.creat.lib.mapper.RecordCustomMapper;
import org.elasticsearch.common.MacAddressProvider;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2017/6/1 0001.
 */
public class RecommenderSystemTest {
    private ApplicationContext applicationContext;
    private RecommenderSystem recommenderSystem;
    @Before
    public void setup(){
        applicationContext = new ClassPathXmlApplicationContext("classpath:spring/applicationContext-dao.xml");
        recommenderSystem = new RecommenderSystem();
        //recommenderSystem.setRecordCustomMapper((RecordCustomMapper) applicationContext.getBean("recordCustomMapper"));
    }
    @Test
    public void init() throws Exception {
    }

    @Test
    public void getSimilarityMatrix() throws Exception {
    }

    @Test
    public void getRecommenderBooksByUid() throws Exception {
        recommenderSystem.init();
        recommenderSystem.getSimilarityMatrix();
        Map<Long,Double> map = recommenderSystem.getRecommenderBooksByUid(1);
        System.out.println(map);
    }

    @Test
    public void getCounts() throws Exception {
    }

    @Test
    public void getSimilarity() throws Exception {
    }

}