package com.creat.lib.component;

import com.creat.lib.mapper.BookCartMapper;
import com.creat.lib.po.BookCart;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/6/25 0025.
 */
public class TimeTask {
    @Autowired
    private BookCartMapper bookCartMapper;
    //定时删除垃圾记录
    public void cleanBookCart(){
        bookCartMapper.deleteTrashBookCart();
    }
}
