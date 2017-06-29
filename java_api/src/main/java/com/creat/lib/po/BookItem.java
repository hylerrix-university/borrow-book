package com.creat.lib.po;

public class BookItem {
    private Integer biId;

    private String bId;

    private String coding;

    private Boolean borrow;

    public Integer getBiId() {
        return biId;
    }

    public void setBiId(Integer biId) {
        this.biId = biId;
    }

    public String getbId() {
        return bId;
    }

    public void setbId(String bId) {
        this.bId = bId == null ? null : bId.trim();
    }

    public String getCoding() {
        return coding;
    }

    public void setCoding(String coding) {
        this.coding = coding == null ? null : coding.trim();
    }

    public Boolean getBorrow() {
        return borrow;
    }

    public void setBorrow(Boolean borrow) {
        this.borrow = borrow;
    }
}