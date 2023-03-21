using eVert.Data.Dtos.Categories;
using eVert.Data.Entities;
using eVert.Data.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController
    {
        private ICategoriesRepository _categoriesRepository;

        public CategoriesController(ICategoriesRepository categoriesRepository)
        {
            _categoriesRepository = categoriesRepository;
        }

        [HttpGet]
        public async Task<IReadOnlyList<GetCategoryDto>> GetMany()
        {
            var categories = await _categoriesRepository.GetManyAsync();

            return categories.Select(o => new GetCategoryDto(o.Name)).ToList();
        }

        [HttpGet]
        [Route("{categoryId}", Name = "GetCategoryById")]
        public async Task<ActionResult<GetCategoryDto>> GetById(int categoryId)
        {
            var category = await _categoriesRepository.GetAsync(categoryId);

            if(category == null)
            {
                return new NotFoundResult();
            }

            return new GetCategoryDto(category.Name);
        }

        [HttpPost]
        public async Task<ActionResult<CreateCategoryDto>> Create(CreateCategoryDto createCategoryDto)
        {
            var category = new Category { Name = createCategoryDto.Name };

            await _categoriesRepository.CreateAsync(category);

            return new CreatedResult("", new CreateCategoryDto(category.Name));
        }

        [HttpPut]
        [Route("{categoryId}")]
        public async Task<ActionResult<UpdateCategoryDto>> Update(UpdateCategoryDto updateCategoryDto, int categoryId)
        {
            var category = await _categoriesRepository.GetAsync(categoryId);

            if (category == null)
            {
                return new NotFoundResult();
            }

            category.Name = updateCategoryDto.Name;
            await _categoriesRepository.UpdateAsync(category);

            return new OkObjectResult(new UpdateCategoryDto(category.Name));
        }

        [HttpDelete]
        [Route("{categoryId}")]
        public async Task<IActionResult> Delete(int categoryId)
        {
            var category = await _categoriesRepository.GetAsync(categoryId);

            if (category == null)
            {
                return new NotFoundResult();
            }

            await _categoriesRepository.DeleteAsync(category);

            return new NoContentResult();
        }
    }
}
