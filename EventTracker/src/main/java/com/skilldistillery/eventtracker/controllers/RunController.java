package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Run;
import com.skilldistillery.eventtracker.services.RunService;

@RestController
@RequestMapping("api")
public class RunController {

	@Autowired
	private RunService svc;
	
	@GetMapping("runs")
	public List<Run> allRuns() {
		return svc.allRuns();
	}
	
	@GetMapping("runs/{rid}")
	public Run getRun(
			@PathVariable Integer rid,
			HttpServletResponse resp
			)
	{
		Run run = svc.getRun(rid);
		if(run == null) {
			resp.setStatus(404);
		}
		
		return run;
	}
	
	@PostMapping("runs")
	public Run addRun(@RequestBody Run run, HttpServletResponse resp, HttpServletRequest req) {
		try {
			svc.addRun(run);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(run.getId());
			resp.addHeader("Location", url.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resp.setStatus(400);
			e.printStackTrace();
		}
		return run;
	}
	
	@PutMapping("runs/{rid}")
	public Run updateRun(@PathVariable Integer rid, @RequestBody Run run, HttpServletResponse resp) {
		try {
			run = svc.update(rid,  run);
			
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(401);
		}
			
		return run;
	}
	
	@DeleteMapping("run/{rid}")
	public void deleteFilm(
			@PathVariable Integer rid,
			HttpServletResponse resp)
			 {
		try {
			if (svc.deleteRun(rid)) {
				resp.setStatus(204);
			}
			else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			resp.setStatus(400);
		}
	}
}
