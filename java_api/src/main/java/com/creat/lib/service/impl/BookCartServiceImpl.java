package com.creat.lib.service.impl;

import com.creat.lib.mapper.BookCartMapper;
import com.creat.lib.mapper.BookItemMapper;
import com.creat.lib.po.BookCart;
import com.creat.lib.po.BookCartExample;
import com.creat.lib.po.BookItem;
import com.creat.lib.po.BookItemExample;
import com.creat.lib.service.BookCartService;
import com.creat.lib.service.OrderException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

/**
 * Created by Wuhaoze on 2017/6/24 0024.
 */
public class BookCartServiceImpl implements BookCartService{

    @Autowired
    private BookItemMapper bookItemMapper;
    @Autowired
    private BookCartMapper bookCartMapper;
    //扫码入书车
    public void insertOrder(Integer uId, String coding) throws Exception {
        int count = bookCartMapper.getBookCartCount(uId);
        if(count >= 2){
            throw new OrderException("只能借阅两本");
        }else {
            BookItemExample bookItemExample = new BookItemExample();
            BookItemExample.Criteria criteria = bookItemExample.createCriteria();
            criteria.andCodingEqualTo(coding);
            Integer biId = bookItemMapper.selectByExample(bookItemExample).get(0).getBiId();
            if(bookCartMapper.getBookCartCountByBiId(null,biId) >= 1){
                throw new OrderException("已被他人借阅");
            }else {
                if(bookCartMapper.getBookCartCountByBiId(uId,biId) >= 1){
                    throw new OrderException("已借阅");
                }
                BookCart bookCart = new BookCart();
                bookCart.setuId(uId);
                bookCart.setBiId(biId);
                bookCart.setNowdate(new Date());
                bookCart.setHour(2);
                bookCartMapper.insert(bookCart);
            }
        }
    }
    //预约
    public void updateOrderBook(Integer uId, String bId) throws OrderException  {
        int count = bookCartMapper.getBookCartCount(uId);
        if(count >= 2){
            throw new OrderException("只能预约或借阅两本");
        }else {
            BookItemExample bookItemExample = new BookItemExample();
            BookItemExample.Criteria criteria = bookItemExample.createCriteria();
            criteria.andBIdEqualTo(bId);
            criteria.andBorrowEqualTo(false);
            List<BookItem> bookItems = bookItemMapper.selectByExample(bookItemExample);
            for(BookItem bookItem : bookItems){
                BookCartExample bookCartExample = new BookCartExample();
                BookCartExample.Criteria criteria1 = bookCartExample.createCriteria();
                criteria1.andBiIdEqualTo(bookItem.getBiId());
                List<BookCart> bookCarts = bookCartMapper.selectByExample(bookCartExample);
                if(bookCarts == null || bookCarts.isEmpty()){
                    bookCartMapper.insert(loadBookCart(2,bookItem.getBiId(),uId));
                    break;
                }else {
                    if(bookCartMapper.getBookCartCountByBiId(null,bookItem.getBiId()) >= 1){
                        throw new OrderException("暂无此书");
                    }else {
                        if(bookCartMapper.getBookCartCountByBiId(uId,bookItem.getBiId()) >= 1){
                            throw new OrderException("已预定或借阅");
                        }
                        for(BookCart bookCart : bookCarts){
                            if((bookCart.getNowdate().getTime()+bookCart.getHour()*60*60*1000) < new Date().getTime()){
                                bookCartMapper.deleteByPrimaryKey(bookCart.getShopId());
                                bookCartMapper.insert(loadBookCart(2,bookItem.getBiId(),uId));
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    //装载BookCart
    private BookCart loadBookCart(int hour,int biId,int uId){
        BookCart bookCart = new BookCart();
        bookCart.setHour(2);
        bookCart.setBiId(biId);
        bookCart.setuId(uId);
        bookCart.setNowdate(new Date());
        return  bookCart;
    }
}
