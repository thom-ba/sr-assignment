package requests

type CreateCategoryRequest struct {
	Name string `validate:"required,max=50" json:"name"`
}

type UpdateCategoryRequest struct {
	ID   uint   `validate:"required" json:"id"`
	Name string `validate:"required,max=50" json:"name"`
}

type GetCategoryRequest struct {
	ID uint `validate:"required" json:"id"`
}
