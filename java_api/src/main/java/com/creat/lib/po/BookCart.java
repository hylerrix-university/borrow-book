package com.creat.lib.po;

import java.util.Date;

public class BookCart {
    private Integer shopId;

    private Integer uId;

    private Integer biId;

    private Date nowdate;

    private Integer hour;

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public Integer getuId() {
        return uId;
    }

    public void setuId(Integer uId) {
        this.uId = uId;
    }

    public Integer getBiId() {
        return biId;
    }

    public void setBiId(Integer biId) {
        this.biId = biId;
    }

    public Date getNowdate() {
        return nowdate;
    }

    public void setNowdate(Date nowdate) {
        this.nowdate = nowdate;
    }

    public Integer getHour() {
        return hour;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }
}