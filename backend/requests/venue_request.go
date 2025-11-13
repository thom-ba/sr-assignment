package requests

type CreateVenueRequest struct {
	Name     string `validate:"required,max=50" json:"name"`
	City     string `validate:"required,max=50" json:"City"`
	Capacity uint   `json:"capacity"`
}
