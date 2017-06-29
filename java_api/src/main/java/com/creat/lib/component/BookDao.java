package com.creat.lib.component;

import com.creat.lib.po.Book;
import com.creat.lib.po.BookPageVo;
import net.sf.json.JSONObject;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.*;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;

/**
 * Created by Wuhaoze on 2017/5/14 0014.
 */
public class BookDao {
    public static final String SELECT_SPELL = "spell";
    public static final String SELECT_INITIAL = "initial";
    private static TransportClient client;
    //初始化client连接
    static{
        try {
            Settings set = Settings.settingsBuilder()
                    .put("cluster.name", "myes")
                    .put("client.transport.sniff",false).build();
            client = TransportClient.builder().settings(set).build();
            byte[] bs = new byte[] { (byte) 118, (byte) 89, (byte) 172, (byte) 192};
            client.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByAddress(bs), 9300));
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
    //通过isbn批量获取书籍
    public BookPageVo selectBooksByIsbnList(List<Long> isbnList){
        BookPageVo bookPageVo = new BookPageVo();
        List<Book> books = new ArrayList<Book>();
        int count = 0;
        MultiSearchRequestBuilder builder = client.prepareMultiSearch();
        for (Long isbn : isbnList){
            SearchRequestBuilder searchRequestBuilder = client.prepareSearch()
                    .setQuery(QueryBuilders.matchPhraseQuery("isbn", String.valueOf(isbn)));
            builder.add(searchRequestBuilder);
        }
        MultiSearchResponse responses = builder.execute().actionGet();
        for (MultiSearchResponse.Item item : responses.getResponses()) {
            SearchResponse response = item.getResponse();
            SearchHit[] hits = response.getHits().getHits();
            for(SearchHit hit : hits){
                String bId = hit.getId();
                addBooksBySearchHit(hit,books,bId);
                count++;
            }
        }
        bookPageVo.setCount(count);
        bookPageVo.setNext("");
        bookPageVo.setBooks(books);
        return bookPageVo;
    }
    //获取相关书籍
    public BookPageVo selectRelatedBooks(List<String> tags,int cId,String bookId){
        BookPageVo bookPageVo = new BookPageVo();
        List<Book> books = new ArrayList<Book>();
        int count = 0;
        Set<String> bIdSet = new HashSet<String>();
        MultiSearchRequestBuilder builder = client.prepareMultiSearch();
        for(String tag : tags){
            SearchRequestBuilder searchRequestBuilder = client.prepareSearch("library")
                    .setTypes("book")
                    .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                    .setQuery(QueryBuilders.matchPhraseQuery("bName", tag))
                    .setSize(1);
            builder.add(searchRequestBuilder);
        }
        MultiSearchResponse responses = builder.execute().actionGet();
        for (MultiSearchResponse.Item item : responses.getResponses()) {
            SearchResponse response = item.getResponse();
            SearchHit[] hits = response.getHits().getHits();
            for(SearchHit hit : hits){
                String bId = hit.getId();
                if(!bIdSet.contains(bId) && !bId.equals(bookId)){
                    bIdSet.add(bId);
                    addBooksBySearchHit(hit,books,bId);
                    count++;
                }
            }
        }
        SearchResponse response = client.prepareSearch("library")
                .setTypes("book")
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                .setQuery(QueryBuilders.termQuery("cId",cId))
                .setSize(15-count)
                .execute()
                .actionGet();
        for(SearchHit hit : response.getHits().getHits()){
            String bId = hit.getId();
            if(!bIdSet.contains(bId) && count<=9 && !bId.equals(bookId)){
                bIdSet.add(bId);
                addBooksBySearchHit(hit,books,bId);
                count++;
            }
        }
        bookPageVo.setNext("");
        bookPageVo.setCount(count);
        bookPageVo.setBooks(books);
        return bookPageVo;
    }
    //分类查询
    public BookPageVo selectBookByCid(int cId, int rows){
        SearchResponse response = client.prepareSearch("library")
                .setTypes("book")
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                .setScroll(new TimeValue(60000))
                .setQuery(QueryBuilders.termQuery("cId",cId))
                .setSize(rows)
                .execute()
                .actionGet();
        return loadBooksBySearchResponse(response,rows);
    }
    //把书存到搜索引擎
    public String saveBook(Book book){
        String json = loadBookToJson(book);
        IndexResponse response = client.prepareIndex("library", "book")
                .setSource(json)
                .get();
        return  response.getId();
    }
    //通过isbn查书
    public BookPageVo selectBookByIsbn(String isbn){
        SearchResponse response = client.prepareSearch("library")
                .setTypes("book")
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                .setQuery(QueryBuilders.termQuery("isbn",isbn))
                .execute()
                .actionGet();
        return loadBookBySearchResponse(response);
    }
    //通过id查书
    public BookPageVo selectBookByBid(String bId){
        GetResponse response = client.prepareGet()
                    .setIndex("library")
                    .setType("book")
                    .setId(bId)
                    .execute()
                    .actionGet();
        return loadBookByGetResponse(response);
    }
    //更新书籍的总量
    public void updateBookCountByBid(String bId, int count){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("count",count);
        client.prepareUpdate().setIndex("library")
                .setType("book")
                .setId(bId)
                .setDoc(jsonObject.toString())
                .execute();
    }
    //通过拼音或首字母查书
    public BookPageVo selectBookBySpellOrInitial(String select, String spell, int rows){
        spell = spell.toLowerCase();
        SearchResponse response = client.prepareSearch("library")
                .setTypes("book")
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                .setScroll(new TimeValue(60000))
                .setQuery(QueryBuilders.prefixQuery(select,spell))
                .setSize(rows)
                .execute()
                .actionGet();
        return loadBooksBySearchResponse(response,rows);
    }
    //通过书名搜书
    public BookPageVo selectBookByName(String name,int rows){
        SearchResponse response = client.prepareSearch("library")
                .setTypes("book")
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                .setScroll(new TimeValue(60000))
                .setQuery(QueryBuilders.matchPhraseQuery("bName", name))
                .setSize(rows)
                .execute()
                .actionGet();
        return loadBooksBySearchResponse(response,rows);
    }
    //获取下一页
    public BookPageVo selectBookByScrollId(String scrollId){
        SearchResponse scrollResp = client.prepareSearchScroll(scrollId)
                .setScroll(new TimeValue(60000))
                .execute()
                .actionGet();
        return loadBooksBySearchResponse(scrollResp,-1);
    }
    //装载书页
    private BookPageVo loadBooksBySearchResponse(SearchResponse response,int rows){
        BookPageVo bookPageVo = new BookPageVo();
        SearchHit[] hits =response.getHits().getHits();
        if(hits.length > 0){
            List<Book> books = new ArrayList<Book>();
            int count = 0;
            for(SearchHit hit : hits){
                String bId = hit.getId();
                addBooksBySearchHit(hit,books,bId);
                count++;
            }
            bookPageVo.setBooks(books);
            bookPageVo.setCount(count);
            if(rows == -1){
                bookPageVo.setNext(response.getScrollId());
            }else {
                if(count < rows){
                    bookPageVo.setNext("");
                }else {
                   bookPageVo.setNext(response.getScrollId());
                }
            }
        }else {
            bookPageVo.setNext("");
            bookPageVo.setCount(0);
        }
        return bookPageVo;
    }
    //装载单个书
    private BookPageVo loadBookBySearchResponse(SearchResponse response) {
        BookPageVo bookPageVo = new BookPageVo();
        bookPageVo.setNext("");
        SearchHit[] hits =response.getHits().getHits();
        if(hits.length!=0) {
            SearchHit hit = hits[0];
            String bId = hit.getId();
            Map<String, Object> map = hit.getSource();
            map.put("bId",bId);
            JSONObject bookObj =JSONObject.fromObject(map);
            Book book = (Book) JSONObject.toBean(bookObj,Book.class);
            List<Book> books = new ArrayList<Book>();
            books.add(book);
            bookPageVo.setCount(1);
            bookPageVo.setBooks(books);
            return bookPageVo;
        }else {
            bookPageVo.setCount(0);
            return bookPageVo;
        }
    }
    //装载单个书
    private BookPageVo loadBookByGetResponse(GetResponse response){
        BookPageVo bookPageVo = new BookPageVo();
        bookPageVo.setNext("");
        Map<String, Object> map = response.getSource();
        if(map != null){
            map.put("bId",response.getId());
            JSONObject bookObj =JSONObject.fromObject(map);
            List<Book> books = new ArrayList<Book>();
            Book book = (Book) JSONObject.toBean(bookObj,Book.class);
            books.add(book);
            bookPageVo.setCount(1);
            bookPageVo.setBooks(books);
            return bookPageVo;
        }else {
            bookPageVo.setCount(0);
            return bookPageVo;
        }
    }
    //装载Book
    private String loadBookToJson(Book book){
        JSONObject jsonObject = JSONObject.fromObject(book);
        jsonObject.remove("bId");
        return  jsonObject.toString();
    }
    //通过SearchHit把书装填到list
    private void addBooksBySearchHit(SearchHit hit, List<Book> books,String bId){
        Map<String, Object> map = hit.getSource();
        map.put("bId",bId);
        JSONObject bookObj =JSONObject.fromObject(map);
        Book book = (Book) JSONObject.toBean(bookObj,Book.class);
        books.add(book);
    }
}
