namespace eVert.Data.Dtos.Categories
{
    public class UpdateCategoryDto
    {
        public string Name { get; set; }

        public UpdateCategoryDto(string name)
        {
            Name = name;
        }
    }
}
