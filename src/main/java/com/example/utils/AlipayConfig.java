package com.example.utils;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101700707037";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTUHpFL1h3YBSwSS1aIa9IUZT8i9FdVnZPtowH2xFJZC74zjlNqURvHeqjsDXTdKlRvU42hetwpwps3i2/e4edrcEDmn6YnSqaQ0COy31lCEVRqyY44cQ+WHsLpElZEPJVsvfRBJVcbmih8rznSeBCcPKFMsEXLCAnPW4DdagSxE6ryMt9QAWYwwQkp3HsmbXF899Xu6YFU2wwBaFxbgeS55AhsfYxmKQ+bcL6sanM/SnfLy0MEDJI/wTkUS2/nKoBAYUHv7UEQoi+kMWBc7saoxRuohMQ3d7VZ4fRZbAibp/e0qdEgtuHOuS9g+CHgQ3scyLdBYnheJdfzuvRk+GrAgMBAAECggEAMdyDfV+2mDRrrU0XDnV0TrQxW4YCWOvV7uk8EX53jcG986d1jgWqyC1e+FDT4plcepUYp3TiISrJIvcqBEy5q1McgCUsSgaLzuqfiRIq/HP/J04jLrjW/X8TSaPySrnc9KvOHdvfAnhq6AvG1yxvZj4Qe62GMlmPHLM6Ckbw6bxKrs2lcfQ72k6f8MYUxbpckLqhDZmV2t7/IB6bZUygFb4m5Lx/sj0F3DT8qASQhs3IZcvioNDgS3a4FJp2BTTztfRH1J3bNYW/m5mXaLO9eX54oveANhIETJjtIo79scRTwRVNqi5Jbto9JEzlbByiQn0X8DIP6BX9SzTe32R9AQKBgQDrNm0UfewrrSkpXFld9jbwTKYSJesNUp5r/dqxB7rnd4zYVNVEqWZ0IsscFK95bNspAoaSFgkr5OWLklEXhSkWwRLUgK72Jpy4Ap2X77YjNtMaWfHXMB1vA/ZluQ/d+HOoDjExHaZQxXj2/0DRn4eHE+x87/6qFchTJPrcYA6yUQKBgQDl/V1/pT4q/uVOaNnW2JoXiIwmUhXvopoVRJ0seXWV763xoJJ0oc+FYHSMucEnUGaeZvvmoxBo2h3rB0OWCQDesMS+ayjaF4G1Kj/xAf6mXwurp47wj8vJgCv4+2VP1XPKkIONNE36+mEvDwO5mauuU5H/XZCbSlUxiVPTxsD5OwKBgH1viwBwnvAz6k2aaDZJxcakubPX8OAr/TxOJsBeBPjHsp7zrsBtLqwkmfiht2qj+MSICkgB5GY6LYgfQYuvgdgWovocnjG7Kbyf+Hc8aP+ijzXwXZ6KlEfN7ysUZDfV9afb2bP9weI1TWs7eM/Rqa8JmwaN3lvKPgjJIddAitXhAoGBALuwP9xKkuhtqd6KTLQ7gc0QvycKuCIe9VXD7+x6lo4s0iwtGTgbUQqMw7CQauPVhllgu9PlYR/gWKgT/oDzigUyBu1K8ETDCDQ7bYEWWqWVTSXhkRIal3kyozAGoRA8psk5lFHozHa0XBkWTLjrgqK6Spw21CsWx12sr39VZOg/AoGAWHvkf5q0LBkKE6kp4im0TRVHyalGa6+s4WrEPmY+3nDfxIc89MzHZ1Q2dV1aC/EQNN+8wS0DYGGTzOrAVbzqPOKrcgIdPMZlQWLVsZxnwa8IhfRoqXeY0w/0FEd0qCeoMtywsz+COn37xDReB+xQUEG7iLiEzS/2bqxpylFhHlQ=";
	
	// 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA01B6RS9Yd2AUsEktWiGvSFGU/IvRXVZ2T7aMB9sRSWQu+M45TalEbx3qo7A103SpUb1ONoXrcKcKbN4tv3uHna3BA5p+mJ0qmkNAjst9ZQhFUasmOOHEPlh7C6RJWRDyVbL30QSVXG5oofK850ngQnDyhTLBFywgJz1uA3WoEsROq8jLfUAFmMMEJKdx7Jm1xfPfV7umBVNsMAWhcW4HkueQIbH2MZikPm3C+rGpzP0p3y8tDBAySP8E5FEtv5yqAQGFB7+1BEKIvpDFgXO7GqMUbqITEN3e1WeH0WWwIm6f3tKnRILbhzrkvYPgh4EN7HMi3QWJ4XiXX87r0ZPhqwIDAQAB";

	// 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://localhost:8080/one_war_exploded/orders/paidDo.lh";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

