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
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

        [Test]
        public async Task GetManyWithPhotos_ReturnsCorrectNumberAdvertisements_WhenCategoryHasAdvertisements()
        {
            // Arrange
            int categoryId = 1;
            _mockAdvertisementsRepo.Setup(repo => repo.GetManyAsync())
                .ReturnsAsync(new List<Advertisement> { new Advertisement { CategoryId = categoryId }, new Advertisement { CategoryId = categoryId } });

            // Act
            var result = await _controller.GetManyWithPhotos(categoryId);

            // Assert
            Assert.AreEqual(2, result.Count);
        }

        [Test]
        public async Task GetManyWithPhotos_ReturnsEmptyList_WhenCategoryHasNoAdvertisements()
        {
            // Arrange
            int categoryId = 1;
            _mockAdvertisementsRepo.Setup(repo => repo.GetManyAsync())
                .ReturnsAsync(new List<Advertisement> { new Advertisement { CategoryId = 2 }, new Advertisement { CategoryId = 3 } });

            // Act
            var result = await _controller.GetManyWithPhotos(categoryId);

            // Assert
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task GetManyWithPhotos_ReturnsCorrectlyMappedAdvertisements_WhenCategoryHasAdvertisements()
        {
            // Arrange
            int categoryId = 1;
            var advertisement = new Advertisement { Id = 1, Description = "Ad 1", CategoryId = categoryId };
            _mockAdvertisementsRepo.Setup(repo => repo.GetManyAsync())
                .ReturnsAsync(new List<Advertisement> { advertisement });

            // Act
            var result = await _controller.GetManyWithPhotos(categoryId);

            // Assert
            Assert.AreEqual(advertisement.Id, result.First().Id);
            Assert.AreEqual(advertisement.Description, result.First().Description);
        }

        [Test]
        public async Task GetByIdWithPhotos_ReturnsCorrectAdvertisement_WhenAdvertisementExists()
        {
            // Arrange
            int advertisementId = 1;
            var advertisement = new Advertisement { Id = advertisementId, Description = "Ad 1" };
            _mockAdvertisementsRepo.Setup(repo => repo.GetAsync(advertisementId))
                .ReturnsAsync(advertisement);

            // Act
            var result = await _controller.GetByIdWithPhotos(advertisementId);

            // Assert
            Assert.AreEqual(advertisement.Id, result.Value.Id);
            Assert.AreEqual(advertisement.Description, result.Value.Description);
        }

        [Test]
        public async Task GetByIdWithPhotos_ReturnsNotFound_WhenAdvertisementDoesNotExist()
        {
            // Arrange
            int advertisementId = 1;
            _mockAdvertisementsRepo.Setup(repo => repo.GetAsync(advertisementId))
                .ReturnsAsync((Advertisement)null);

            // Act
            var result = await _controller.GetByIdWithPhotos(advertisementId);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task GetByIdWithPhotos_IncrementsViews_WhenAdvertisementExists()
        {
            // Arrange
            int advertisementId = 1;
            var advertisement = new Advertisement { Id = advertisementId, Description = "Ad 1", Views = 1 };
            _mockAdvertisementsRepo.Setup(repo => 
            repo.GetAsync(advertisementId))
            .ReturnsAsync(advertisement);
            _mockAdvertisementsRepo.Setup(repo => repo.UpdateAsync(It.IsAny<Advertisement>()))
                .Callback((Advertisement a) => advertisement = a)
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.GetByIdWithPhotos(advertisementId);

            // Assert
            Assert.AreEqual(2, advertisement.Views);
        }

        [Test]
        public async Task GetByIdWithPhotos_ReturnsCorrectPhotos_WhenAdvertisementExists()
        {
            // Arrange
            int advertisementId = 1;
            var advertisement = new Advertisement { Id = advertisementId, Description = "Ad 1" };
            var photos = new List<Photo> { new Photo { Data = "Photo1" }, new Photo { Data = "Photo2" } };
            _mockAdvertisementsRepo.Setup(repo => repo.GetAsync(advertisementId))
                .ReturnsAsync(advertisement);
            _mockPhotosRepo.Setup(repo => repo.GetMany(advertisementId))
                .ReturnsAsync(photos);

            // Act
            var result = await _controller.GetByIdWithPhotos(advertisementId);

            // Assert
            Assert.AreEqual(photos.Count, result.Value.Photos.Count);
            Assert.AreEqual(photos[0].Data, result.Value.Photos[0]);
            Assert.AreEqual(photos[1].Data, result.Value.Photos[1]);
        }

        [Test]
        public async Task Create_GivenValidInput_ReturnsCreatedResult()
        {
            // Arrange
            var createAdvertisementDto = new CreateAdvertisementWithPhotosDto("Test Title", "Test Description", "Test City", "Test Address", "Test District",
                100, 2, 50, true, 1, new List<string> { "photo1", "photo2" }, "123456789", 2000);

            var controller = SetupControllerWithUser();

            // Act
            var result = await controller.Create(createAdvertisementDto);

            // Assert
            Assert.IsInstanceOf<CreatedResult>(result.Result);
        }

        [Test]
        public async Task Create_GivenValidInput_CreatesAdvertisementInRepository()
        {
            // Arrange
            var createAdvertisementDto = new CreateAdvertisementWithPhotosDto("Test Title", "Test Description", "Test City", "Test Address", "Test District",
                100, 2, 50, true, 1, new List<string> { "photo1", "photo2" }, "123456789", 2000);

            var controller = SetupControllerWithUser();

            // Act
            await controller.Create(createAdvertisementDto);

            // Assert
            _mockAdvertisementsRepo.Verify(repo => repo.CreateAsync(It.IsAny<Advertisement>()), Times.Once);
        }

        [Test]
        public async Task Create_GivenValidInputWithPhotos_CreatesPhotosInRepository()
        {
            // Arrange
            var createAdvertisementDto = new CreateAdvertisementWithPhotosDto("Test Title", "Test Description", "Test City", "Test Address", "Test District",
                100, 2, 50, true, 1, new List<string> { "photo1", "photo2" }, "123456789", 2000);

            var controller = SetupControllerWithUser();

            // Act
            await controller.Create(createAdvertisementDto);

            // Assert
            _mockPhotosRepo.Verify(repo => repo.CreateAsync(It.IsAny<Photo>()), Times.Exactly(createAdvertisementDto.Photos.Count));
        }

        [Test]
        public async Task Create_GivenValidInputWithNoPhotos_DoesNotCreatePhotosInRepository()
        {
            // Arrange
            var createAdvertisementDto = new CreateAdvertisementWithPhotosDto("Test Title", "Test Description", "Test City", "Test Address", "Test District",
                100, 2, 50, true, 1, new List<string>(), "123456789", 2000);

            var controller = SetupControllerWithUser();

            // Act
            await controller.Create(createAdvertisementDto);

            // Assert
            _mockPhotosRepo.Verify(repo => repo.CreateAsync(It.IsAny<Photo>()), Times.Never);
        }

        private AdvertisementsController SetupControllerWithUser()
        {
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, "dummy"),
                new Claim(JwtRegisteredClaimNames.Sub, "1"),
            }));

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };

            return _controller;
        }


    }
}
