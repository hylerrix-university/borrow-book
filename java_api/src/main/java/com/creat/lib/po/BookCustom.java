package com.creat.lib.po;

import java.util.List;

/**
 * Created by Administrator on 2017/5/14 0014.
 */
public class BookCustom extends Book {
    private String publisher;//出版社
    private String catalog;//目录
    private String sName;//书库名
    private String cName;//分类名
    private String summary;//书评
    private int canBorCount;//在架可借
    private List<BookItem> bookItems;

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getCatalog() {
        return catalog;
    }

    public void setCatalog(String catalog) {
        this.catalog = catalog;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }

    public List<BookItem> getBookItems() {
        return bookItems;
    }

    public void setBookItems(List<BookItem> bookItems) {
        this.bookItems = bookItems;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public int getCanBorCount() {
        return canBorCount;
    }

    public void setCanBorCount(int canBorCount) {
        this.canBorCount = canBorCount;
    }
}
