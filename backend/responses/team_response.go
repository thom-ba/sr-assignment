package responses

type TeamResponse struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	CountryCode string `json:"country_code"`
}
