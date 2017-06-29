package com.creat.lib.mapper;

import com.creat.lib.po.SerialNum;
import com.creat.lib.po.SerialNumExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SerialNumMapper {
    int countByExample(SerialNumExample example);

    int deleteByExample(SerialNumExample example);

    int deleteByPrimaryKey(Integer snId);

    int insert(SerialNum record);

    int insertSelective(SerialNum record);

    List<SerialNum> selectByExample(SerialNumExample example);

    SerialNum selectByPrimaryKey(Integer snId);

    int updateByExampleSelective(@Param("record") SerialNum record, @Param("example") SerialNumExample example);

    int updateByExample(@Param("record") SerialNum record, @Param("example") SerialNumExample example);

    int updateByPrimaryKeySelective(SerialNum record);

    int updateByPrimaryKey(SerialNum record);
}