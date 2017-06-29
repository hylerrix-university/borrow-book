package com.creat.lib.service;

import com.creat.lib.po.Book;
import com.creat.lib.po.BookPageVo;

import java.util.List;
import java.util.Map;
import java.util.Queue;

/**
 * Created by Wuhaoze on 2017/5/14 0014.
 */

public interface  BookService {
    int SEARCH_BY_NAME = 0;
    int SEARCH_BY_SPELL = 1;
    int SEARCH_BY_INITIAL = 2;
    int SEARCH_BY_ID = 3;
    int SEARCH_BY_ISBN = 4;
    String DETAIL_URL = "https://api.douban.com/v2/book/isbn/";
    void saveBook(Book book) throws Exception;
    BookPageVo getNewBooks(Queue<Book> bookQueue) throws Exception;
    BookPageVo searchBookMatch(Book book, int way, int rows) throws Exception;
    BookPageVo searchBookNext(String next) throws Exception;
    BookPageVo searchBookExact(Book book, int way) throws Exception;
    BookPageVo searchBookByCid(int cId, int rows) throws Exception;
    Map<String, Object> getBookDetail(String cId) throws Exception;
    BookPageVo finishBook(String isbn) throws Exception;
    BookPageVo searchBookByIsbnList(List<Long> isbnList) throws Exception;
}
