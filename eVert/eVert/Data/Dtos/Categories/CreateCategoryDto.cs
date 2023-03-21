namespace eVert.Data.Dtos.Categories
{
    public class CreateCategoryDto
    {
        public string Name { get; set; }

        public CreateCategoryDto(string name)
        {
            Name = name;
        }
    }
}
