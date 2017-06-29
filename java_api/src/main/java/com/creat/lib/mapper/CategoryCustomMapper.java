package com.creat.lib.mapper;

import com.creat.lib.po.Category;
import com.creat.lib.po.CategoryCustom;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/22 0022.
 */
public interface CategoryCustomMapper {
    CategoryCustom selectByCid(Integer cId);
    List<Category> selectBySid(Integer sId);
}
