package com.creat.lib.service.impl;

import com.creat.lib.mapper.RecordMapper;
import com.creat.lib.po.Record;
import com.creat.lib.po.RecordExample;
import com.creat.lib.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

/**
 * Created by Wuhaoze on 2017/6/2 0002.
 */
public class RecordServiceImpl implements RecordService{
    @Autowired
    private RecordMapper recordMapper;
    //更新记录
    public void updateRecordByIsbnAndUid(Long isbn, Integer uId) throws Exception {
        RecordExample recordExample = new RecordExample();
        RecordExample.Criteria criteria= recordExample.createCriteria();
        criteria.andIsbnEqualTo(isbn);
        criteria.andUIdEqualTo(uId);
        List<Record> recordList = recordMapper.selectByExample(recordExample);
        if(recordList == null || recordList.isEmpty()){
            Record record = new Record();
            Date date = new Date();
            record.setCount(1);
            record.setDate(date);
            record.setIsbn(isbn);
            record.setuId(uId);
            recordMapper.insert(record);
        }else {
            Record record = recordList.get(0);
            record.setDate(new Date());
            record.setIsbn(record.getIsbn());
            record.setCount(record.getCount()+1);
            recordMapper.updateByPrimaryKey(record);
        }
    }
}
