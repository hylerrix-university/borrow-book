package com.creat.lib.po;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Wuhaoze on 2017/5/21 0021.
 */
public class BookPageVo {
    private String next;
    private int count;
    private List<Book> books;

    public String getNext() {
        return next;
    }

    public void setNext(String next) {
        this.next = next;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
