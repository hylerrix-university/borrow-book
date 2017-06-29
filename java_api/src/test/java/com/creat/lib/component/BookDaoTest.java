package com.creat.lib.component;

import com.creat.lib.po.Book;
import com.creat.lib.po.BookPageVo;
import org.junit.Test;

import java.util.List;

/**
 * Created by Administrator on 2017/5/20 0020.
 */
public class BookDaoTest {
    @Test
    public void selectBookByCid() throws Exception {
        BookDao bookDao = new BookDao();
        BookPageVo page = bookDao.selectBookByCid(2,5);
        List<Book> books = (List<Book>) page.getBooks();
        String next = (String) page.getNext();
        for(Book book : books){
            System.out.println(book.getbName());
            System.out.println(book.getAuthor());
        }
        while(true){
            BookPageVo page1 = bookDao.selectBookByScrollId(next);
            List<Book> books1 = (List<Book>) page1.getBooks();
            if(page1.getCount()==0){
                break;
            }
            String next1 = (String) page1.getNext();
            System.out.println(next1);
            for(Book book : books1){
                System.out.println(book.getbName());
            }
        }
    }

    @Test
    public void selectBookByIsbn() throws Exception {
        BookDao bookDao = new BookDao();
        BookPageVo book = bookDao.selectBookByIsbn("9787121227615");
        System.out.println(book.getBooks().get(0).getbName());
    }

    @Test
    public void selectBookByBid() throws Exception {
        BookDao bookDao = new BookDao();
        BookPageVo book = bookDao.selectBookByBid("AVwju6xqXBajqZo3Ep_");
        System.out.println(book.getBooks().get(0).getbName());
    }

    @Test
    public void selectBookBySpellOrInitial() throws Exception {
        BookDao bookDao = new BookDao();
        BookPageVo page = bookDao.selectBookBySpellOrInitial(BookDao.SELECT_SPELL,"daxingwangzhanxitongyuJava",10);
        List<Book> books = (List<Book>) page.getBooks();
        String next = (String) page.getNext();
        for(Book book : books){
            System.out.println(book.getbName());
            System.out.println(book.getAuthor());
        }
        while(true){
            BookPageVo page1 = bookDao.selectBookByScrollId(next);
            List<Book> books1 = (List<Book>) page1.getBooks();
            if(page1.getCount()==0){
                break;
            }
            String next1 = (String) page1.getNext();
            System.out.println(next1);
            for(Book book : books1){
                System.out.println(book.getbName());
            }
        }
    }

    @Test
    public void saveBook() throws Exception {
    }

    @Test
    public void selectBookByName() throws Exception {
        BookDao bookDao = new BookDao();
        BookPageVo page = bookDao.selectBookByName("网站系统",20);
        List<Book> books = (List<Book>) page.getBooks();
        String next = (String) page.getNext();
        for(Book book : books){
            System.out.println(book.getbName());
        }
        while(true){
            BookPageVo page1 = bookDao.selectBookByScrollId(next);
            List<Book> books1 = (List<Book>) page1.getBooks();
            if(page1.getCount()==0){
                break;
            }
            String next1 = (String) page1.getNext();
            System.out.println(next1);
            for(Book book : books1){
                System.out.println(book.getbName());
            }
        }

    }

}