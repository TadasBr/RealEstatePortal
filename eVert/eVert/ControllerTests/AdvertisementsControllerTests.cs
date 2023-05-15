using eVert.Auth.Model;
using eVert.Controllers;
using eVert.Data.Dtos.Advertisements;
using eVert.Data.Dtos.BuyAdvertisiments;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.Photos;
using eVert.Data.Repositories.SoldAdvertisiments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using NUnit.Framework;
using Assert = NUnit.Framework.Assert;

namespace eVert.ControllerTests
{
    [TestFixture]
    public class AdvertisementsControllerTests
    {
        private AdvertisementsController _controller;
        private Mock<IAdvertisementsRepository> _mockAdvertisementsRepo;
        private Mock<IAuthorizationService> _mockAuthorizationService;
        private Mock<ISoldAdvertisementsRepository> _mockSoldAdvertisementsRepo;
        private Mock<IPhotosRepository> _mockPhotosRepo;
        private Mock<UserManager<eVertUser>> _mockUserManager;

        [SetUp]
        public void Setup()
        {
            _mockAdvertisementsRepo = new Mock<IAdvertisementsRepository>();
            _mockAuthorizationService = new Mock<IAuthorizationService>();
            _mockSoldAdvertisementsRepo = new Mock<ISoldAdvertisementsRepository>();
            _mockPhotosRepo = new Mock<IPhotosRepository>();
            _mockUserManager = new Mock<UserManager<eVertUser>>(Mock.Of<IUserStore<eVertUser>>(), null, null, null, null, null, null, null, null);

            _controller = new AdvertisementsController(
                _mockAdvertisementsRepo.Object,
                _mockAuthorizationService.Object,
                _mockUserManager.Object,
                _mockSoldAdvertisementsRepo.Object,
                _mockPhotosRepo.Object
            );
        }


        [Test]
        public async Task GetManyAsync_ReturnsCorrectAdvertisementDtos()
        {
            // Arrange
            var advertisements = new List<Advertisement>
            {
                new Advertisement
                {
                    Id = 1,
                    Description = "Beautiful apartment with great views",
                    Title = "Luxury Apartment",
                    City = "New York",
                    Address = "123 Main Street",
                    District = "Manhattan",
                    Price = 2000000,
                    RoomsCount = 3,
                    Area = 200,
                    HasParking = true,
                    Views = 100,
                    CreatedDate = DateTime.UtcNow.AddDays(-30),
                    UpdatedDate = DateTime.UtcNow.AddDays(-7),
                    PhoneNumber = "555-555-5555",
                    BuiltYear = 2010
                },
                new Advertisement
                {
                    Id = 2,
                    Description = "Spacious house with large backyard",
                    Title = "Family House",
                    City = "Los Angeles",
                    Address = "456 Elm Street",
                    District = "Beverly Hills",
                    Price = 5000000,
                    RoomsCount = 5,
                    Area = 400,
                    HasParking = true,
                    Views = 250,
                    CreatedDate = DateTime.UtcNow.AddDays(-60),
                    UpdatedDate = DateTime.UtcNow.AddDays(-14),
                    PhoneNumber = "555-555-5555",
                    BuiltYear = 1995
                }
            };

            var photo1 = new Photo { Id = 1, AdvertisementId = 1, Data = "photo1.jpg" };
            var photo2 = new Photo { Id = 2, AdvertisementId = 1, Data = "photo2.jpg" };
            var photo3 = new Photo { Id = 3, AdvertisementId = 2, Data = "photo3.jpg" };
            var photo4 = new Photo { Id = 4, AdvertisementId = 2, Data = "photo4.jpg" };
            var photos = new List<Photo> { photo1, photo2, photo3, photo4 };

            _mockAdvertisementsRepo.Setup(repo => repo.GetManyAsync())
                .ReturnsAsync(advertisements);

            _mockPhotosRepo.Setup(repo => repo.GetMany(It.IsAny<int>()))
                .ReturnsAsync((int advertisementId) => photos.Where(p => p.AdvertisementId == advertisementId).ToList());


            var expectedDtos = new List<GetAdvertisementDto>();
            foreach (var advertisement in advertisements)
            {
                var photoDtos = photos.Where(p => p.AdvertisementId == advertisement.Id).Select(p => p.Data).ToList();

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

                expectedDtos.Add(advertisementDto);
            }

            // Act
            var result = await _controller.GetManyAsync();

            // Assert
            Assert.AreEqual(expectedDtos, result);
        }


        [Test]
        public async Task GetManyAsync_ReturnsEmptyList_WhenNoAdvertisements()
        {
            // Arrange
            _mockAdvertisementsRepo.Setup(repo => repo.GetManyAsync())
                .ReturnsAsync(new List<Advertisement>());

            // Act
            var result = await _controller.GetManyAsync();

            // Assert
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task GetByBuyAdvertisement_ReturnsEmptyList_WhenNoAdvertisementsFound()
        {
            // Arrange
            var buyAdvertisementDto = new BuyAdvertisementForKampasScrapeDto("Vilnius", 50000, 100000, 50, 100, 1, 2);
            _mockAdvertisementsRepo.Setup(repo => repo.GetManyAsync())
                .ReturnsAsync(new List<Advertisement>());

            // Act
            var result = await _controller.GetByBuyAdvertisement(buyAdvertisementDto);

            // Assert
            Assert.AreEqual(0, result.Count);
        }

        //[TestMethod]
        //public async Task GetByBuyAdvertisement_ReturnsCorrectAdvertisements()
        //{
        //    // Arrange
        //    var buyAdvertisementDto = new BuyAdvertisementForKampasScrapeDto("Vilnius", 50000, 100000, 50, 100, 1, 2);
        //    var advertisements = new List<Advertisement>
        //    {
        //        new Advertisement
        //        {
        //            Id = 1,
        //            Price = 70000,
        //            Area = 75,
        //            City = "Vilnius",
        //            District = "Naujamiestis",
        //            Address = "Pylimo g.",
        //            RoomsCount = 2
        //        },
        //        new Advertisement
        //        {
        //            Id = 2,
        //            Price = 80000,
        //            Area = 80,
        //            City = "Vilnius",
        //            District = "Žirmūnai",
        //            Address = "Žirmūnų g.",
        //            RoomsCount = 2
        //        },
        //        new Advertisement
        //        {
        //            Id = 3,
        //            Price = 90000,
        //            Area = 90,
        //            City = "Kaunas",
        //            District = "Žaliakalnis",
        //            Address = "Laisvės al.",
        //            RoomsCount = 2
        //        }
        //    };
        //    _mockAdvertisementsRepo.Setup(repo => repo.GetManyAsync())
        //        .ReturnsAsync(advertisements);

        //    // Act
        //    var result = await _controller.GetByBuyAdvertisement(buyAdvertisementDto);

        //    // Assert
        //    Assert.AreEqual(2, result.Count);

        //    var ad1 = result.FirstOrDefault(ad => ad.Id == "1");
        //    Assert.IsNotNull(ad1);
        //    Assert.AreEqual("Vilnius, Naujamiestis, Pylimo g.", ad1.Address);
        //    Assert.AreEqual(2, ad1.RoomsCount);
        //    Assert.AreEqual(75000, ad1.Price);
        //    Assert.AreEqual(75, ad1.Area);

        //    var ad2 = result.FirstOrDefault(ad => ad.Id == "2");
        //    Assert.IsNotNull(ad2);
        //    Assert.AreEqual("Vilnius, Žirmūnai, Žirmūnų g.", ad2.Address);
        //    Assert.AreEqual(2, ad2.RoomsCount);
        //    Assert.AreEqual(80000, ad2.Price);
        //    Assert.AreEqual(80, ad2.Area);
        //}
    }
}
