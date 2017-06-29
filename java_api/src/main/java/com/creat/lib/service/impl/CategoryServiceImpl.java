package com.creat.lib.service.impl;

import com.creat.lib.component.BookDao;
import com.creat.lib.mapper.BookItemMapper;
import com.creat.lib.mapper.CategoryMapper;
import com.creat.lib.mapper.SerialNumMapper;
import com.creat.lib.po.*;
import com.creat.lib.service.CategoryException;
import com.creat.lib.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/21 0021.
 */
public class CategoryServiceImpl implements CategoryService{
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private SerialNumMapper serialNumMapper;
    @Autowired
    private BookDao bookDao;
    //获取所有分类
    public List<Category> getCategories() throws Exception {
       return categoryMapper.selectByExample(new CategoryExample());
    }
    //插入分类
    public void insertCategory(Integer sId, String categoryName) throws Exception {
        Category category = new Category();
        category.setcName(categoryName);
        category.setsId(sId);
        categoryMapper.insert(category);
        SerialNum serialNum = new SerialNum();
        serialNum.setNumber(0);
        serialNum.setcId(category.getcId());
        serialNumMapper.insert(serialNum);
    }
    //删除分类
    public void deleteCategory(Integer cId) throws Exception {
        BookPageVo bookPageVo = bookDao.selectBookByCid(cId,5);
        if(bookPageVo.getCount() > 0){
            throw new CategoryException("分类下还有书籍，无法删除!");
        }else {
            SerialNumExample serialNumExample = new SerialNumExample();
            SerialNumExample.Criteria criteria = serialNumExample.createCriteria();
            criteria.andCIdEqualTo(cId);
            serialNumMapper.deleteByExample(serialNumExample);
            categoryMapper.deleteByPrimaryKey(cId);
        }
    }
}
