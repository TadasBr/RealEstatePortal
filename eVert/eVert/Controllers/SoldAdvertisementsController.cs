using eVert.Auth.Model;
using eVert.Data.Dtos.Advertisements;
using eVert.Data.Dtos.SoldAdvertisements;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.SoldAdvertisiments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/sold-advertisements")]
    public class SoldAdvertisementsController
    {
        private ISoldAdvertisementsRepository _soldAdvertisementsRepository;

        public SoldAdvertisementsController(ISoldAdvertisementsRepository soldAdvertisementsRepository)
        {
            _soldAdvertisementsRepository = soldAdvertisementsRepository;
        }

        [HttpGet]
        public async Task<IReadOnlyList<GetSoldAdvertisementStatisticsDto>> GetMany()
        {
            var advertisements = await _soldAdvertisementsRepository.GetManyAsync();

            return advertisements.Select(o => new GetSoldAdvertisementStatisticsDto(o.City, o.District, o.Price, o.HasParking, o.SellTime, o.CategoryId, o.RoomsCount, o.Area, o.BuiltYear)).ToList();
        }

        [HttpPost]
        public async Task<ActionResult<CreateAdvertisementDto>> Create(CreateSoldAdvertisementDto advertisement)
        {
            var soldAdvertisement = new SoldAdvertisement
            {
                City = advertisement.City,
                District = advertisement.District,
                Price = advertisement.Price,
                HasParking = true,
                SellTime = advertisement.SellTime,
                CategoryId = advertisement.CategoryId,
                RoomsCount = advertisement.RoomsCount,
                Area = advertisement.Area,
                BuiltYear = advertisement.BuiltYear
            };

            await _soldAdvertisementsRepository.CreateAsync(soldAdvertisement);

            return new CreatedResult("", new CreateSoldAdvertisementDto(soldAdvertisement.City, soldAdvertisement.District, soldAdvertisement.Price, soldAdvertisement.HasParking, 
                soldAdvertisement.SellTime, soldAdvertisement.CategoryId, advertisement.RoomsCount, advertisement.Area, advertisement.BuiltYear));
        }
    }
}
