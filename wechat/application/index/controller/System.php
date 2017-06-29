<?php
/**
 * Created by PhpStorm.
 * User: puppy
 * Date: 17-6-7
 * Time: 上午8:44
 */
namespace app\index\controller;

use think\Controller;
use think\Db;
use think\Request;
use think\Session;

class System extends Controller
{
    public function insertRecord()
    {
        $keyword = Request::instance()->post("keyword");
        $way     = Request::instance()->post("way");
        $uId = action('User/getUid');
        $rst = Db::table("find_record")->where("u_id",$uId)->where("value",$keyword)->value("f_id");
        if($rst!=null){
            $this->setHeader();
            $data = ['res'=>-1];
            return $data;
        }
        $sql  = "insert into find_record(u_id,value,way) values ('$uId','$keyword',$way)";
        if ( Db::execute($sql) ) {
            $data = ['res'=>1];
        }else {
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }

    public function getRecord()
    {
        $uId = action('User/getUid');
        $sql    = "select * from find_record where u_id = $uId";
        $this->setHeader();
        return Db::query($sql);
    }

    public function flushRecord()
    {
        $sql = "delete from find_record";
        if ( Db::execute($sql) ) {
            $data = ['res'=>1];
        }else {
            $data = ['res'=>0];
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