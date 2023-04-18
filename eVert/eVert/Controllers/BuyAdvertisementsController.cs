using eVert.Auth.Model;
using eVert.Data.Dtos.BuyAdvertisiments;
using eVert.Data.Entities;
using eVert.Data.Repositories.BuyAdvertisiments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/buy-advertisements")]
    public class BuyAdvertisementsController : ControllerBase
    {
        private IBuyAdvertisementsRepository _buyAdvertisementsRepository;
        private IAuthorizationService _authorizationService;

        public BuyAdvertisementsController(IBuyAdvertisementsRepository buyAdvertisementsRepository, IAuthorizationService authorizationService)
        {
            _buyAdvertisementsRepository = buyAdvertisementsRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IReadOnlyList<GetBuyAdvertisementDto>> GetMany()
        {
            var advertisements = await _buyAdvertisementsRepository.GetManyAsync();

            return advertisements.Select(o => new GetBuyAdvertisementDto(o.Id, o.Title, o.Description, o.City, o.District, o.MinPrice, o.MaxPrice, o.MinArea, o.MaxArea,
                o.MinRoomsCount, o.MaxRoomsCount, o.HasParking, o.CreatedDate, o.UpdatedDate)).ToList();
        }

        [HttpGet]
        [Route("categories/{categoryId}")]
        public async Task<IReadOnlyList<GetBuyAdvertisementDto>> GetMany(int categoryId)
        {
            var advertisements = await _buyAdvertisementsRepository.GetManyAsync();
            var filteredAdvertisiments = advertisements.Where(advertisiment => advertisiment.CategoryId == categoryId).ToList();

            return filteredAdvertisiments.Select(o => new GetBuyAdvertisementDto(o.Id, o.Title, o.Description, o.City, o.District, o.MinPrice, o.MaxPrice, o.MinArea, o.MaxArea,
                o.MinRoomsCount, o.MaxRoomsCount, o.HasParking, o.CreatedDate, o.UpdatedDate)).ToList();
        }

        [HttpGet]
        [Route("{advertisementId}")]
        public async Task<ActionResult<GetBuyAdvertisementDto>> GetById(int advertisementId)
        {
            var advertisement = await _buyAdvertisementsRepository.GetAsync(advertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            return new GetBuyAdvertisementDto(advertisement.Id, advertisement.Title, advertisement.Description, advertisement.City, advertisement.District,
                advertisement.MinPrice, advertisement.MaxPrice, advertisement.MinArea, advertisement.MaxArea, advertisement.MinRoomsCount, advertisement.MaxRoomsCount,
                advertisement.HasParking, advertisement.CreatedDate, advertisement.UpdatedDate);
        }

        [HttpPost]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<ActionResult<CreateBuyAdvertisementDto>> Create(CreateBuyAdvertisementDto createAdvertisementDto)
        {
            var advertisement = new BuyAdvertisement
            {
                Title = createAdvertisementDto.Title,
                Description = createAdvertisementDto.Description,
                City = createAdvertisementDto.City,
                District = createAdvertisementDto.District,
                MinPrice = createAdvertisementDto.MinPrice,
                MaxPrice = createAdvertisementDto.MaxPrice,
                MinArea = createAdvertisementDto.MinArea,
                MaxArea = createAdvertisementDto.MaxArea,
                MinRoomsCount = createAdvertisementDto.MinRoomsCount,
                MaxRoomsCount = createAdvertisementDto.MaxRoomsCount,
                HasParking = createAdvertisementDto.HasParking,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                CategoryId = createAdvertisementDto.CategoryId,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _buyAdvertisementsRepository.CreateAsync(advertisement);

            return new CreatedResult("", new CreateBuyAdvertisementDto(advertisement.Title, advertisement.Description, advertisement.City, advertisement.District,
                advertisement.MinPrice, advertisement.MaxPrice, advertisement.MinArea, advertisement.MaxArea, advertisement.MinRoomsCount, advertisement.MaxRoomsCount,
                advertisement.HasParking, advertisement.CategoryId));
        }

        [HttpPut]
        [Route("{buyAdvertisementId}")]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<ActionResult<UpdateBuyAdvertisementDto>> Update(UpdateBuyAdvertisementDto updateBuyAdvertisementDto, int buyAdvertisementId)
        {
            var advertisement = await _buyAdvertisementsRepository.GetAsync(buyAdvertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, advertisement, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return new ForbidResult();
            }

            advertisement.Title = updateBuyAdvertisementDto.Title;
            advertisement.Description = updateBuyAdvertisementDto.Description;
            advertisement.City = updateBuyAdvertisementDto.City;
            advertisement.District = updateBuyAdvertisementDto.District;
            advertisement.MinPrice = updateBuyAdvertisementDto.MinPrice;
            advertisement.MaxPrice = updateBuyAdvertisementDto.MaxPrice;
            advertisement.MinArea = updateBuyAdvertisementDto.MinArea;
            advertisement.MaxArea = updateBuyAdvertisementDto.MaxArea;
            advertisement.MinRoomsCount = updateBuyAdvertisementDto.MinRoomsCount;
            advertisement.MaxRoomsCount = updateBuyAdvertisementDto.MaxRoomsCount;
            advertisement.HasParking = updateBuyAdvertisementDto.HasParking;
            advertisement.CategoryId = updateBuyAdvertisementDto.CategoryId;
            advertisement.UpdatedDate = DateTime.Now;

            await _buyAdvertisementsRepository.UpdateAsync(advertisement);

            return new OkObjectResult(new UpdateBuyAdvertisementDto(advertisement.Title, advertisement.Description, advertisement.City, advertisement.District,
                advertisement.MinPrice, advertisement.MaxPrice, advertisement.MinArea, advertisement.MaxArea,
                advertisement.MinRoomsCount, advertisement.MaxRoomsCount, advertisement.HasParking, advertisement.CategoryId));
        }

        [HttpDelete]
        [Route("{buyAdvertisementId}")]
        public async Task<IActionResult> Delete(int buyAdvertisementId)
        {
            var advertisement = await _buyAdvertisementsRepository.GetAsync(buyAdvertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, advertisement, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return new ForbidResult();
            }

            await _buyAdvertisementsRepository.DeleteAsync(advertisement);

            return new NoContentResult();
        }
    }
}
