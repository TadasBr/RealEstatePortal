using eVert.Auth;
using Moq;
using NUnit.Framework;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[TestFixture]
public class JwtTokenServiceTests
{
    private Mock<IConfiguration> _mockConfig;
    private JwtTokenService _jwtTokenService;

    [SetUp]
    public void Setup()
    {
        _mockConfig = new Mock<IConfiguration>();
        _mockConfig.SetupGet(x => x["JWT:Secret"]).Returns("my_secret_key");
        _mockConfig.SetupGet(x => x["JWT:ValidIssuer"]).Returns("http://localhost:5000");
        _mockConfig.SetupGet(x => x["JWT:ValidAudience"]).Returns("http://localhost:5000");

        _jwtTokenService = new JwtTokenService(_mockConfig.Object);
    }

    [Test]
    public void CreateAccessToken_Returns_Valid_Token()
    {
        // Arrange
        var userName = "testuser";
        var userId = "123456789";
        var userRoles = new List<string> { "user", "admin" };

        // Act
        var token = _jwtTokenService.CreateAccessToken(userName, userId, userRoles);

        // Assert
        Assert.IsNotNull(token);
        Assert.IsNotEmpty(token);

        var tokenHandler = new JwtSecurityTokenHandler();
        var decodedToken = tokenHandler.ReadJwtToken(token);

        Assert.AreEqual(userName, decodedToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value);
        Assert.AreEqual(userId, decodedToken.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Sub)?.Value);

        var roles = decodedToken.Claims.Where(x => x.Type == ClaimTypes.Role).Select(x => x.Value);
        Assert.AreEqual(userRoles.Count(), roles.Count());
        foreach (var role in userRoles)
        {
            Assert.IsTrue(roles.Contains(role));
        }
    }
}
