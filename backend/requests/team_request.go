package requests

type CreateTeamRequest struct {
	Name        string `validate:"required,max=50" json:"name"`
	CountryCode string `validate:"required,max=50" json:"country_code"`
}

type UpdateTeamRequest struct {
	ID   uint   `validate:"required" json:"id"`
	Name string `validate:"required" json:"name"`
}
