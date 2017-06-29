package com.creat.lib.service.impl;

import com.creat.lib.component.BookDao;
import com.creat.lib.mapper.*;
import com.creat.lib.po.*;
import com.creat.lib.service.BookService;
import com.creat.lib.utils.DecimalConversion;
import com.creat.lib.utils.MyHttpClient;
import com.creat.lib.utils.PinyinParse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.*;

/**
 * Created by Wuhaoze on 2017/5/14 0014.
 */
public class BookServiceImpl implements BookService{

    @Autowired
    private BookDao bookDao;
    @Autowired
    private SerialNumMapper serialNumMapper;
    @Autowired
    private BookItemMapper bookItemMapper;
    @Autowired
    private CategoryCustomMapper categoryCustomMapper;
    @Autowired
    private NewBookMapper newBookMapper;
    @Autowired
    private BookCartMapper bookCartMapper;
    //存入书籍
    public void saveBook(Book book) throws Exception {
        BookPageVo preBook = bookDao.selectBookByIsbn(book.getIsbn());
        System.out.println(preBook.getCount());
        String bName = book.getbName();
        Integer count = book.getCount();
        Integer sId = book.getsId();
        Integer cId = book.getcId();
        String bId = null;
        if(preBook.getCount() > 0){
            bId = preBook.getBooks().get(0).getbId();
            bookDao.updateBookCountByBid(bId,count+preBook.getBooks().get(0).getCount());
        }else {
            book.setSpell(PinyinParse.getPingYin(bName));
            book.setInitial(PinyinParse.getPinYinHeadChar(bName));
            bId = bookDao.saveBook(book);
        }
        List<String> codings = new ArrayList<String>();
        for(int i = 0; i < count; i++){
            SerialNumExample example = new SerialNumExample();
            SerialNumExample.Criteria criteria = example.createCriteria();
            criteria.andCIdEqualTo(cId);
            SerialNum serialNum = serialNumMapper.selectByExample(example).get(0);
            codings.add(DecimalConversion.toHexString(sId,2)+
                    DecimalConversion.toHexString(cId,3)+
                    DecimalConversion.toHexString(serialNum.getNumber(),8));//生成图书编码
            int num = serialNum.getNumber();
            serialNum.setNumber(num+1);
            serialNumMapper.updateByPrimaryKey(serialNum);
        }
        for(String coding : codings){
            BookItem bookItem = new BookItem();
            bookItem.setbId(bId);
            bookItem.setBorrow(false);
            bookItem.setCoding(coding);
            bookItemMapper.insert(bookItem);
        }
    }
    //获取新书籍
    public BookPageVo getNewBooks(Queue<Book> bookQueue) throws Exception {
        BookPageVo bookPageVo;
        if(bookQueue.isEmpty()){
            bookPageVo = bookDao.selectBookByCid(1,3);
        }else{
            List<Long> isbns = new ArrayList<Long>();
            NewBookExample newBookExample = new NewBookExample();
            List<NewBook> newBooks = newBookMapper.selectByExample(newBookExample);
            if(newBooks != null && !newBooks.isEmpty()){
                for(NewBook newBook : newBooks){
                    isbns.add(newBook.getIsbn());
                }
            }else {
                for(Book book : bookQueue){
                    isbns.add(Long.valueOf(book.getIsbn()));
                }
            }
            bookPageVo = bookDao.selectBooksByIsbnList(isbns);
            if(bookPageVo.getCount() < 3){
                BookPageVo temp = bookDao.selectBookByCid(1,3-bookPageVo.getCount());
                for(Book book :temp.getBooks()){
                    bookPageVo.getBooks().add(book);
                }
            }
        }
        bookPageVo.setNext("");
        return bookPageVo;
    }
    //模糊查找
    public BookPageVo searchBookMatch(Book book, int way, int rows) throws Exception {
        if(way == BookService.SEARCH_BY_NAME){
            return bookDao.selectBookByName(book.getbName(),rows);
        }else if(way == BookService.SEARCH_BY_SPELL){
            return bookDao.selectBookBySpellOrInitial(BookDao.SELECT_SPELL, book.getSpell(), rows);
        }else if(way == BookService.SEARCH_BY_INITIAL){
            return bookDao.selectBookBySpellOrInitial(BookDao.SELECT_INITIAL, book.getInitial(), rows);
        }else {
            return null;
        }
    }
    //获取下一页
    public BookPageVo searchBookNext(String next) throws Exception {
        return bookDao.selectBookByScrollId(next);
    }
    //精确查找
    public BookPageVo searchBookExact(Book book, int way) throws Exception {
        if(way == BookService.SEARCH_BY_ID){
            return bookDao.selectBookByBid(book.getbId());
        }else if(way == BookService.SEARCH_BY_ISBN){
            return bookDao.selectBookByIsbn(book.getIsbn());
        }else {
            return null;
        }
    }
    //分类查找
    public BookPageVo searchBookByCid(int cId, int rows) throws Exception {
        return bookDao.selectBookByCid(cId, rows);
    }
    //获取图书详情,包括推荐书籍
    public Map<String, Object> getBookDetail(String bId) throws Exception{
        Map<String, Object> map = new HashMap<String, Object>();
        BookPageVo bookPageVo = bookDao.selectBookByBid(bId);
        BookPageVo relatedBooks = null;
        List<String> tags = null;
        if(bookPageVo.getCount() != 0){
            Book book = bookPageVo.getBooks().get(0);
            String isbn = book.getIsbn();
            JSONObject jsonObject = requestUrlByIsbn(isbn);
            List<Book> books = new ArrayList<Book>();
            BookCustom bookCustom = new BookCustom();
            bookCustom.setbId(book.getbId());
            bookCustom.setAuthor(book.getAuthor());
            bookCustom.setbName(book.getbName());
            bookCustom.setCount(book.getCount());
            bookCustom.setImgurl(book.getImgurl());
            bookCustom.setIsbn(book.getIsbn());
            if(!jsonObject.containsKey("msg")){
                bookCustom.setSummary(jsonObject.getString("summary"));
                bookCustom.setPublisher(jsonObject.getString("publisher"));
                bookCustom.setCatalog(jsonObject.getString("catalog"));
                tags = getTags(jsonObject);
            }
            relatedBooks = bookDao.selectRelatedBooks(tags,book.getcId(),book.getbId());
            CategoryCustom categoryCustom = categoryCustomMapper.selectByCid(book.getcId());
            bookCustom.setsName(categoryCustom.getStack().getsName());
            bookCustom.setcName(categoryCustom.getcName());
            BookItemExample bookItemExample = new BookItemExample();
            BookItemExample.Criteria criteria = bookItemExample.createCriteria();
            criteria.andBIdEqualTo(book.getbId());
            List<BookItem> bookItems= bookItemMapper.selectByExample(bookItemExample);
            int canBorCount = 0;
            for(BookItem bookItem : bookItems){//计算可接数量
                if(bookItem.getBorrow() == false){
                    BookCartExample bookCartExample = new BookCartExample();
                    BookCartExample.Criteria criteria1 = bookCartExample.createCriteria();
                    criteria1.andBiIdEqualTo(bookItem.getBiId());
                    List<BookCart> bookCarts = bookCartMapper.selectByExample(bookCartExample);
                    if(bookCarts == null || bookCarts.isEmpty()){
                        canBorCount++;
                    }else {
                        for(BookCart bookCart : bookCarts){
                            if((bookCart.getNowdate().getTime()+bookCart.getHour()*60*60*1000) < new Date().getTime()){
                                bookCartMapper.deleteByPrimaryKey(bookCart.getShopId());
                                canBorCount++;
                            }
                        }
                    }
                }
            }
            bookCustom.setCanBorCount(canBorCount);
            bookCustom.setBookItems(bookItems);
            books.add(bookCustom);
            bookPageVo.setNext("");
            bookPageVo.setCount(1);
            bookPageVo.setBooks(books);
        }else {
            bookPageVo.setNext("");
            bookPageVo.setCount(0);
        }
        map.put("book",bookPageVo);
        map.put("relatedBooks",relatedBooks);
        return map;
    }
    //完善图书信息
    public BookPageVo finishBook(String isbn) throws Exception{
        BookPageVo bookPageVo = new BookPageVo();
        JSONObject jsonObject = requestUrlByIsbn(isbn);
        if(!jsonObject.containsKey("msg")){
            List<Book> books = new ArrayList<Book>();
            Book book = new Book();
            book.setIsbn(isbn);
            book.setbName(jsonObject.getString("title"));
            book.setAuthor(jsonObject.getJSONArray("author").getString(0));
            book.setImgurl(jsonObject.getString("image"));
            books.add(book);
            bookPageVo.setCount(1);
            bookPageVo.setNext("");
            bookPageVo.setBooks(books);
        }else {
            bookPageVo.setCount(0);
            bookPageVo.setNext("");
        }
        return bookPageVo;
    }
    //批量获取书籍通过isbnList
    public BookPageVo searchBookByIsbnList(List<Long> isbnList) throws Exception {
        return bookDao.selectBooksByIsbnList(isbnList);
    }
    //模拟请求得到书籍信息
    private JSONObject requestUrlByIsbn(String isbn) throws IOException {
        String url = BookService.DETAIL_URL+isbn;
        MyHttpClient myHttpClient = new MyHttpClient();
        CloseableHttpResponse response = myHttpClient.sendGet(url);
        HttpEntity entity = response.getEntity();
        String json = EntityUtils.toString(entity,"utf-8");
        response.close();
        return JSONObject.fromObject(json);
    }
    //获取标签
    private List<String> getTags(JSONObject jsonObject){
        List<String> tags = new ArrayList<String>();
        JSONArray jsonArray = jsonObject.getJSONArray("tags");
        for(int i = 0; i < jsonArray.size(); i++){
            tags.add(jsonArray.getJSONObject(i).getString("name"));
        }
        return tags;
    }
}
