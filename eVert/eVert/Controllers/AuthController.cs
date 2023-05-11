using eVert.Auth;
using eVert.Auth.Model;
using eVert.Auth.Model.Dtos;
using eVert.Data.Dtos.Advertisements;
using eVert.Data.Repositories.Advertisements;
using eVert.Data.Repositories.BuyAdvertisiments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace eVert.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<eVertUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private IAdvertisementsRepository _advertisementsRepository;
        private IBuyAdvertisementsRepository _buyAdvertisementsRepository;


        public AuthController(UserManager<eVertUser> userManager, IJwtTokenService jwtTokenService, IAdvertisementsRepository advertisementsRepository, IBuyAdvertisementsRepository buyAdvertisementsRepository)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _advertisementsRepository = advertisementsRepository;
            _buyAdvertisementsRepository = buyAdvertisementsRepository;
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
                UserName = registerUserDto.UserName,
                IsSeller = registerUserDto.IsSeller,
                PhoneNumber = registerUserDto.PhoneNumber
            };
            var createUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);
            if (!createUserResult.Succeeded)
                return BadRequest("Could not create a user.");

            await _userManager.AddToRoleAsync(newUser, eVertRoles.eVertUser);

                return CreatedAtAction(nameof(Register), new UserDto(newUser.Id, newUser.UserName, newUser.Email, newUser.IsSeller, newUser.PhoneNumber));
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

            return Ok(new SuccessfulLoginDto(accessToken, user.UserName, user.IsSeller, user.PhoneNumber));
        }

        [HttpPut]
        [Route("change-role")]
        [Authorize(Roles = eVertRoles.eVertUser)]
        public async Task<ActionResult> ChangeRole()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            if (userName != null)
            {
                var user = await _userManager.FindByNameAsync(userName);

                if (user != null)
                {
                    if(user.IsSeller)
                    {
                        var advertisements = await _advertisementsRepository.GetManyAsync();
                        var filteredAdvertisements = advertisements.Where(o => o.UserId == user.Id).ToList();
                        if (filteredAdvertisements != null && filteredAdvertisements.Any())
                        {
                            return new BadRequestResult();
                        }
                    }
                    else
                    {
                        var advertisements = await _buyAdvertisementsRepository.GetManyAsync();
                        var filteredAdvertisements = advertisements.Where(o => o.UserId == user.Id).ToList();
                        if (filteredAdvertisements != null && filteredAdvertisements.Any())
                        {
                            return new BadRequestResult();
                        }
                    }
                    user.IsSeller = !user.IsSeller;
                    await _userManager.UpdateAsync(user);
                    return new OkResult();
                }
            }

            return new BadRequestResult();
        }
    }
}
