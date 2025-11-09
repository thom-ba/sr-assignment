package responses

type VenueResponse struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	City     string `json:"city"`
	Capacity uint   `json:"capacity"`
}
