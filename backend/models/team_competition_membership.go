package models

type TeamcompetitionMembership struct {
	CompetitionId uint `gorm:"not null;index:idx_competition_team"`
	TeamId        uint `gorm:"not null;index:idx_competition_team"`
}
