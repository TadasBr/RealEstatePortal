using eVert.Auth.Model;
using eVert.Data.Dtos.Advertisements;
using eVert.Data.Dtos.Photos;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.Photos;
using eVert.Data.Repositories.SoldAdvertisiments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Data;
using System.Net;
using System.Security.Claims;
using System.Net;
using System.IO;
using HtmlAgilityPack;
using eVert.Data.Dtos.BuyAdvertisiments;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/sell-advertisements")]
    public class AdvertisementsController : ControllerBase
    {
        private IAdvertisementsRepository _advertisementsRepository;
        private IAuthorizationService _authorizationService;
        private ISoldAdvertisementsRepository _soldAdvertisementsRepository;
        public IPhotosRepository _photosRepository;
        private readonly UserManager<eVertUser> _userManager;

        public AdvertisementsController(IAdvertisementsRepository advertisementsRepository, IAuthorizationService authorizationService, UserManager<eVertUser> userManager,
            ISoldAdvertisementsRepository soldAdvertisementsRepository, IPhotosRepository photosRepository)
        {
            _advertisementsRepository = advertisementsRepository;
            _authorizationService = authorizationService;
            _userManager = userManager;
            _soldAdvertisementsRepository = soldAdvertisementsRepository;
            _photosRepository = photosRepository;
        }

        [HttpGet]
        public async Task<IReadOnlyList<GetAdvertisementDto>> GetManyAsync()
        {
            var advertisements = await _advertisementsRepository.GetManyAsync();
            var advertisementDtos = new List<GetAdvertisementDto>();

            foreach (var advertisement in advertisements)
            {
                var photos = await _photosRepository.GetMany(advertisement.Id);
                List<string> photoDtos = new();

                foreach (var photo in photos)
                {
                    photoDtos.Add(photo.Data);
                }

                var advertisementDto = new GetAdvertisementDto(
                    advertisement.Id,
                    advertisement.Description,
                    advertisement.Title,
                    advertisement.City,
                    advertisement.Address,
                    advertisement.District,
                    advertisement.Price,
                    advertisement.RoomsCount,
                    advertisement.Area,
                    advertisement.HasParking,
                    advertisement.Views,
                    advertisement.CreatedDate,
                    advertisement.UpdatedDate,
                    photoDtos,
                    advertisement.PhoneNumber,
                    advertisement.BuiltYear);

                advertisementDtos.Add(advertisementDto);
            }

            return advertisementDtos;
        }

        [HttpGet]
        [Route("my-advertisements")]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<IReadOnlyList<GetAdvertisementDto>> GetAdvertisementsByUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            if (userName != null)
            {
                var user = await _userManager.FindByNameAsync(userName);
                if (user != null)
                {
                    var advertisements = await _advertisementsRepository.GetManyAsync();
                    var filteredAdvertisements = advertisements.Where(o => o.UserId == user.Id).ToList();
                    var advertisementDtos = new List<GetAdvertisementDto>();

                    foreach (var advertisement in filteredAdvertisements)
                    {
                        var photos = await _photosRepository.GetMany(advertisement.Id);
                        List<string> photoDtos = new();

                        foreach (var photo in photos)
                        {
                            photoDtos.Add(photo.Data);
                        }

                        var advertisementDto = new GetAdvertisementDto(
                            advertisement.Id,
                            advertisement.Description,
                            advertisement.Title,
                            advertisement.City,
                            advertisement.Address,
                            advertisement.District,
                            advertisement.Price,
                            advertisement.RoomsCount,
                            advertisement.Area,
                            advertisement.HasParking,
                            advertisement.Views,
                            advertisement.CreatedDate,
                            advertisement.UpdatedDate,
                            photoDtos,
                            advertisement.PhoneNumber,
                            advertisement.BuiltYear);

                        advertisementDtos.Add(advertisementDto);
                    }

                    return advertisementDtos;
                }
            }

            return Array.Empty<GetAdvertisementDto>();
        }


        [HttpGet]
        [Route("categories/{categoryId}")]
        public async Task<IReadOnlyList<GetAdvertisementDto>> GetManyWithPhotos(int categoryId)
        {
            var advertisements = await _advertisementsRepository.GetManyAsync();
            var filteredAdvertisements = advertisements.Where(advertisement => advertisement.CategoryId == categoryId).ToList();
            var advertisementDtos = new List<GetAdvertisementDto>();

            foreach (var advertisement in filteredAdvertisements)
            {
                var photos = await _photosRepository.GetMany(advertisement.Id);
                List<string> photoDtos = new();

                foreach (var photo in photos)
                {
                    photoDtos.Add(photo.Data);
                }

                var advertisementDto = new GetAdvertisementDto(
                    advertisement.Id,
                    advertisement.Description,
                    advertisement.Title,
                    advertisement.City,
                    advertisement.Address,
                    advertisement.District,
                    advertisement.Price,
                    advertisement.RoomsCount,
                    advertisement.Area,
                    advertisement.HasParking,
                    advertisement.Views,
                    advertisement.CreatedDate,
                    advertisement.UpdatedDate,
                    photoDtos,
                    advertisement.PhoneNumber, 
                    advertisement.BuiltYear);

                advertisementDtos.Add(advertisementDto);
            }

            return advertisementDtos;
        }


        [HttpGet]
        [Route("{advertisementId}")]
        public async Task<ActionResult<GetAdvertisementDto>> GetByIdWithPhotos(int advertisementId)
        {
            var advertisement = await _advertisementsRepository.GetAsync(advertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            advertisement.Views++;
            await _advertisementsRepository.UpdateAsync(advertisement);

            var photos = await _photosRepository.GetMany(advertisementId);
            List<string> photoDtos = new();

            foreach (var photo in photos)
            {
                photoDtos.Add(photo.Data);
            }

            var advertisementDto = new GetAdvertisementDto(
                advertisement.Id,
                advertisement.Description,
                advertisement.Title,
                advertisement.City,
                advertisement.Address,
                advertisement.District,
                advertisement.Price,
                advertisement.RoomsCount,
                advertisement.Area,
                advertisement.HasParking,
                advertisement.Views,
                advertisement.CreatedDate,
                advertisement.UpdatedDate,
                photoDtos,
                advertisement.PhoneNumber,
                advertisement.BuiltYear);

            return advertisementDto;
        }

        [HttpPost]
        [Route("get-recommendations")]
        public async Task<IReadOnlyList<GetSimpleAdvertisementDto>> GetByBuyAdvertisement(BuyAdvertisementForKampasScrapeDto buyAdvertisementDto)
        {
            var advertisements = await _advertisementsRepository.GetManyAsync();
            var filteredAdvertisements = advertisements.Where(ad => ad.Price >= buyAdvertisementDto.MinPrice && ad.Price <= buyAdvertisementDto.MaxPrice && ad.RoomsCount >= buyAdvertisementDto.MinRoomsCount
                && ad.RoomsCount <= buyAdvertisementDto.MaxRoomsCount && ad.Area >= buyAdvertisementDto.MinArea && ad.Area <= buyAdvertisementDto.MaxArea && ad.City == buyAdvertisementDto.City);

            if (filteredAdvertisements == null)
            {
                return new List<GetSimpleAdvertisementDto>();
            }

            return filteredAdvertisements.Select(ad => new GetSimpleAdvertisementDto(ad.Price, ad.Area, ad.City + ", " + ad.District + ", " + ad.Address, ad.RoomsCount, ad.Id.ToString())).ToList();
        }


        [HttpPost]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<ActionResult<CreateAdvertisementDto>> Create(CreateAdvertisementWithPhotosDto createAdvertisementDto)
        {
            var advertisement = new Advertisement
            {
                Title = createAdvertisementDto.Title,
                Description = createAdvertisementDto.Description,
                City = createAdvertisementDto.City,
                Address = createAdvertisementDto.Address,
                District = createAdvertisementDto.District,
                Price = createAdvertisementDto.Price,
                RoomsCount = createAdvertisementDto.RoomsCount,
                Area = createAdvertisementDto.Area,
                HasParking = createAdvertisementDto.HasParking,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                CategoryId = createAdvertisementDto.CategoryId,
                Views = 0,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub),
                PhoneNumber = createAdvertisementDto.PhoneNumber,
                BuiltYear = createAdvertisementDto.BuiltYear
            };

            await _advertisementsRepository.CreateAsync(advertisement);

            if (createAdvertisementDto.Photos.Count > 0)
            {
                foreach (var photo in createAdvertisementDto.Photos)
                {
                    var photoDto = new Photo
                    {
                        Data = photo,
                        AdvertisementId = advertisement.Id
                    };

                    await _photosRepository.CreateAsync(photoDto);
                }
            }

            return new CreatedResult("", new CreateAdvertisementDto(advertisement.Title, advertisement.Description, advertisement.City, advertisement.Address,
                advertisement.District, advertisement.Price, advertisement.RoomsCount, advertisement.Area, advertisement.HasParking, advertisement.CategoryId, advertisement.PhoneNumber, advertisement.BuiltYear));
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

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, advertisement, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return new ForbidResult();
            }

            advertisement.Title = updateAdvertisementDto.Title;
            advertisement.Description = updateAdvertisementDto.Description;
            advertisement.City = updateAdvertisementDto.City;
            advertisement.Address = updateAdvertisementDto.Address;
            advertisement.District = updateAdvertisementDto.District;
            advertisement.Price = updateAdvertisementDto.Price;
            advertisement.UpdatedDate = DateTime.Now;
            await _advertisementsRepository.UpdateAsync(advertisement);

            return new OkObjectResult(new UpdateAdvertisementDto(advertisement.Title, advertisement.Description, advertisement.City, advertisement.Address,
                advertisement.District, advertisement.Price, advertisement.RoomsCount, advertisement.Area, advertisement.HasParking));
        }

        [HttpDelete]
        [Route("{advertisementId}")]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<IActionResult> Delete(int advertisementId)
        {
            var advertisement = await _advertisementsRepository.GetAsync(advertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, advertisement, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return new ForbidResult();
            }

            await _advertisementsRepository.DeleteAsync(advertisement);

            return new NoContentResult();
        }

        [HttpDelete]
        [Route("{advertisementId}/sell")]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<IActionResult> MarkAsSold(int advertisementId)
        {
            var advertisement = await _advertisementsRepository.GetAsync(advertisementId);

            if (advertisement == null)
            {
                return new NotFoundResult();
            }

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, advertisement, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded)
            {
                return new ForbidResult();
            }

            var soldAdvertisement = new SoldAdvertisement
            {
                City = advertisement.City,
                District = advertisement.District,
                Price = advertisement.Price,
                HasParking = advertisement.HasParking,
                SellTime = DateTime.Now.Subtract(advertisement.UpdatedDate).Days,
                CategoryId = advertisement.CategoryId,
                RoomsCount = advertisement.RoomsCount,
                Area = advertisement.Area,
                BuiltYear = advertisement.BuiltYear
            };

            await _soldAdvertisementsRepository.CreateAsync(soldAdvertisement);

            await _advertisementsRepository.DeleteAsync(advertisement);

            return new NoContentResult();
        }

        [HttpPost]
        [Route("get-evert-recommendations")]
        public async Task<List<GetSimpleAdvertisementDto>> GetRecommendationsAsync(BuyAdvertisementForKampasScrapeDto buyAdvertisement)
        {
            var advertisements = await _advertisementsRepository.GetManyAsync();
            var filteredAdvertisements = advertisements.Where(ad => ad.City == buyAdvertisement.City && ad.Price >= buyAdvertisement.MinPrice && ad.Price <= buyAdvertisement.MaxPrice
                && ad.Area >= buyAdvertisement.MinArea && ad.Area <= buyAdvertisement.MaxArea && ad.RoomsCount >= buyAdvertisement.MinRoomsCount && ad.RoomsCount <= buyAdvertisement.MaxRoomsCount)
                .Select(ad => new GetSimpleAdvertisementDto(ad.Price, (double)ad.Area, ad.City + ", " + ad.District + ", " + ad.Address, ad.RoomsCount, ad.Id.ToString())).ToList();

            return filteredAdvertisements;
        }
    }
}
