package com.creat.lib.controller;

import com.creat.lib.po.Category;
import com.creat.lib.po.Message;
import com.creat.lib.service.CategoryException;
import com.creat.lib.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.Member;
import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/21 0021.
 */
@Controller
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    //获取所有分类
    @RequestMapping(value="/getCategories")
    public @ResponseBody List<Category> getCategories() throws Exception {
        return categoryService.getCategories();
    }
    //添加分类
    @RequestMapping(value = "/addCategory")
    public @ResponseBody Message addCategory(Integer sId, String category){
        Message message = new Message();
        try {
            categoryService.insertCategory(sId, category);
            message.setMsg("");
            message.setSucceed(true);
        } catch (Exception e) {
            message.setSucceed(false);
            message.setMsg("未知错误");
        }finally {
            return message;
        }
    }
    //删除分类
    @RequestMapping(value ="/deleteCategory")
    public @ResponseBody Message deleteCategory(Integer cId){
        Message message = new Message();
        try {
            categoryService.deleteCategory(cId);
            message.setMsg("");
            message.setSucceed(true);
        } catch (Exception e) {
            if(e instanceof CategoryException){
                message.setSucceed(false);
                message.setMsg(e.getMessage());
            }else {
                e.printStackTrace();
                message.setSucceed(false);
                message.setMsg("未知错误");
            }
        }finally {
            return message;
        }
    }
}
