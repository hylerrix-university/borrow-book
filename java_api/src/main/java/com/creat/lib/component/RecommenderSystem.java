package com.creat.lib.component;

import com.creat.lib.mapper.NewBookMapper;
import com.creat.lib.mapper.RecordCustomMapper;
import com.creat.lib.po.Book;
import com.creat.lib.po.NewBook;
import com.creat.lib.po.RecordCustom;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * Created by Wuhaoze on 2017/5/31 0031.
 */
public class RecommenderSystem {
    //相似度矩阵
    private static Map<Long,Map<Long,Integer>> similarity ;
    //每个书的用户量
    private static Map<Long,Integer> counts ;
    //新书缓存
    private static Queue<Book> bookQueue = new LinkedList<Book>();
    @Autowired
    private NewBookMapper newBookMapper;
    @Autowired
    private RecordCustomMapper recordCustomMapper;

    //初始化
    public void init(){
        similarity = null;
        counts = null;
        System.gc();
        similarity = new HashMap<Long, Map<Long, Integer>>();
        counts = new HashMap<Long, Integer>();
    }
    //将缓存存入数据库
    public void saveNewBooks(){
        if(!bookQueue.isEmpty()){
            for(Book book : bookQueue){
                NewBook newBook = new NewBook();
                newBook.setIsbn(Long.valueOf(book.getIsbn()));
                newBookMapper.insert(newBook);
            }
        }
    }
    //得到相似矩阵
    public void getSimilarityMatrix(){
        List<RecordCustom> recordCustomList = recordCustomMapper.selectAllRecordCustom();
        for(RecordCustom recordCustom : recordCustomList){
            List<Long> isbns = recordCustom.getIsbn();
            if(isbns != null && !isbns.isEmpty()){
                for(long isbn : isbns){
                    if(!counts.containsKey(isbn)){
                        counts.put(isbn,1);
                    }else {
                        counts.put(isbn,counts.get(isbn)+1);
                    }
                    for(long isbn2 : isbns){
                        if(isbn != isbn2){
                            if(similarity.containsKey(isbn)){
                                Map<Long, Integer> col = similarity.get(isbn);
                                if(col.containsKey(isbn2)){
                                    col.put(isbn2,col.get(isbn2)+1);
                                }else {
                                    col.put(isbn2,1);
                                }
                                similarity.put(isbn,col);
                            }else {
                                Map<Long, Integer> col = new HashMap<Long, Integer>();
                                col.put(isbn2,1);
                                similarity.put(isbn,col);
                            }
                        }
                    }
                }
            }
        }
    }
    //计算相似度
    private double calculateSimilarity(long isbnOne, long isbnAnother){
        int oneCount = counts.get(isbnOne);
        int anotherCount = counts.get(isbnAnother);
        int commonCount = similarity.get(isbnOne).get(isbnAnother);
        double result = commonCount/Math.sqrt((double) oneCount*anotherCount);
        return result;
    }
    //得到所有有关书的相似度
    public Map<Long, Double> getRecommenderBooksByUid(int uId){
        if(similarity == null || counts == null){
            init();
            getSimilarityMatrix();
        }
        Map<Long, Double> recommenderBooks = new HashMap<Long, Double>();
        List<Long> isbnList = recordCustomMapper.selectIsbnByUid(uId);
        for(Long isbn : isbnList){
            Map<Long, Integer> col = similarity.get(isbn);
            for(Long colIsbn : col.keySet()){
                if(!isbnList.contains(colIsbn)){
                    if(!recommenderBooks.containsKey(colIsbn)){
                        recommenderBooks.put(colIsbn,calculateSimilarity(isbn,colIsbn));
                    }else{
                        recommenderBooks.put(colIsbn,recommenderBooks.get(colIsbn)+calculateSimilarity(isbn,colIsbn));
                    }
                }
            }
        }
        return recommenderBooks;
    }
    public static Map<Long, Integer> getCounts() {
        return counts;
    }

    public static Map<Long, Map<Long, Integer>> getSimilarity() {
        return similarity;
    }

    public static Queue<Book> getBookQueue() {
        return bookQueue;
    }
}
