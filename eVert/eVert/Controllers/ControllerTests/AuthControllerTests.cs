using eVert.Auth;
using eVert.Auth.Model;
using eVert.Auth.Model.Dtos;
using Microsoft.AspNet.Http.Features.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace eVert.Controllers.ControllerTests
{
    [TestFixture]
    public class AuthControllerTests
    {
        private AuthController _controller;
        private Mock<UserManager<eVertUser>> _mockUserManager;
        private Mock<IJwtTokenService> _mockJwtTokenService;

        [SetUp]
        public void SetUp()
        {
            _mockUserManager = new Mock<UserManager<eVertUser>>(
                Mock.Of<IUserStore<eVertUser>>(), null, null, null, null, null, null, null, null);
            _mockJwtTokenService = new Mock<IJwtTokenService>();
            _controller = new AuthController(_mockUserManager.Object, _mockJwtTokenService.Object, null, null);
        }

        //[Test]
        //public async Task Register_WithValidModel_ReturnsCreatedResult()
        //{
        //    // Arrange
        //    var registerDto = new RegisterDto
        //    {
        //        UserName = "johndoe",
        //        EmailAddress = "john.doe@example.com",
        //        Password = "password123",
        //        IsSeller = true,
        //        PhoneNumber = "1234567890"
        //    };

        //    _mockUserManager.Setup(x => x.FindByNameAsync(registerDto.UserName))
        //        .ReturnsAsync((eVertUser)null);

        //    _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<eVertUser>(), registerDto.Password))
        //        .ReturnsAsync(IdentityResult.Success)
        //        .Callback<eVertUser, string>((x, y) => x.Id = "1");

        //    _mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<eVertUser>(), eVertRoles.eVertUser))
        //        .ReturnsAsync(IdentityResult.Success);

        //    // Act
        //    var result = await _controller.Register(registerDto);

        //    // Assert
        //    var createdResult = Assert.IsInstanceOf<CreatedAtActionResult>(result);
        //    var userDto = Assert.IsInstanceOf<UserDto>(createdResult.Value);

        //    Assert.AreEqual("1", userDto.Id);
        //    Assert.AreEqual(registerDto.UserName, userDto.UserName);
        //    Assert.AreEqual(registerDto.EmailAddress, userDto.Email);
        //    Assert.AreEqual(registerDto.IsSeller, userDto.IsSeller);
        //    Assert.AreEqual(registerDto.PhoneNumber, userDto.PhoneNumber);
        //}

        [Test]
        public async Task Register_WithExistingUsername_ReturnsBadRequest()
        {
            // Arrange
            var registerDto = new RegisterDto
            {
                UserName = "johndoe",
                EmailAddress = "john.doe@example.com",
                Password = "password123",
                IsSeller = true,
                PhoneNumber = "1234567890"
            };

            _mockUserManager.Setup(x => x.FindByNameAsync(registerDto.UserName))
                .ReturnsAsync(new eVertUser());

            // Act
            var result = _controller.Register(registerDto).Result;

            // Assert
            Assert.AreEqual("User already exists, choose different username.", result);
        }

        //[Test]
        //public async Task Register_WithInvalidModel_ReturnsBadRequest()
        //{
        //    // Arrange
        //    var registerDto = new RegisterDto();

        //    _controller.ModelState.AddModelError("UserName", "Username is required.");

        //    // Act
        //    var result = await _controller.Register(registerDto);

        //    // Assert
        //    var badRequestResult = Assert.IsInstanceOf<BadRequestObjectResult>(result);
        //    Assert.AreEqual("Invalid input model.", badRequestResult.Value);
        //}
    }
}
