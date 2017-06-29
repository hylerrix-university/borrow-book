package com.creat.lib.mapper;

import com.creat.lib.po.BookItem;
import com.creat.lib.po.BookItemExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BookItemMapper {
    int countByExample(BookItemExample example);

    int deleteByExample(BookItemExample example);

    int deleteByPrimaryKey(Integer biId);

    int insert(BookItem record);

    int insertSelective(BookItem record);

    List<BookItem> selectByExample(BookItemExample example);

    BookItem selectByPrimaryKey(Integer biId);

    int updateByExampleSelective(@Param("record") BookItem record, @Param("example") BookItemExample example);

    int updateByExample(@Param("record") BookItem record, @Param("example") BookItemExample example);

    int updateByPrimaryKeySelective(BookItem record);

    int updateByPrimaryKey(BookItem record);
}