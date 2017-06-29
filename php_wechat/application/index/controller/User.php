<?php
/**
 * Created by PhpStorm.
 * User: puppy
 * Date: 17-6-6
 * Time: 上午8:48
 */
namespace app\index\controller;
use my\curl;
use my\Message;
use my\moduleMessage;
use my\Redis;
use think\Controller;
use think\Request;
use think\Session;
use think\Db;

class User extends Controller
{
    //注册
    public function insert()
    {
        $openId   = $this->getOpenId();
        $redis    = new Redis();
        $checkCode= $redis->get($openId);
        $tel      = Request::instance()->post("tel");
        $identity = Request::instance()->post("identity");
        $check    = Request::instance()->post("checkCode");
        $rst      = Db::table("user")->where("identity",$identity)->find();
        if($rst==NULL){
            return ['res'=>-3];
        }
        if( $check != $checkCode) {
            return ['res'=>-1];//验证码错误
        }
        if ( Request::instance()->post('password') == Request::instance()->post('password1')){
            $password = Request::instance()->post("password");
        } else{
            return ['res'=>-2];
        }
        $sql = "insert into user(tel,open_id,identity,password,canbor) values ('$tel','$openId','$identity','$password',b'0')";
        if( DB::execute($sql) ) {
            $data = ['res'=>1];
        }else {
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }
    //发送验证码
    public function sendCode()
    {
        $openId   = $this->getOpenId();
        $nickname = Request::instance()->post("nickname");
        $telNum   = Request::instance()->post("tel");
        $redis    = new Redis();
        $CheckCode= rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9);
        $redis->set($openId, $CheckCode);
        $this->setHeader();
        $rst = Message::sendMessage($nickname, $telNum, $CheckCode);
        return $rst;
    }

    //更新注册信息
    public function update()
    {
        $uId = $this->getUid();
        //1根据canbor查询状态 如果已经能借阅则不再更新identity 只更新电话和密码
        $password    = Request::instance()->post('password');
        $oldPassword = Db::table("user")->where("u_id",$uId)->value("password");
        if($oldPassword != $password){
            $this->setHeader();
            return ['res'=>-1];
        }
        $newPassword = Request::instance()->post('newPassword');
        $identity    = Request::instance()->post('identity');
        $canbor      = Db::table("user")->where("u_id",$uId)->value("canbor");
        if(ord($canbor) == 48){
            $sql = "update user set canbor = b'1',password = '$newPassword',identity = '$identity' where u_id =$uId";
        }else{
            $sql = "update user set password = '$newPassword' where u_id =$uId";
        }
        if(Db::execute($sql)){
            $data = ['res'=>1];
        }else {
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }
    public function canBorrow()
    {
        $uId = $this->getUid();
        $canbor = Db::table("user")->where("u_id",$uId)->value("canbor");
        if(ord($canbor) == 48){
            $data = ['res'=>1];
        }else{
            $data = ['res'=>0];
        }
        return $data;
    }
    public function getRecommendSwitch()
    {
        $uId = $this->getUid();
        $sql = "select recommend from user where u_id =$uId";
        $this->setHeader();
        return Db::query($sql);
    }
    public function updateRecommendSwitch()
    {
        $uId = $this->getUid();
        $request = Request::instance()->post("request");
        $sql = "update user set recommend=$request where u_id = $uId";
        if(DB::execute($sql)){
            $data = ['res'=>1];
        }else {
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }
    public function getUserInfo()
    {
        $uId = $this->getUid();
        $rst = array();
        $rst1 = Db::table("collection")->where("u_id",$uId)->select();
        $rst1 = count($rst1);
        $rst['collectNum']=$rst1;
        $rst2 = Db::table("pre_book")->where("u_id",$uId)->select();
        $rst2 = count($rst2);
        $rst['scheduleNum']=$rst2;
        //TODO rst3 为借阅本数
       /* $rst3 = Db::table("lend_book")->where("u_id",$uId)->where("status","b")->select();
        $rst3 = count($rst3);*/
        $rst['borrowNum']=0;
        $this->setHeader();
        return $rst;
    }
    //获取openid
    public function getOpenId()
    {
        $arr  = $this->getInfo();
        $keys = array_keys($arr);
        $key  = $keys[0];
        $this->setHeader();
        return $arr[$key]['openid'];
    }
    //获取用户信息
    public function getInfo()
    {
        $id   = session_id();
        $this->setHeader();
        return Session::get($id);
    }
    //获取用户U_id
    public function getUid()
    {
        $openid  = $this->getOpenId();
        $infoArr = Db::table("user")->where('open_id',$openid)->select();
        $this->setHeader();
        return $infoArr[0]['u_id'];
    }
    public function judgeBook()
    {
        $uId  = $this->getUid();
        $bId  = Request::instance()->post("bId");
        $data = array();
        $rst1 = Db::table("collection")->where("u_id",$uId)->where("b_id",$bId)->find();
        if($rst1==NULL){
            $data['isCollect'] = 1;
        }else{
            $data['isCollect'] = 0;
        }
        $rst2 = Db::table("pre_book")->where("u_id",$uId)->where("b_id",$bId)->find();
        if($rst2 ==NULL){
            $data['isSchedule'] = 1;
        }else{
            $data['isSchedule'] = 0;
        }
        $this->setHeader();
        return $data;
    }
    public function addCollect()
    {
        //添加收藏
        $uId = $this->getUid();
        $openId= Db::table("user")->where("u_id",$uId)->value('open_id');
        $token = action("Index/getAccessToken");
        $bId = Request::instance()->post("bId");
        $bookName = $this->getBookName($bId);
        $arr = Db::table("collection")->where("u_id",$uId)->where("b_id",$bId)->find();
        if($arr['b_id']==$bId){
            $data = ['res'=>-1];
            $this->setHeader();
            return $data;
        }
        $sql = "insert into collection(u_id,b_id) values ('$uId','$bId') ";
        if( Db::execute($sql)) {
            $data = ['res'=>1];
            moduleMessage::sendMessageTwo($openId,$token,$bookName);
        }else {
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }
    private function getBookName($bId)
    {
        $url = "https://corefuture.cn/lib_api/book/searchBookExact.action";
        $data = [
            'bId'=>$bId,
            'way'=>3
        ];
        $rst = curl::http_post($url,$data);
        $rst = json_decode($rst,true);
        $rst = $rst['books'];
        $rst = $rst['0']['bName'];
        return $rst;
    }
    public function cancelCollect()
    {
        //取消收藏
        $uId = $this->getUid();
        $bId = Request::instance()->post("bId");
        $rst = Db::table("collection")->where("u_id",$uId)->where("b_id",$bId)->delete();
        if($rst!=0) {
            $data = ['res' => 1];
        }else {
            $data = ['res' => 0];
        }
        $this->setHeader();
        return $data;
    }

    public function selectCollect()
    {
        //查看收藏
        $uId = $this->getUid();
        $sql = "select b_id from collection where u_id = '$uId'";
        $this->setHeader();
        $arr = Db::query($sql);
        $account = count($arr);
        $rst = array();
        for( $i = 0 ; $i<$account; $i++){
            //dump($arr[$i]['b_id']);
            $mid = action("Book/getBookInfo",$arr[$i]['b_id']);
            $rst[$i] = $mid;
        }
        return $rst;
    }

    public function addShopping()
    {
        $uId = $this->getUid();
        $url = "https://corefuture.cn/lib_api/bookCart/addToBookCart.action";
        $coding = Request::instance()->post("coding");
        $data = [
            'uId'=>$uId,
            'coding'=>$coding
        ];
        return curl::http_post($url,$data);
    }
    public function cancelShopping()
    {
        //从购物车中取消书
        //取消收藏
        $uId = $this->getUid();
        $biId = Request::instance()->post("biId");
        if(Request::instance()->has("coding","post")){
            $coding = Request::instance()->post("coding");
            $biId = Db::table("book_item")->where("coding",$coding)->value('bi_id');
        }
        $rst = Db::table("book_cart")->where("u_id",$uId)->where("bi_id",$biId)->delete();
        if($rst!=0) {
            $data = ['res' => 1];
        }else {
            $data = ['res' => 0];
        }
        $this->setHeader();
        return $data;
    }
    public function orderBook()
    {
        $url = "https://corefuture.cn/lib_api/bookCart/orderBook.action";
        $bId = Request::instance()->post("bId");
        $uId = $this->getUid();
        $data = [
            'uId' => $uId,
            'bId' => $bId
        ];
        return curl::http_post($url,$data);
    }
    public function selectShopping()
    {
        $uId = $this->getUid();
        $rst = array();
        $sql = "select * from book_cart where u_id = '$uId'";
        $this->setHeader();
        $arr = Db::query($sql);
        $account = count($arr);
        for( $i = 0 ; $i<$account; $i++){
            $biId = $arr[$i]['bi_id'];
            $time = $arr[$i]['nowdate'];
            $hour = $arr[$i]['hour'];
            $now  = time();
            $time = strtotime($time);
            if($now>$time+3600*$hour){
                $rst = Db::table("book_cart")->where("bi_id",$biId)->delete();
                continue;
            }
            $bId1 = Db::table("book_item")->where("bi_id",$biId)->value("b_id");
            $mid = action("Book/getBookInfo",$bId1);
            $rst[$i][0] = $mid;
            $rst[$i][1] = $arr[$i]['bi_id'];
        }
        return $rst;
    }
    public function borrowHistory()
    {
        //借阅历史
        $rst = Db::table("lend_book")->selcet();
        return $rst;
    }
    public function scheduleBook()
    {
        $bId = Request::instance()->post("bId");
        $uId = $this->getUid();
        $arr = Db::table("pre_book")->where("u_id",$uId)->where("b_id",$bId)->find();
        if($arr['b_id']==$bId){
            $data = ['res'=>-1];
            return $data;
        }
        $sql = "insert into pre_book(u_id,b_id) values ('$uId','$bId')";
        if( Db::execute($sql)) {
            $data = ['res'=>1];
        }else {
            $data = ['res'=>0];
        }
        $this->setHeader();
        return $data;
    }
    public function cancelScheduleBook()
    {
        $uId = $this->getUid();
        $bId = Request::instance()->post("bId");
        $rst = Db::table("pre_book")->where("u_id",$uId)->where("b_id",$bId)->delete();
        if($rst!=0) {
            $data = ['res' => 1];
        }else {
            $data = ['res' => 0];
        }
        $this->setHeader();
        return $data;
    }
    public function selectScheduleBook()
    {
        $uId = $this->getUid();
        $sql = "select b_id from pre_book where u_id = '$uId'";
        $this->setHeader();
        $arr = Db::query($sql);
        $account = count($arr);
        $rst = array();
        for( $i = 0 ; $i<$account; $i++){
            //dump($arr[$i]['b_id']);
            $mid = action("Book/getBookInfo",$arr[$i]['b_id']);
            $rst[$i] = $mid;
        }
        return $rst;
    }

    public function lendBook()
    {
        $uId   = action("User/getUid");
        $biId1 = Request::instance()->post("biId1");
        $biId2 = Request::instance()->post("biId2");
        $time  = date("Y-m-d");
        $data1 = [
            'status'=>0,
            'uId'=>$uId,
            'date'=>$time
        ];
        $lr_id = Db::table("lend_record")->insertGetId($data1);
        if($biId1!=NULL){
            $data = [
                'lr_id' => $lr_id,
                'u_id' => $uId,
                'bi_id' => $biId1,
            ];
            Db::table("lend_item")->insert($data);
        }
        if($biId2!=NULL){
            $data= [
                'lr_id' => $lr_id,
                'u_id' => $uId,
                'bi_id' => $biId2,
            ];
            Db::table("lend_item")->insert($data);
        }
        $check = `head -n 80 /dev/urandom | tr -dc A-Za-z0-9 | head -c 160`;
        $redis = new Redis();
        if($redis->set($check,$lr_id)&&$redis->set($lr_id,$check)){
            $this->setHeader();
            return $check;
        }
        return false;
    }

    public function setHeader()
    {
        header('Access-Control-Allow-Origin:*');
        header('Access-Control-Allow-Headers:X-Requested-With');
    }

}