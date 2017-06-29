package com.creat.lib.service.impl;

import com.creat.lib.mapper.CategoryMapper;
import com.creat.lib.mapper.StackCustomMapper;
import com.creat.lib.mapper.StackMapper;
import com.creat.lib.po.CategoryExample;
import com.creat.lib.po.Stack;
import com.creat.lib.po.StackCustom;
import com.creat.lib.service.StackException;
import com.creat.lib.service.StackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/28 0028.
 */
public class StackServiceImpl implements StackService{
    @Autowired
    private StackMapper stackMapper;
    @Autowired
    private StackCustomMapper stackCustomMapper;
    @Autowired
    private CategoryMapper categoryMapper;
    //得到所有书库及分来信息
    public List<StackCustom> selectAllStacks() throws Exception {
        return stackCustomMapper.getAllStacks();
    }
    //添加书库信息
    public void addStack(String stackName) throws Exception {
        Stack stack = new Stack();
        stack.setsName(stackName);
        stackMapper.insert(stack);
    }
    //删除书库
    public void deleteStack(Integer sId) throws Exception {
        CategoryExample categoryExample = new CategoryExample();
        CategoryExample.Criteria criteria = categoryExample.createCriteria();
        criteria.andSIdEqualTo(sId);
        int count = categoryMapper.countByExample(categoryExample);
        if(count > 0){
            throw new StackException("书库下还有分类，无法删除!");
        }else {
            stackMapper.deleteByPrimaryKey(sId);
        }
    }
}
