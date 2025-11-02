package requests

type CreateCategoryRequest struct {
	Name string `validate:"required,max=50" json:"name"`
}
