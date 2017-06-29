package com.creat.lib.service;

/**
 * Created by Wuhaoze on 2017/6/24 0024.
 */
public interface BookCartService {
    //插入记录接口
    void insertOrder(Integer uId,String coding) throws Exception;
    //更新记录接口
    void updateOrderBook(Integer uId,String bId) throws Exception;
}
