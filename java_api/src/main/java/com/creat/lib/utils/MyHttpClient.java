package com.creat.lib.utils;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.sf.json.JSONObject;

import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;

public class MyHttpClient implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	private CloseableHttpClient closeableHttpClient;
	
	public MyHttpClient(){
		//创建Client对象
		closeableHttpClient = HttpClients.createDefault();
	}
	
	public CloseableHttpResponse sendGet(String url) throws ClientProtocolException, IOException{
		//创建GET请求对象
		HttpGet httpGet = new HttpGet(url);
		//执行请求操作，并拿到结果（同步阻塞）
		CloseableHttpResponse response = closeableHttpClient.execute(httpGet);
		//返回response
		return response;
	}
	
	public CloseableHttpResponse sendPost(String url, Map<String,Object> map,
			String charset,boolean isJson) throws ClientProtocolException, IOException{
		//创建post请求对象
		HttpPost httpPost = new HttpPost(url);
		//装填参数
		if(isJson == true){
			if(map != null){
				JSONObject jsonObject = JSONObject.fromObject(map);
				httpPost.setHeader("Content-type", "application/json; charset=utf-8");
				httpPost.setEntity(new StringEntity(jsonObject.toString(), charset));
			}
		}else{
			List<NameValuePair> parameters = new ArrayList<NameValuePair>();
			if(map != null){
				for(Entry<String, Object> entry : map.entrySet()){
					parameters.add(new BasicNameValuePair(entry.getKey(), String.valueOf(entry.getValue())));
				}
			}
			httpPost.setHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
			httpPost.setEntity(new UrlEncodedFormEntity(parameters, charset));
		}
		//执行请求操作，并拿到结果（同步阻塞）
		CloseableHttpResponse response =closeableHttpClient.execute(httpPost);
		//返回response
		return response;
	}
}
