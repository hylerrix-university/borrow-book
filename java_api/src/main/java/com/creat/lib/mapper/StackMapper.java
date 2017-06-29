package com.creat.lib.mapper;

import com.creat.lib.po.Stack;
import com.creat.lib.po.StackExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface StackMapper {
    int countByExample(StackExample example);

    int deleteByExample(StackExample example);

    int deleteByPrimaryKey(Integer sId);

    int insert(Stack record);

    int insertSelective(Stack record);

    List<Stack> selectByExample(StackExample example);

    Stack selectByPrimaryKey(Integer sId);

    int updateByExampleSelective(@Param("record") Stack record, @Param("example") StackExample example);

    int updateByExample(@Param("record") Stack record, @Param("example") StackExample example);

    int updateByPrimaryKeySelective(Stack record);

    int updateByPrimaryKey(Stack record);
}