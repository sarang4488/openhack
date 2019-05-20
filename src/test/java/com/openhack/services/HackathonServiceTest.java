package com.openhack.services;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class HackathonServiceTest {

	@Test
	void test() {
		HackathonService obj=new HackathonService();
		ResponseEntity responseEntity=obj.createHackathon("Hack1", "2019-05-23", "2019-05-29", "", "This is hackathon 1", "Jasnoor", "Bob", 1, 4, (float) 100.00, 0, "open",null);
		String s="Please fill up all the fields marked *";
		
	}

}
