using eVert.Auth.Model;
using eVert.Data.Dtos.BuyAdvertisiments;
using eVert.Data.Entities;
using eVert.Data.Repositories.BuyAdvertisiments;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;

namespace eVert.Controllers
{
    [ApiController]
    [Route("api/buy-advertisements")]
    public class BuyAdvertisementsController : ControllerBase
    {
        private IBuyAdvertisementsRepository _buyAdvertisementsRepository;
        private IAuthorizationService _authorizationService;
        private readonly UserManager<eVertUser> _userManager;

        public BuyAdvertisementsController(IBuyAdvertisementsRepository buyAdvertisementsRepository, IAuthorizationService authorizationService, UserManager<eVertUser> userManager)
        {
            _buyAdvertisementsRepository = buyAdvertisementsRepository;
            _authorizationService = authorizationService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IReadOnlyList<GetBuyAdvertisementDto>> GetMany()
        {
            var advertisements = await _buyAdvertisementsRepository.GetManyAsync();

            return advertisements.Select(o => new GetBuyAdvertisementDto(o.Id, o.Title, o.Description, o.City, o.District, o.MinPrice, o.MaxPrice, o.MinArea, o.MaxArea,
                o.MinRoomsCount, o.MaxRoomsCount, o.HasParking, o.CreatedDate, o.UpdatedDate, o.PhoneNumber)).ToList();
        }

        [HttpGet]
        [Route("categories/{categoryId}")]
        public async Task<IReadOnlyList<GetBuyAdvertisementDto>> GetMany(int categoryId)
        {
            var advertisements = await _buyAdvertisementsRepository.GetManyAsync();
            var filteredAdvertisiments = advertisements.Where(advertisiment => advertisiment.CategoryId == categoryId).ToList();

            return filteredAdvertisiments.Select(o => new GetBuyAdvertisementDto(o.Id, o.Title, o.Description, o.City, o.District, o.MinPrice, o.MaxPrice, o.MinArea, o.MaxArea,
                o.MinRoomsCount, o.MaxRoomsCount, o.HasParking, o.CreatedDate, o.UpdatedDate, o.PhoneNumber)).ToList();
        }

        [HttpGet]
        [Route("my-advertisements")]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<IReadOnlyList<GetBuyAdvertisementDto>> GetAdvertisementsByUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            if (userName != null)
            {
                var user = await _userManager.FindByNameAsync(userName);
                if (user != null)
                {
                    var advertisements = await _buyAdvertisementsRepository.GetManyAsync();
                    var filteredAdvertisements = advertisements.Where(o => o.UserId == user.Id).ToList();

                    return filteredAdvertisements.Select(o => new GetBuyAdvertisementDto(o.Id, o.Title, o.Description, o.City, o.District, o.MinPrice, o.MaxPrice, o.MinArea, o.MaxArea,
                        o.MinRoomsCount, o.MaxRoomsCount, o.HasParking, o.CreatedDate, o.UpdatedDate, o.PhoneNumber)).ToList();
                }
            }

            return Array.Empty<GetBuyAdvertisementDto>();
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
                advertisement.HasParking, advertisement.CreatedDate, advertisement.UpdatedDate, advertisement.PhoneNumber);
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
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub),
                PhoneNumber = createAdvertisementDto.PhoneNumber
            };

            await _buyAdvertisementsRepository.CreateAsync(advertisement);

            return new CreatedResult("", new CreateBuyAdvertisementDto(advertisement.Title, advertisement.Description, advertisement.City, advertisement.District,
                advertisement.MinPrice, advertisement.MaxPrice, advertisement.MinArea, advertisement.MaxArea, advertisement.MinRoomsCount, advertisement.MaxRoomsCount,
                advertisement.HasParking, advertisement.CategoryId, advertisement.PhoneNumber));
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
        [Authorize(Roles = eVertRoles.eVertUser)]
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

        [HttpPost]
        [Route("scrape-kampas")]
        public List<GetSimpleAdvertisementDto> ScrapeAruodas(BuyAdvertisementForKampasScrapeDto buyAdvertisement)
        {
            string url = $"https://www.kampas.lt/butai-vilniuje?priceFrom={buyAdvertisement.MinPrice}&priceTo={buyAdvertisement.MaxPrice}&area_m2From={buyAdvertisement.MinArea}" +
                $"&area_m2To={buyAdvertisement.MaxArea}&roomsFrom={buyAdvertisement.MinRoomsCount}&roomsTo={buyAdvertisement.MaxRoomsCount}";

            var client = new WebClient();
            var doc = new HtmlDocument();

            string html = client.DownloadString(url);
            doc.LoadHtml(html);

            var pages = doc.DocumentNode.SelectNodes("//a[contains(@class, 'k-pagination-page-item') and @data-v-2794e8ca and @data-v-cedc939e]");
            var pageCount = pages == null ? 1 : int.Parse(pages[pages.Count - 1].InnerText);

            var scrapedList = new List<GetSimpleAdvertisementDto>();

            for(int i=1; i<=pageCount; i++)
            {
                if(i > 1)
                {
                    url = $"https://www.kampas.lt/butai-vilniuje?priceFrom={buyAdvertisement.MinPrice}&priceTo={buyAdvertisement.MaxPrice}&area_m2From={buyAdvertisement.MinArea}" +
                        $"&area_m2To={buyAdvertisement.MaxArea}&roomsFrom={buyAdvertisement.MinRoomsCount}&roomsTo={buyAdvertisement.MaxRoomsCount}&page={i}";

                    html = client.DownloadString(url);
                    doc.LoadHtml(html);
                }

                var links = doc.DocumentNode.SelectNodes("//a[contains(@class, 'card-link')]");
                if(links != null)
                {
                    foreach (HtmlNode link in links)
                    {
                        try
                        {
                            var address = link.FirstChild.InnerText.Trim();
                            var price = ExtractNumber(link.SelectSingleNode(".//p[@class='third-line line-bold']").InnerText.Trim());
                            var area = ExtractNumber(link.SelectSingleNode(".//div[@class='k-attribute-icon']//div[@class='label']").InnerText.Trim());
                            var rooms = ExtractNumber(link.SelectSingleNode(".//div[@class='k-attribute-icon' and i[@class='icon i i-room']]//div[@class='label']").InnerText.Trim());
                            var href = "https://www.kampas.lt" + link.Attributes["href"].Value;
                            scrapedList.Add(new GetSimpleAdvertisementDto(price, area, address, rooms, href));
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error scraping link: {ex.Message}");
                        }
                    }
                }
            }

            return scrapedList;
        }

        public int ExtractNumber(string text)
        {
            string result = string.Empty;
            for (int i = 0; i < text.Length; i++)
            {
                if (Char.IsDigit(text[i]))
                    result += text[i];
            }
            return int.Parse(result);
        }

    }
}
