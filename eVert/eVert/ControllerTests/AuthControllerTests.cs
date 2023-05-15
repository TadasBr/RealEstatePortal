using eVert.Auth;
using eVert.Auth.Model;
using eVert.Controllers;
using eVert.Data.Dtos.Auth;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.BuyAdvertisiments;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace eVert.ControllerTests
{
    [TestFixture]
    public class AuthControllerTests
    {
        private Mock<UserManager<eVertUser>> _userManagerMock;
        private Mock<IJwtTokenService> _jwtTokenServiceMock;
        private Mock<IAdvertisementsRepository> _advertisementsRepositoryMock;
        private Mock<IBuyAdvertisementsRepository> _buyAdvertisementsRepositoryMock;
        private AuthController _authController;

        [SetUp]
        public void Setup()
        {
            _userManagerMock = new Mock<UserManager<eVertUser>>();
            _jwtTokenServiceMock = new Mock<IJwtTokenService>();
            _advertisementsRepositoryMock = new Mock<IAdvertisementsRepository>();
            _buyAdvertisementsRepositoryMock = new Mock<IBuyAdvertisementsRepository>();

            _authController = new AuthController(
                _userManagerMock.Object,
                _jwtTokenServiceMock.Object,
                _advertisementsRepositoryMock.Object,
                _buyAdvertisementsRepositoryMock.Object);
        }

        //[Test]
        //public async Task Register_WhenCalledWithValidModel_ReturnsCreatedResultWithUserDto()
        //{
        //    // Arrange
        //    var registerDto = new RegisterDto
        //    {
        //        UserName = "johndoe",
        //        EmailAddress = "johndoe@example.com",
        //        Password = "123456",
        //        IsSeller = true,
        //        PhoneNumber = "555-555-5555"
        //    };
        //    var newUser = new eVertUser
        //    {
        //        Id = "1",
        //        UserName = registerDto.UserName,
        //        Email = registerDto.EmailAddress,
        //        IsSeller = registerDto.IsSeller,
        //        PhoneNumber = registerDto.PhoneNumber
        //    };
        //    _userManagerMock.Setup(x => x.FindByNameAsync(registerDto.UserName)).ReturnsAsync((eVertUser)null);
        //    _userManagerMock.Setup(x => x.CreateAsync(It.IsAny<eVertUser>(), registerDto.Password)).ReturnsAsync(IdentityResult.Success);
        //    _userManagerMock.Setup(x => x.AddToRoleAsync(It.IsAny<eVertUser>(), eVertRoles.eVertUser)).Returns(Task.FromResult(0));
        //    _jwtTokenServiceMock.Setup(x => x.CreateAccessToken(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<System.Collections.Generic.IEnumerable<string>>()))
        //        .Returns("access_token");

        //    // Act
        //    var result = await _authController.Register(registerDto) as CreatedAtActionResult;
        //    var userDto = result.Value as UserDto;

        //    // Assert
        //    Assert.IsNotNull(result);
        //    Assert.AreEqual(nameof(AuthController.Register), result.ActionName);
        //    Assert.AreEqual(newUser.Id, userDto.Id);
        //    Assert.AreEqual(newUser.UserName, userDto.UserName);
        //    Assert.AreEqual(newUser.Email, userDto.EmailAddress);
        //    Assert.AreEqual(newUser.IsSeller, userDto.IsSeller);
        //    Assert.AreEqual(newUser.PhoneNumber, userDto.PhoneNumber);
        //}

        [Test]
        public async Task Register_ExistingUserName_ReturnsBadRequest()
        {
            // Arrange
            var registerUserDto = new RegisterDto
            {
                UserName = "testuser",
                EmailAddress = "testuser@example.com",
                Password = "password",
                IsSeller = true,
                PhoneNumber = "123456789"
            };
            var existingUser = new eVertUser();

            _userManagerMock.Setup(m => m.FindByNameAsync(registerUserDto.UserName))
                .ReturnsAsync(existingUser);

            // Act
            var result = await _authController.Register(registerUserDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }
    }
}
