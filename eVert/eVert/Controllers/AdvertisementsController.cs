using eVert.Auth.Model;
using eVert.Data.Dtos.Advertisements;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Data;
using System.Security.Claims;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/advertisements")]
    public class AdvertisementsController : ControllerBase
    {
        private IAdvertisementsRepository _advertisementsRepository;
        private IAuthorizationService _authorizationService;

        public AdvertisementsController(IAdvertisementsRepository advertisementsRepository, IAuthorizationService authorizationService)
        {
            _advertisementsRepository = advertisementsRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IReadOnlyList<GetAdvertisementDto>> GetMany()
        {
            var advertisements = await _advertisementsRepository.GetManyAsync();

            return advertisements.Select(o => new GetAdvertisementDto(o.Id, o.Description, o.Title, o.City, o.Address, o.District, o.Price, o.CreatedDate, o.UpdatedDate)).ToList();
        }

        [HttpGet]
        [Route("{advertisementId}")]
        public async Task<ActionResult<GetAdvertisementDto>> GetById(int advertisementId)
        {
            var advertisement = await _advertisementsRepository.GetAsync(advertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            return new GetAdvertisementDto(advertisement.Id, advertisement.Title, advertisement.Description, advertisement.City, advertisement.Address,
                advertisement.District, advertisement.Price, advertisement.CreatedDate, advertisement.UpdatedDate);
        }

        [HttpPost]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<ActionResult<CreateAdvertisementDto>> Create(CreateAdvertisementDto createAdvertisementDto)
        {
            var advertisement = new Advertisement
            {
                Title = createAdvertisementDto.Title,
                Description = createAdvertisementDto.Description,
                City = createAdvertisementDto.City,
                Address = createAdvertisementDto.Address,
                District = createAdvertisementDto.District,
                Price = createAdvertisementDto.Price,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                CategoryId = createAdvertisementDto.CategoryId,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _advertisementsRepository.CreateAsync(advertisement);

            return new CreatedResult("", new CreateAdvertisementDto(advertisement.Title, advertisement.Description, advertisement.City, advertisement.Address,
                advertisement.District, advertisement.Price, advertisement.CategoryId));
        }

        [HttpPut]
        [Route("{advertisementId}")]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<ActionResult<UpdateAdvertisementDto>> Update(UpdateAdvertisementDto updateAdvertisementDto, int advertisementId)
        {
            var advertisement = await _advertisementsRepository.GetAsync(advertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            var authorizationResult =  await _authorizationService.AuthorizeAsync(User, advertisement, PolicyNames.ResourceOwner);
            if(!authorizationResult.Succeeded)
            {
                return new ForbidResult();
            }

            advertisement.Title = updateAdvertisementDto.Title;
            advertisement.Description= updateAdvertisementDto.Description;
            advertisement.City= updateAdvertisementDto.City;
            advertisement.Address= updateAdvertisementDto.Address;
            advertisement.District= updateAdvertisementDto.District;
            advertisement.Price= updateAdvertisementDto.Price;
            await _advertisementsRepository.UpdateAsync(advertisement);

            return new OkObjectResult(new UpdateAdvertisementDto(advertisement.Title, advertisement.Description, advertisement.City, advertisement.Address,
                advertisement.District, advertisement.Price));
        }

        [HttpDelete]
        [Route("{advertisementId}")]
        public async Task<IActionResult> Delete(int advertisementId)
        {
            var advertisement = await _advertisementsRepository.GetAsync(advertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            await _advertisementsRepository.DeleteAsync(advertisement);

            return new NoContentResult();
        }
    }
}
