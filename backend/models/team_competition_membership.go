package models

type TeamcompetitionMembership struct {
	CompetitionID uint `gorm:"not null;index:idx_competition_team;column:competition_id_foreignkey"`
	Competition   Competition
	TeamID        uint `gorm:"not null;index:idx_competition_team;column:team_id_foreignkey"`
	Team          Team
}
