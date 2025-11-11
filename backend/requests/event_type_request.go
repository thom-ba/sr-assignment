package requests

type CreateEventTypeRequest struct {
	Name string `validate:"required,max=50" json:"name"`
}

type UpdateEventTypeRequest struct {
	ID   uint   `validate:"required" json:"id"`
	Name string `validate:"required" json:"name"`
}
