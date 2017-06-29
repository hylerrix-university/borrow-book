package com.creat.lib.po;

import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/31 0031.
 */
public class RecordCustom {
    private Integer uId;
    private List<Long> isbn;

    public Integer getuId() {
        return uId;
    }

    public void setuId(Integer uId) {
        this.uId = uId;
    }


    public List<Long> getIsbn() {
        return isbn;
    }

    public void setIsbn(List<Long> isbn) {
        this.isbn = isbn;
    }
}
