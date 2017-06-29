<?php
namespace app\index\controller;

use my\Check;
use my\curl;
use my\moduleMessage;
use my\Redis;
use think\Controller;
use think\Db;
use think\Request;
use think\Session;

class Index extends Controller
{
    private $appid    = "wx1a474de918181499";
    private $appsecret = "d506d6d9bc4cef2661c5c70464b9139d";
    public function index()
    {
        if(Request::instance()->has('code','GET')) {
            $code  = Request::instance()->get('code');
        }else{
            return ['res'=>0];
        }
        //获取access_token(网页授权专用)
        $token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid={$this->appid}&secret={$this->appsecret}&code={$code}&grant_type=authorization_code ";
        $token_arr = curl::http_get($token_url);
        $mid       = json_decode($token_arr,true);
        $openid    = $mid['openid'];
        $token     = $mid['access_token'];
        $info_url  = "https://api.weixin.qq.com/sns/userinfo?access_token={$token}&openid={$openid}&lang=zh_CN ";
        $info      = json_decode(curl::http_get($info_url),true);
        $rst       = Db::table("user")->where("open_id",$openid)->select();

        session_id(md5($openid));
        Session::set(md5($openid),$info);

        if($rst != null){
            //跳转正常登录界面
            $this->redirect("https://wwwxinle.cn/borrow-book/app/user/books_navigation.html","已登录界面");
        } else {
            $this->redirect("https://wwwxinle.cn/borrow-book/app/user/first_register.html","注册界面");
        }
    }
    public function auth()
    {
        //最后只需修改url即可
        $url      = urlencode("https://wwwxinle.cn/Book/public/index.php/index/index");
        $url_last = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={$this->appid}&redirect_uri={$url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        $this->redirect($url_last);
    }
    public function ticket()
    {
        /*$redis = new Redis();
        $access_token = $redis->get("access_token");*/
        /*if ($access_token == NULL) {
            $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$this->appid}&secret={$this->appsecret}";
            $this->setHeader();
            $mid = curl::http_get($url);
            $rst = json_decode($mid, true);
            $access_token = $rst['access_token'];
            //缓存access_token
            $redis->set("access_token", $access_token, 7200);
        }*/
        $access_token= $this->getAccessToken();
        $last_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={$access_token}&type=jsapi";
        $this->setHeader();
        echo curl::http_get($last_url);
    }
    public function setHeader()
    {
        header('Access-Control-Allow-Origin:*');
        header('Access-Control-Allow-Headers:X-Requested-With');
    }
    public function checkToken()
    {
        $token = new Check();
        $token->valid();
    }
    public function getAccessToken()
    {
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$this->appid}&secret={$this->appsecret}";
        $mid =  curl::http_get($url);
        $rst = json_decode($mid, true);
        $access_token = $rst['access_token'];
        return $access_token;
    }
    public function test()
    {
        $accesstoken = $this->getAccessToken();
        return moduleMessage::sendMessageOne("o6i1Zw6rKSsjdGO9f_L5oPL1TZdg",$accesstoken);
    }
}
