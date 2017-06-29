<?php
/**
 * Created by PhpStorm.
 * User: puppy
 * Date: 17-6-7
 * Time: 下午7:48
 */
namespace app\index\controller;

use my\curl;
use my\Redis;
use think\Controller;
use think\Request;
use think\Db;

class book extends Controller
{
    private $fuzzyUrl = "https://corefuture.cn/lib_api/book/searchBookMatch.action";
    private $exactUrl = "https://corefuture.cn/lib_api/book/searchBookExact.action";

    public function searchBook()
    {
        //模糊精确查找
        $rows    = Request::instance()->post("rows");
        $keyword = Request::instance()->post("keyword");
        $way     = Request::instance()->post("way");
        $type    = "";
        if( $way == 3 || $way == 4) {
            $url = $this->exactUrl;
            if( $way == 3) {
                $data = ['way'=>$way,'bId'=>$keyword];
            } else {
                $data = ['way'=>$way,'isbn'=>$keyword];
            }

        } else {
            $url = $this->fuzzyUrl;
            switch($way)
            {
                case 0: $type = 'bName';
                    break;
                case 1: $type = 'spell';
                    break;
                case 2: $type = 'initial';
                    break;
            }
            $data = ['rows'=>$rows,'way'=>$way,$type=>$keyword];
        }
        $rst  = curl::http_post($url,$data);
        $this->setHeader();
        return $rst;
    }

    public function getBookDetail()
    {
        //　书籍详情
        $bId  = Request::instance()->post("bId");
        $url  = "https://corefuture.cn/lib_api/book/getBookDetail.action";
        $u_id = action("User/getUid");
        $data = [
            'bId'=>$bId,
            'uId'=>$u_id
        ];
        $this->setHeader();
        echo curl::http_post($url,$data);
    }
    public function getAllStacks()
    {
        //书库详情
        $url = "https://corefuture.cn/lib_api/stack/getAllStacks.action";
        $this->setHeader();
        echo curl::http_post($url,"");
    }
    public function getCategories()
    {
        //得到所有分类
        $url  = "https://corefuture.cn/lib_api/category/getCategories.action";
        $this->setHeader();
        $data = array();
        echo curl::http_post($url,$data);
    }
    public function getNextBook()
    {
        //获取下一页书籍
        $url  = "https://corefuture.cn/lib_api/book/searchBookNext.action";
        $next = Request::instance()->post("next");
        $data = ['next'=>$next];
        $this->setHeader();
        echo curl::http_post($url,$data);
    }
    public function searchBookByCid()
    {
        //通过分类ID获取书籍
        $url = "https://corefuture.cn/lib_api/book/searchBookByCid.action";
        $cId = Request::instance()->post("cId");
        $rows= Request::instance()->post("rows");
        $data= [
                'cId'=>$cId,
                'rows'=>$rows
            ];
        $this->setHeader();
        echo curl::http_post($url,$data);
    }
    public function getRecommderBooks()
    {
        //获取推荐书籍
        $url  = "https://corefuture.cn/lib_api/book/getRecommderBooks.action";
        $uId  = action("User/getUid");
        $data = ['uId'=>$uId];
        $this->setHeader();
        echo curl::http_post($url,$data);
    }
    public function setHeader()
    {
        header('Access-Control-Allow-Origin:*');
        header('Access-Control-Allow-Headers:X-Requested-With');
    }
    public function getBookInfo($bId)
    {
        $data = [
                'way'=>3,
                'bId'=>$bId
            ];
        return curl::http_post($this->exactUrl,$data);
    }
    public function getBiId($bId)
    {
        $sql  = "select bi_id from book_item where b_id = '$bId'";
        $biId = Db::query($sql);
        return $biId[0]['bi_id'];
    }
    public function getBidByCoding($coding)
    {
        $bId = Db::table("book_item")->where("coding",$coding)->value("b_id");
        return $bId;
    }
    public function getNewBookRecommend()
    {
        $url = "https://corefuture.cn/lib_api/book/getNewBooks.action";
        return curl::http_get($url);
    }
}