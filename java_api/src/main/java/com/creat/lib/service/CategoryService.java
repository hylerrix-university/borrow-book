package com.creat.lib.service;

import com.creat.lib.po.Category;

import java.util.List;

/**
 * Created by Administrator on 2017/5/21 0021.
 */
public interface CategoryService {
    List<Category> getCategories() throws Exception;
    void insertCategory(Integer sId, String categoryName) throws Exception;
    void deleteCategory(Integer cId) throws Exception;
}
