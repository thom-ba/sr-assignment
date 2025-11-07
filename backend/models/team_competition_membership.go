package models

type TeamcompetitionMembership struct {
	CompetitionID uint `gorm:"not null;index:idx_competition_team"`
	Competition   Competition
	TeamID        uint `gorm:"not null;index:idx_competition_team"`
	Team          Team
}
