package com.creat.lib.controller;

import com.creat.lib.component.RecommenderSystem;
import com.creat.lib.po.Book;
import com.creat.lib.po.BookPageVo;
import com.creat.lib.po.IsbnSimilarity;
import com.creat.lib.service.BookService;
import com.creat.lib.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.*;

/**
 * Created by Wuhaoze on 2017/5/14 0014.
 */
@Controller
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private RecordService recordService;
    @Autowired
    private RecommenderSystem recommenderSystem;
    //新书推荐
    @RequestMapping(value = "/getNewBooks")
    public @ResponseBody BookPageVo getNewBooks() throws Exception {
        Queue<Book> bookQueue = RecommenderSystem.getBookQueue();
        return  bookService.getNewBooks(bookQueue);
    }
    //保存书籍
    @RequestMapping(value = "/saveBook",method = RequestMethod.POST)
    public void saveBook(Book book, HttpServletResponse response) {
        try {
            response.setContentType("application/json;charset=utf-8");
            response.setCharacterEncoding("utf-8");
            PrintWriter printWriter =  response.getWriter();
            bookService.saveBook(book);
            synchronized (RecommenderSystem.getBookQueue()){
                Queue<Book> bookQueue = RecommenderSystem.getBookQueue();
                if(bookQueue.size() < 3){
                    bookQueue.add(book);
                }else {
                    bookQueue.poll();
                    bookQueue.add(book);
                }
            }
            printWriter.write("{\"IsSuccess\":true}");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //通过书名way=0，全拼way=1，首字母查找way=3
    @RequestMapping(value = "/searchBookMatch")
    public @ResponseBody BookPageVo searchBookMatch(Book book, int way, int rows) throws Exception {
        return bookService.searchBookMatch(book, way ,rows);
    }
    //通过id查找way=3或isbn查找way=4
    @RequestMapping(value = "/searchBookExact")
    public @ResponseBody BookPageVo searchBookExact(Book book, int way) throws Exception {
        return bookService.searchBookExact(book, way);
    }
    //获取下一页
    @RequestMapping(value = "/searchBookNext")
    public @ResponseBody BookPageVo searchBookNext(String next) throws Exception {
        return bookService.searchBookNext(next);
    }
    //分类获取书
    @RequestMapping(value = "/searchBookByCid")
    public @ResponseBody BookPageVo searchBookByCid(int cId, int rows) throws Exception {
        return bookService.searchBookByCid(cId, rows);
    }
    //获取图书详情
    @RequestMapping(value = "/getBookDetail")
    public @ResponseBody Map<String, Object> getBookDetail(String bId,Integer uId) throws Exception {
        Map<String, Object> map = bookService.getBookDetail(bId);
        BookPageVo bookPageVo = (BookPageVo) map.get("book");
        if(bookPageVo.getCount() == 1){
            Long isbn = Long.valueOf(bookPageVo.getBooks().get(0).getIsbn());
            recordService.updateRecordByIsbnAndUid(isbn,uId);
        }
        return map;
    }
    //完善图书信息
    @RequestMapping(value = "/finishBook")
    public @ResponseBody BookPageVo finishBook(String isbn)throws Exception{
        return bookService.finishBook(isbn);
    }
    //获取推荐书籍
    @RequestMapping(value = "/getRecommderBooks")
    public @ResponseBody BookPageVo getRecommderBooks(Integer uId) throws Exception {
        recommenderSystem.init();//这两段代码为测试阶段用例
        recommenderSystem.getSimilarityMatrix();
        Map<Long, Double> isbnList = recommenderSystem.getRecommenderBooksByUid(uId);
        if(!isbnList.isEmpty()){
            List<Long> isbns = new ArrayList<Long>();
            if(isbnList.size() > 3){
                List<IsbnSimilarity> isbnSimilarityList = new ArrayList<IsbnSimilarity>();
                for(Long isbn : isbnList.keySet()){
                    isbnSimilarityList.add(new IsbnSimilarity(isbn,isbnList.get(isbn)));
                }
                Arrays.sort(isbnSimilarityList.toArray());
                for(int i = 0; i < 3; i++){
                    isbns.add(isbnSimilarityList.get(i).getIsbn());
                }
            }else {
                for(Long isbn : isbnList.keySet()){
                    isbns.add(isbn);
                }
            }
            return bookService.searchBookByIsbnList(isbns);
        }else {
            BookPageVo bookPageVo = new BookPageVo();
            bookPageVo.setNext("");
            bookPageVo.setCount(0);
            return bookPageVo;
        }
    }
}
