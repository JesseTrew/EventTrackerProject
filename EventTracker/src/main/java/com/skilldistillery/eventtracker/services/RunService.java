package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Run;

public interface RunService {

	List<Run> allRuns();

	Run getRun(int id);

	Run addRun(Run run);

	Run update(int id, Run run);

	boolean deleteRun(int id);
	
}
