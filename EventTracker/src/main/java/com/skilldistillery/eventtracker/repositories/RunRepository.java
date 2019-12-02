package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Run;

public interface RunRepository extends JpaRepository<Run, Integer>{

}
