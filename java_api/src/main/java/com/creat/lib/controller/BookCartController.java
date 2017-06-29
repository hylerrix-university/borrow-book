package com.creat.lib.controller;

import com.creat.lib.po.Message;
import com.creat.lib.service.BookCartService;
import com.creat.lib.service.OrderException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * Created by Wuhaoze on 2017/6/24 0024.
 */
@Controller
@RequestMapping("/bookCart")
public class BookCartController {
    @Autowired
    private BookCartService bookCartService;
    //加入书车
    @RequestMapping(value="/addToBookCart",method = RequestMethod.POST)
    public @ResponseBody Message addToBookCart(Integer uId, String coding) {
        Message message = new Message();
        try {
            bookCartService.insertOrder(uId,coding);
            message.setSucceed(true);
            message.setMsg("");
        } catch (Exception e) {
            message.setSucceed(false);
            e.printStackTrace();
            message.setMsg(e.getMessage());
        }finally {
            return message;
        }
    }
    //预约书
    @RequestMapping(value="/orderBook",method = RequestMethod.POST)
    public @ResponseBody Message orderBook(Integer uId, String bId){
        Message message = new Message();
        try {
            bookCartService.updateOrderBook(uId,bId);
            message.setMsg("");
            message.setSucceed(true);
        } catch (Exception e) {
            message.setSucceed(false);
            message.setMsg(e.getMessage());
        }finally {
            return message;
        }
    }
}
