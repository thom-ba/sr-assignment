package responses

type CompetitionResponse struct {
	ID         uint   `json:"id"`
	SportID    uint   `json:"sport_id"`
	CategoryID uint   `json:"category_id"`
	Name       string `json:"competiton_name"`
	Year       uint   `json:"year"`
}
