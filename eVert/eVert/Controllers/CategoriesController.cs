using eVert.Auth.Model;
using eVert.Data.Dtos.Categories;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.BuyAdvertisiments;
using eVert.Data.Repositories.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : ControllerBase
    {
        private ICategoriesRepository _categoriesRepository;
        private IAdvertisementsRepository _advertisementsRepository;
        private IBuyAdvertisementsRepository _buyAdvertisementsRepository;

        public CategoriesController(ICategoriesRepository categoriesRepository, IAdvertisementsRepository advertisementsRepository, IBuyAdvertisementsRepository buyAdvertisementsRepository)
        {
            _categoriesRepository = categoriesRepository;
            _advertisementsRepository = advertisementsRepository;
            _buyAdvertisementsRepository = buyAdvertisementsRepository;
        }

        [HttpGet]
        public async Task<IReadOnlyList<GetCategoryDto>> GetMany()
        {
            var categories = await _categoriesRepository.GetManyAsync();

            return categories.Select(o => new GetCategoryDto(o.Name, o.Id)).ToList();
        }

        [HttpGet]
        [Route("{categoryId}", Name = "GetCategoryById")]
        public async Task<ActionResult<GetCategoryDto>> GetById(int categoryId)
        {
            var category = await _categoriesRepository.GetAsync(categoryId);

            if (category == null)
            {
                return new NotFoundResult();
            }

            return new GetCategoryDto(category.Name, category.Id);
        }

        [HttpPost]
        public async Task<ActionResult<CreateCategoryDto>> Create(CreateCategoryDto createCategoryDto)
        {
            var category = new Category { Name = createCategoryDto.Name };

            await _categoriesRepository.CreateAsync(category);

            return new CreatedResult("", new CreateCategoryDto(category.Name));
        }

        [HttpPut]
        [Authorize(Roles = eVertRoles.Admin)]
        [Route("{categoryId}")]
        public async Task<ActionResult<UpdateCategoryDto>> Update(UpdateCategoryDto updateCategoryDto, int categoryId)
        {
            var category = await _categoriesRepository.GetAsync(categoryId);

            var advertisements = await _advertisementsRepository.GetManyAsync();
            advertisements = advertisements.Where(advertisements => advertisements.CategoryId == categoryId).ToList();

            var buyAdvertisements = await _buyAdvertisementsRepository.GetManyAsync();
            buyAdvertisements = buyAdvertisements.Where(buyAdvertisements => buyAdvertisements.CategoryId == categoryId).ToList();

            if (category == null)
            {
                return new NotFoundResult();
            }

            if (advertisements != null || buyAdvertisements != null)
            {
                if (advertisements.Count() > 0 || buyAdvertisements.Count() > 0)
                {
                    return new BadRequestResult();
                }
            }

            category.Name = updateCategoryDto.Name;
            await _categoriesRepository.UpdateAsync(category);

            return new OkObjectResult(new UpdateCategoryDto(category.Name));
        }

        [HttpDelete]
        [Authorize(Roles = eVertRoles.Admin)]
        [Route("{categoryId}")]
        public async Task<IActionResult> Delete(int categoryId)
        {
            var category = await _categoriesRepository.GetAsync(categoryId);

            var advertisements = await _advertisementsRepository.GetManyAsync();
            advertisements = advertisements.Where(advertisements => advertisements.CategoryId == categoryId).ToList();

            var buyAdvertisements = await _buyAdvertisementsRepository.GetManyAsync();
            buyAdvertisements = buyAdvertisements.Where(buyAdvertisements => buyAdvertisements.CategoryId == categoryId).ToList();

            if (category == null)
            {
                return new NotFoundResult();
            }

            if(advertisements != null || buyAdvertisements != null)
            {
                if(advertisements.Count() > 0 || buyAdvertisements.Count() > 0)
                {
                    return new BadRequestResult();
                }
            }

            await _categoriesRepository.DeleteAsync(category);

            return new NoContentResult();
        }
    }
}
