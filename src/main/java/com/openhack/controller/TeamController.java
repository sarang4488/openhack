package com.openhack.controller;

import com.openhack.services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamController {

    @Autowired
    private TeamService teamService;

    private ResponseHeader responseHeader = new ResponseHeader();

    @RequestMapping(value = "/team/{hackname}", method = {RequestMethod.GET})
    public ResponseEntity<?> getTeamList(@PathVariable String hackname){
        ResponseEntity responseEntity = teamService.getTeams(hackname);

        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/teamreport/{hackname}", method = {RequestMethod.GET})
    public ResponseEntity<?> getFinalTeamList(@PathVariable String hackname){
        ResponseEntity responseEntity = teamService.getFinalTeams(hackname);
        return new ResponseEntity<>(responseEntity, responseHeader.getHeader(), HttpStatus.CREATED);
    }

}
