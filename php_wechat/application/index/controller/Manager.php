<?php
/**
 * Created by PhpStorm.
 * User: puppy
 * Date: 17-6-7
 * Time: 下午11:09
 */

namespace app\index\controller;

use my\curl;
use my\Redis;
use think\Controller;
use think\Db;
use think\Request;
use think\Session;

class Manager extends Controller
{
    public function login()
    {
        //管理员登录
        $adminId       = Request::instance()->post("admin_name");
        $adminPassword = Request::instance()->post("admin_password");
        $adminPid      = 1;
        $rst = Db::table("admin")
            ->where("admin_name",$adminId)
            ->where("admin_password","$adminPassword")
            ->where("p_id",$adminPid)
            ->find();
        if($rst) {
            $value=$adminId."+".$adminPassword;
            $data = ['res'=>1];
            session_id(md5($adminId));
            Session::set(md5($adminId),$value);
        }else {
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }
    public function register()
    {
        if(!$this->check()){
            return ['res'=>'-3'];//-3身份验证出错
        }
        $adminId       = Request::instance()->post("admin_name");
        $adminPassword = Request::instance()->post("admin_password");
        $pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
        if ( !preg_match( $pattern, $adminId ) )
        {
            return ['res'=>"-2"];
        }
        $rst = Db::table("admin")->where("admin_name",$adminId)->select();
        if($rst!=NULL){
            $this->setHeader();
            return ['res'=>-1];
        }
        $powerId = 1;
        $data = [
            'admin_name'=>$adminId,
            'admin_password'=>$adminPassword,
            'p_id'=>$powerId
        ];
        $this->setHeader();
        if(Db::table('admin')->insert($data)){
            return ['res'=>1];
        }else{
            return ['res'=>0];
        }
    }
    public function cancel()
    {
        $adminId = Request::instance()->post("admin_name");
        if(!$this->check()){
            $this->setHeader();
            return ['res'=>'-3'];//-3身份验证出错
        }else{
            $this->setHeader();
            if(Db::table("admin")->where("admin_name",$adminId)->delete()){
                return ['res'=>1];
            }else{
                return ['res'=>0];
            }
        }
    }
    public function select()
    {
        if(!$this->check()){
            $this->setHeader();
            return ['res'=>'-3'];//-3身份验证出错
        }else{
            $sql = "select admin_id,admin_name,admin_password from admin";
            $this->setHeader();
            return Db::query($sql);
        }
    }
    public function getAllStack()
    {
        $url = "https://corefuture.cn/lib_api/stack/getAllStacks.action";
        if($this->check()){
            $this->setHeader();
            return curl::http_post($url,"");
        }else{
            return false;
        }
    }
    public function addStack()
    {
        $url = "https://corefuture.cn/lib_api/stack/addStack.action";
        $stack= Request::instance()->post("stack");
        if($this->check()){
            $data = ['stack'=>$stack];
            $this->setHeader();
            return curl::http_post($url,$data);
        }else{
            $this->setHeader();
            return ['res'=>-3];
        }
    }
    public function deleteStack()
    {
        $url = "https://corefuture.cn/lib_api/stack/deleteStack.action";
        $sId = Request::instance()->post("sId");
        if($this->check()){
            $data = ['sId'=>$sId];
            $this->setHeader();
            return curl::http_post($url,$data);
        }else{
            $this->setHeader();
            return ['res'=>-3];
        }
    }
    public function getCategories()
    {
        $url = "https://corefuture.cn/lib_api/category/getCategories.action";
        if($this->check()){
            $this->setHeader();
            return curl::http_post($url,"");
        }else{
            $this->setHeader();
            return ['res'=>-3];
        }
    }
    public function addCategory()
    {
        $url = "https://corefuture.cn/lib_api/category/addCategory.action";
        $sId = Request::instance()->post("sId");
        $category = Request::instance()->post("category");
        if($this->check()){
            $data = [
                'sId'=>$sId,
                'category'=>$category
            ];
            $this->setHeader();
            return curl::http_post($url,$data);
        }else{
            $this->setHeader();
            return ['res'=>-3];
        }
    }
    public function deleteCategory()
    {
        $url = "https://corefuture.cn/lib_api/category/deleteCategory.action";
        $cId = Request::instance()->post("cId");
        if($this->check()){
            $data = ['cId'=>$cId];
            $this->setHeader();
            return curl::http_post($url,$data);
        }else{
            $this->setHeader();
            return ['res'=>-3];
        }
    }

    public function check()
    {
        $account = $_COOKIE['PHPSESSID'];
        $value = Session::get($account);
        $info  = explode("+",$value);
        $adminId= $info[0];
        $adminPassword= $info[1];
        if(Db::table("admin")->where("admin_name",$adminId)->where("admin_password",$adminPassword)->find()!=NULL){
            return true;
        }else{
            return false;
        }
    }
    public function saveBook()
    {
        // 储存书籍信息(录入书籍扫一扫)
        if(!$this->check()){
            return ['res'=>'-3'];//-3身份验证出错
        }
        $bName  = Request::instance()->post("bName");
        $sId    = Request::instance()->post("sId");
        $cId    = Request::instance()->post("cId");
        $imgUrl = Request::instance()->post("imgurl");
        $isbn   = Request::instance()->post("isbn");
        $author = Request::instance()->post("author");
        $count  = Request::instance()->post("count");

        $url = "https://corefuture.cn/lib_api/book/saveBook.action";
        $data= [
                'bName'  =>$bName,
                'sId'    =>$sId,
                'cId'    =>$cId,
                'imgurl' =>$imgUrl,
                'isbn'   =>$isbn,
                'author' =>$author,
                'count'  =>$count
            ];
        $this->setHeader();
        return curl::http_post($url,$data);
    }
    public function infoBook()
    {
        if(!$this->check()){
            return ['res'=>'-3'];//-3身份验证出错
        }
        $url  = "https://corefuture.cn/lib_api/book/finishBook.action";
        $isbn = Request::instance()->post("isbn");
        $data = ['isbn'=>$isbn];
        $this->setHeader();
        return curl::http_post($url,$data);
    }
    public function checkLend()
    {
        $check = Request::instance()->post("check");
        $redis = new Redis();
        $lr_id = $redis->get($check);
        $rst   = Db::table("lend_item")->where("lr_id",$lr_id)->select();
        $rstCount = count($rst);
        $arr = array();
        for($i =0; $i<$rstCount;$i++){
            $biId = $rstCount[$i]['bi_id'];
            $bId = Db::table("book_item")->where("bi_id",$biId)->value("b_id");
            $mid = action("Book/getBookInfo",$bId);
            $arr[$i] = $mid;
        }
        $this->setHeader();
        return $arr;
    }
    public function authBorrow()
    {
        // 授权借书(扫一扫)
        $check = Request::instance()->post("check");
        $redis = new Redis();
        $lr_id  = $redis->get($check);
        $sql = "update lend_record set status = 1 where lr_id = $lr_id";
        if(Db::execute($sql)){
            $uId = Db::table("lend_record")->where("lr_id",$lr_id)->value("uId");
            Db::table("lend_record")->where("status",0)->where("uId",$uId)->delete();
            $this->updateBook($lr_id,1);
            $data = ['res'=>1];
        }else{
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }

    public function updateBook($lr_id,$status)
    {
        $rst = Db::table("lend_item")->where("lr_id",$lr_id)->select();
        $count = count($rst);
        for($i=0;$i<$count;$i++){
            $bi_id = $rst[$i]['bi_id'];
            $sql = "update book_item set borrow = b'$status' where bi_id = $bi_id";
            Db::execute($sql);
        }
    }
    public function authReturn()
    {
        //授权还书(扫一扫)
        $check = Request::instance()->post("check");
        $redis = new Redis();
        $lr_id  = $redis->get($check);
        $sql = "update lend_record set status = 2 where lr_id = $lr_id";
        if(Db::execute($sql)){
            $data = ['res'=>1];
            $uId  = Db::table("lend_record")->where("lr_id",$lr_id)->value('uId');
            Db::table("book_cart")->where("u_id",$uId)->delete();
            $this->updateBook($lr_id,0);
        }else{
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }
    public function checkStatus()
    {
        $uId = action("User/getUid");
        $lr_id = Db::table("lend_record")->where("status",1)->where("uId",$uId)->value("lr_id");
        $redis = new Redis();
        if($lr_id != NULL){
            $check = $redis->get($lr_id);
            $data  = [
                'check'=>$check,
                'status'=>1
            ];
        }else{
            $data = [
                'check'=>'',
                'status'=>0
            ];
        }
        $this->setHeader();
        return $data;
    }
    public function setHeader()
    {
        header('Access-Control-Allow-Origin:*');
        header('Access-Control-Allow-Headers:X-Requested-With');
    }

}
