namespace eVert.Data.Dtos.Categories
{
    public class GetCategoryDto
    {
        public string Name { get; set; }

        public GetCategoryDto(string name)
        {
            Name = name;
        }
    }
}
