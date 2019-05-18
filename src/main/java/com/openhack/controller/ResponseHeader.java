package com.openhack.controller;

import org.springframework.http.HttpHeaders;

public class ResponseHeader {

    public HttpHeaders getHeader(){
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "http://localhost:3000");
        responseHeaders.set("Access-Control-Allow-Credentials", "true");
        responseHeaders.set(
                "Access-Control-Allow-Methods",
                "GET,HEAD,OPTIONS,POST,PUT,DELETE"
        );
        responseHeaders.set(
                "Access-Control-Allow-Headers",
                "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        );
        responseHeaders.set("Cache-Control", "no-cache");

        return responseHeaders;
    }
}
