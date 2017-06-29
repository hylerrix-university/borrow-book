package com.creat.lib.mapper;

import com.creat.lib.po.IsbnCount;
import com.creat.lib.po.RecordCustom;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/31 0031.
 */
public interface RecordCustomMapper {

    List<RecordCustom> selectAllRecordCustom();
    List<Long> selectIsbnByUid(Integer uId);
    List<IsbnCount> selectIsbnCountByUid(Integer uId);
}
