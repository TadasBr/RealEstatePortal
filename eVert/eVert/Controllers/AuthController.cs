using eVert.Auth;
using eVert.Auth.Model;
using eVert.Auth.Model.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace eVert.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<eVertUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(UserManager<eVertUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDto registerUserDto)
        {
            var user = await _userManager.FindByNameAsync(registerUserDto.UserName);
            if (user != null)
                return BadRequest("User already exists, choose different username.");

            var newUser = new eVertUser
            {
                Email = registerUserDto.EmailAddress,
                UserName = registerUserDto.UserName
            };
            var createUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (!createUserResult.Succeeded)
                return BadRequest("Could not create a user.");

            await _userManager.AddToRoleAsync(newUser, eVertRoles.eVertUser);

                return CreatedAtAction(nameof(Register), new UserDto(newUser.Id, newUser.UserName, newUser.Email));
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
                return BadRequest("User name or password is invalid.");

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
                return BadRequest("User name or password is invalid.");

            // valid user
            var roles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessToken(user.UserName, user.Id, roles);

            return Ok(new SuccessfulLoginDto(accessToken));
        }
    }
}
