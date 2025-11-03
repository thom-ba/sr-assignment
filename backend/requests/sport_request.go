package requests

type CreateSportRequest struct {
	Name string `validate:"required,max=50" json:"name"`
}

type UpdateSportRequest struct {
	ID   uint   `validate:"required" json:"id"`
	Name string `validate:"required" json:"name"`
}
