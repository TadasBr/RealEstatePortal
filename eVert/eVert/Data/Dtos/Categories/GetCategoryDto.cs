namespace eVert.Data.Dtos.Categories
{
    public class GetCategoryDto
    {
        public string Name { get; set; }
        public int Id { get; set; }

        public GetCategoryDto(string name, int id)
        {
            Name = name;
            Id = id;
        }
    }
}
