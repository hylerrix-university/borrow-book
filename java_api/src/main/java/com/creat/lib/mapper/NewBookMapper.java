package com.creat.lib.mapper;

import com.creat.lib.po.NewBook;
import com.creat.lib.po.NewBookExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface NewBookMapper {
    int countByExample(NewBookExample example);

    int deleteByExample(NewBookExample example);

    int deleteByPrimaryKey(Integer nId);

    int insert(NewBook record);

    int insertSelective(NewBook record);

    List<NewBook> selectByExample(NewBookExample example);

    NewBook selectByPrimaryKey(Integer nId);

    int updateByExampleSelective(@Param("record") NewBook record, @Param("example") NewBookExample example);

    int updateByExample(@Param("record") NewBook record, @Param("example") NewBookExample example);

    int updateByPrimaryKeySelective(NewBook record);

    int updateByPrimaryKey(NewBook record);
}