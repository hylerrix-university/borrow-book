package com.creat.lib.po;

/**
 * Created by Administrator on 2017/6/1 0001.
 */
public class IsbnSimilarity implements Comparable<IsbnSimilarity>{
    private Long isbn;
    private Double similarity;

    public IsbnSimilarity(Long isbn, Double similarity){
        this.isbn = isbn;
        this.similarity = similarity;
    }
    public int compareTo(IsbnSimilarity o) {
        Double temp = this.similarity-o.similarity;
        if(temp > 0){
            return 1;
        }else if (temp == 0){
            return 0;
        }else{
            return -1;
        }
    }

    public Long getIsbn() {
        return isbn;
    }

    public void setIsbn(Long isbn) {
        this.isbn = isbn;
    }
}
