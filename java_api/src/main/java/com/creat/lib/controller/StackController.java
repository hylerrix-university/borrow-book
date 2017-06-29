package com.creat.lib.controller;

import com.creat.lib.po.Message;
import com.creat.lib.po.StackCustom;
import com.creat.lib.service.StackException;
import com.creat.lib.service.StackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/28 0028.
 */
@Controller
@RequestMapping("/stack")
public class StackController {
    @Autowired
    private StackService stackService;
    //得到所有书库信息
    @RequestMapping(value = "/getAllStacks")
    public @ResponseBody List<StackCustom> getAllStacks() throws Exception {
        return  stackService.selectAllStacks();
    }
    //添加书库
    @RequestMapping(value = "/addStack")
    public @ResponseBody Message addStack(String stack) {
        Message message = new Message();
        try {
            stackService.addStack(stack);
            message.setSucceed(true);
            message.setMsg("");
        } catch (Exception e) {
            message.setSucceed(false);
            message.setMsg("未知错误");
        }finally {
            return message;
        }
    }
    //删除书库
    @RequestMapping(value ="/deleteStack")
    public @ResponseBody Message deleteStack(Integer sId){
        Message message = new Message();
        try {
            stackService.deleteStack(sId);
            message.setSucceed(true);
            message.setMsg("");
        } catch (Exception e) {
            if(e instanceof StackException){
                message.setSucceed(false);
                message.setMsg(e.getMessage());
            }else {
                message.setSucceed(false);
                message.setMsg("未知错误");
            }
        }finally {
            return message;
        }
    }
}
