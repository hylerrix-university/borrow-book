package com.creat.lib.service;

import com.creat.lib.po.Record;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/6/2 0002.
 */
public interface RecordService {
    void updateRecordByIsbnAndUid(Long isbn, Integer uId) throws Exception;
}
