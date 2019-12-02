package com.skilldistillery.eventtracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Run;
import com.skilldistillery.eventtracker.repositories.RunRepository;

@Service
public class RunServiceImpl implements RunService{

	@Autowired
	RunRepository rRepo;
	
	@Override
	public List<Run> allRuns() {
		return rRepo.findAll();
	}
	
	@Override
	public Run getRun(int id) {
		Run run = null;
		Optional<Run> opt = rRepo.findById(id);
		if (opt.isPresent()) {
			run = opt.get();
		}
		return run;
	}
	
	@Override
	public Run addRun(Run run) {
		rRepo.saveAndFlush(run);
		return run;
	}
	
	@Override
	public Run update(int id, Run run) {
		Run existing = null;
		Optional<Run> opt = rRepo.findById(id);
		if(opt.isPresent()) {
			existing = opt.get();
			existing.setDate(run.getDate());
			existing.setDuration(run.getDuration());
			existing.setDistance(run.getDistance());

			rRepo.saveAndFlush(existing);
		}
		return existing;
	}
	
	@Override
	public boolean deleteRun(int id) {
		boolean deleted = false;
		if (rRepo.existsById(id)) {
			rRepo.deleteById(id);;
			deleted = true;
		}
		
		return deleted;
	}
}