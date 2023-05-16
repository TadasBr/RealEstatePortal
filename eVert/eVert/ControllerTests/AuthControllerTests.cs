using eVert.Auth;
using eVert.Auth.Model;
using eVert.Controllers;
using eVert.Data.Dtos.Auth;
using eVert.Data.Entities;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.BuyAdvertisiments;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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
        public void SetUp()
        {
            var userStoreMock = new Mock<IUserStore<eVertUser>>();
            _userManagerMock = new Mock<UserManager<eVertUser>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            _jwtTokenServiceMock = new Mock<IJwtTokenService>();
            _advertisementsRepositoryMock = new Mock<IAdvertisementsRepository>();
            _buyAdvertisementsRepositoryMock = new Mock<IBuyAdvertisementsRepository>();

            _authController = new AuthController(_userManagerMock.Object, _jwtTokenServiceMock.Object, _advertisementsRepositoryMock.Object, _buyAdvertisementsRepositoryMock.Object);
        }

        [Test]
        public async Task Register_UserAlreadyExists_ReturnsBadRequest()
        {
            // Arrange
            var registerUserDto = new RegisterDto { UserName = "test", EmailAddress = "test@test.com", Password = "password", IsSeller = false, PhoneNumber = "1234567890" };
            _userManagerMock.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(new eVertUser());

            // Act
            var result = await _authController.Register(registerUserDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Login_UserNotFound_ReturnsBadRequest()
        {
            // Arrange
            var loginDto = new LoginDto("test", "password");
            _userManagerMock.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync((eVertUser)null);

            // Act
            var result = await _authController.Login(loginDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task ChangeRole_UserNotFound_ReturnsBadRequest()
        {
            // Arrange
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, "test") };
            var identity = new ClaimsIdentity(claims);
            var principal = new ClaimsPrincipal(identity);
            _authController.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = principal }
            };
            _userManagerMock.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync((eVertUser)null);

            // Act
            var result = await _authController.ChangeRole();

            // Assert
            Assert.IsInstanceOf<BadRequestResult>(result);
        }

        [Test]
        public async Task Login_InvalidPassword_ReturnsBadRequest()
        {
            // Arrange
            var loginDto = new LoginDto("test", "password");
            var user = new eVertUser { UserName = loginDto.UserName };
            _userManagerMock.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.CheckPasswordAsync(It.IsAny<eVertUser>(), It.IsAny<string>())).ReturnsAsync(false);

            // Act
            var result = await _authController.Login(loginDto);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
        }

        [Test]
        public async Task Login_ValidUser_ReturnsOkResultWithToken()
        {
            // Arrange
            var loginDto = new LoginDto("test", "password");
            var user = new eVertUser { UserName = loginDto.UserName, IsSeller = true, PhoneNumber = "1234567890", Id = "1" };
            var roles = new List<string> { "User" };
            _userManagerMock.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync(user);
            _userManagerMock.Setup(x => x.CheckPasswordAsync(It.IsAny<eVertUser>(), It.IsAny<string>())).ReturnsAsync(true);
            _userManagerMock.Setup(x => x.GetRolesAsync(It.IsAny<eVertUser>())).ReturnsAsync(roles);
            _jwtTokenServiceMock.Setup(x => x.CreateAccessToken(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IEnumerable<string>>())).Returns("token");

            // Act
            var result = await _authController.Login(loginDto);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var successfulLoginDto = okResult.Value as SuccessfulLoginDto;
            Assert.IsNotNull(successfulLoginDto);
            Assert.AreEqual(successfulLoginDto.AccessToken, "token");
            Assert.AreEqual(successfulLoginDto.UserName, user.UserName);
            Assert.AreEqual(successfulLoginDto.IsSeller, user.IsSeller);
            Assert.AreEqual(successfulLoginDto.PhoneNumber, user.PhoneNumber);
        }
    }
}
