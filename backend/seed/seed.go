package seed

import (
	"fmt"

	"gorm.io/gorm"
)

func Run(db *gorm.DB) error {
	statements := []string{
		`TRUNCATE TABLE events, competitions, event_types, sports, teams, venues, categories RESTART IDENTITY CASCADE;`,

		`INSERT INTO categories (name) VALUES
			('Professional League'),
			('International Tournament'),
			('Friendly Matches'),
			('Youth League'),
			('Women Championship');`,

		`INSERT INTO sports (name) VALUES
			('Football'),
			('Basketball'),
			('Tennis'),
			('Cricket'),
			('Hockey');`,

		`INSERT INTO event_types (name) VALUES
			('Regular Season'),
			('Playoff'),
			('Final'),
			('Semi Final'),
			('Quarter Final');`,

		`INSERT INTO teams (name, country_code) VALUES
			('Lions FC', 'ENG'),
			('Tigers FC', 'ESP'),
			('Wolves United', 'GER'),
			('Eagles Club', 'FRA'),
			('Panthers', 'ITA');`,

		`INSERT INTO venues (name, city, capacity) VALUES
			('Stadium Alpha', 'London', 60000),
			('Arena Bravo', 'Madrid', 55000),
			('Court Charlie', 'Berlin', 30000),
			('Field Delta', 'Paris', 45000),
			('Ground Echo', 'Rome', 40000);`,

		`INSERT INTO competitions (sport_id, category_id, name, year) VALUES
			(1, 1, 'Premier Cup', 2024),
			(2, 1, 'Euro Basket League', 2024),
			(3, 2, 'World Tennis Masters', 2024),
			(4, 2, 'Cricket World Challenge', 2024),
			(5, 1, 'Ice Hockey Championship', 2024);`,

		`INSERT INTO events (competition_id, event_type_id, home_team_id, away_team_id, venue_id, event_date_time, name, description) VALUES
			(1, 1, 1, 2, 1, '2024-05-21 18:00:00+00', 'Lions vs Tigers', 'Opening match of Premier Cup'),
			(1, 2, 3, 4, 2, '2024-06-01 20:00:00+00', 'Wolves vs Eagles', 'Playoff round match'),
			(2, 1, 2, 5, 2, '2024-06-10 19:00:00+00', 'Tigers vs Panthers', 'Group stage game'),
			(3, 3, 3, 1, 3, '2024-07-15 16:00:00+00', 'Wolves vs Lions', 'Final of Tennis Masters'),
			(4, 1, 4, 5, 4, '2024-08-05 17:30:00+00', 'Eagles vs Panthers', 'Cricket opener');`,
	}

	for _, stmt := range statements {
		if err := db.Exec(stmt).Error; err != nil {
			return fmt.Errorf("error executing statement: %w", err)
		}
	}

	fmt.Println("🌱 Database seeded successfully.")
	return nil
}
