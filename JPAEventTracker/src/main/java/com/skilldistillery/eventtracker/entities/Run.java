package com.skilldistillery.eventtracker.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Run {
	
// F i e l d s
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		
		private Double distance;
		
		private Double duration;
		
		private LocalDate date;

// C o n s t r u c t o r s
		
		public Run() {
			super();
		}
		
		public Run(Double distance, Double duration, LocalDate date) {
			super();
			this.distance = distance;
			this.duration = duration;
			this.date = date;
		}

// M e t h o d s

		public int getId() {
			return id;
		}

		public Double getDistance() {
			return distance;
		}

		public void setDistance(Double distance) {
			this.distance = distance;
		}

		public Double getDuration() {
			return duration;
		}

		public void setDuration(Double duration) {
			this.duration = duration;
		}

		public LocalDate getDate() {
			return date;
		}

		public void setDate(LocalDate date) {
			this.date = date;
		}

		@Override
		public String toString() {
			return "Run [id=" + id + ", distance=" + distance + ", duration=" + duration + ", date=" + date + "]";
		}
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + id;
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Run other = (Run) obj;
			if (id != other.id)
				return false;
			return true;
		}
}