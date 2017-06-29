package com.creat.lib.mapper;

import com.creat.lib.po.BookCart;
import com.creat.lib.po.BookCartExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BookCartMapper {
    int countByExample(BookCartExample example);

    int deleteByExample(BookCartExample example);

    int deleteByPrimaryKey(Integer shopId);

    int insert(BookCart record);

    int insertSelective(BookCart record);

    List<BookCart> selectByExample(BookCartExample example);

    int getBookCartCount(Integer uId);

    int getBookCartCountByBiId(@Param("uId")Integer uId,@Param("biId")Integer biId);

    void deleteTrashBookCart();

    BookCart selectByPrimaryKey(Integer shopId);

    int updateByExampleSelective(@Param("record") BookCart record, @Param("example") BookCartExample example);

    int updateByExample(@Param("record") BookCart record, @Param("example") BookCartExample example);

    int updateByPrimaryKeySelective(BookCart record);

    int updateByPrimaryKey(BookCart record);
}