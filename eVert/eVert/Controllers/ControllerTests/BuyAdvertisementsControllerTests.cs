using eVert.Auth.Model;
using eVert.Data.Dtos.BuyAdvertisiments;
using eVert.Data.Dtos.Categories;
using eVert.Data.Entities;
using eVert.Data.Repositories.BuyAdvertisiments;
using eVert.Data.Repositories.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Security.Claims;
using Assert = NUnit.Framework.Assert;

namespace eVert.Controllers.ControllerTests
{
    [TestFixture]
    public class BuyAdvertisementsControllerTests
    {

        private Mock<IBuyAdvertisementsRepository> _mockRepository;
        private BuyAdvertisementsController _controller;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IBuyAdvertisementsRepository>();

            _controller = new BuyAdvertisementsController(_mockRepository.Object, null, null);
        }

        [Test]
        public async Task GetMany_ReturnsListOfBuyAdvertisementDtos()
        {
            // Arrange
            var advertisements = new List<BuyAdvertisement>
            {
                new BuyAdvertisement
                {
                    Id = 1,
                    Title = "Ad 1",
                    Description = "Ad 1 description",
                    City = "City 1",
                    District = "District 1",
                    MinPrice = 100000,
                    MaxPrice = 200000,
                    MinArea = 50,
                    MaxArea = 100,
                    MinRoomsCount = 2,
                    MaxRoomsCount = 3,
                    HasParking = true,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    PhoneNumber = "123456789"
                },
                new BuyAdvertisement
                {
                    Id = 2,
                    Title = "Ad 2",
                    Description = "Ad 2 description",
                    City = "City 2",
                    District = "District 2",
                    MinPrice = 200000,
                    MaxPrice = 300000,
                    MinArea = 100,
                    MaxArea = 150,
                    MinRoomsCount = 3,
                    MaxRoomsCount = 4,
                    HasParking = false,
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                    PhoneNumber = "987654321"
                }
            };

            var mockRepo = new Mock<IBuyAdvertisementsRepository>();
            mockRepo.Setup(repo => repo.GetManyAsync()).ReturnsAsync(advertisements);

            var controller = new BuyAdvertisementsController(mockRepo.Object, null, null);

            // Act
            var result = await controller.GetMany();

            // Assert
            Assert.IsInstanceOf<IReadOnlyList<GetBuyAdvertisementDto>>(result);
            Assert.AreEqual(advertisements.Count, result.Count);
            for (int i = 0; i < advertisements.Count; i++)
            {
                Assert.AreEqual(advertisements[i].Id, result[i].Id);
                Assert.AreEqual(advertisements[i].Title, result[i].Title);
                Assert.AreEqual(advertisements[i].Description, result[i].Description);
                Assert.AreEqual(advertisements[i].City, result[i].City);
                Assert.AreEqual(advertisements[i].District, result[i].District);
                Assert.AreEqual(advertisements[i].MinPrice, result[i].MinPrice);
                Assert.AreEqual(advertisements[i].MaxPrice, result[i].MaxPrice);
                Assert.AreEqual(advertisements[i].MinArea, result[i].MinArea);
                Assert.AreEqual(advertisements[i].MaxArea, result[i].MaxArea);
                Assert.AreEqual(advertisements[i].MinRoomsCount, result[i].MinRoomsCount);
                Assert.AreEqual(advertisements[i].MaxRoomsCount, result[i].MaxRoomsCount);
                Assert.AreEqual(advertisements[i].HasParking, result[i].HasParking);
                Assert.AreEqual(advertisements[i].CreatedDate, result[i].CreatedDate);
                Assert.AreEqual(advertisements[i].UpdatedDate, result[i].UpdatedDate);
                Assert.AreEqual(advertisements[i].PhoneNumber, result[i].PhoneNumber);
            }
        }

        [Test]
        public async Task GetMany_ReturnsFilteredAdvertisements_WhenCategoryIdIsProvided()
        {
            // Arrange
            int categoryId = 1;
            var advertisements = new List<BuyAdvertisement>
            {
                new BuyAdvertisement { Id = 1, CategoryId = categoryId, Title = "Ad1" },
                new BuyAdvertisement { Id = 2, CategoryId = categoryId, Title = "Ad2" },
                new BuyAdvertisement { Id = 3, CategoryId = 2, Title = "Ad3" }
            };

            _mockRepository.Setup(repo => repo.GetManyAsync()).ReturnsAsync(advertisements);

            var controller = new BuyAdvertisementsController(_mockRepository.Object, null, null);

            // Act
            var result = await controller.GetMany(categoryId);

            // Assert
            Assert.IsInstanceOf<IReadOnlyList<GetBuyAdvertisementDto>>(result);
            var resultList = (IReadOnlyList<GetBuyAdvertisementDto>)result;
            Assert.AreEqual(2, resultList.Count);
            Assert.AreEqual("Ad1", resultList[0].Title);
            Assert.AreEqual("Ad2", resultList[1].Title);
        }

        [Test]
        public async Task GetById_ReturnsOkResult_WhenAdvertisementExists()
        {
            // Arrange
            int advertisementId = 1;
            string advertisementTitle = "Test Advertisement";
            var advertisement = new BuyAdvertisement { Id = advertisementId, Title = advertisementTitle };

            _mockRepository.Setup(repo => repo.GetAsync(advertisementId)).ReturnsAsync(advertisement);

            // Act
            var result = await _controller.GetById(advertisementId);

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = (OkObjectResult)result.Result;
            Assert.IsInstanceOf<GetBuyAdvertisementDto>(okResult.Value);
            var advertisementDto = (GetBuyAdvertisementDto)okResult.Value;
            Assert.AreEqual(advertisementTitle, advertisementDto.Title);
            Assert.AreEqual(advertisementId, advertisementDto.Id);
        }
    }
}
