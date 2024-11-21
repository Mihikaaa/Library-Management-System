using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using LibraryManagementSystemBackend.Data;
using LibraryManagementSystemBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystemBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext _context;

        public AuthController(LibraryContext context)
        {
            _context = context;
        }

        // Register Endpoint
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user.Password != user.ConfirmPassword)
            {
                return BadRequest("Password and Confirm Password doesn't match.");
            }

            // Hash the password
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Registration successful.");
        }

        // Login Endpoint
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
            {
                return BadRequest("Username and Password are required.");
            }

            // Validate the user from the database
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (user == null)
            {
                return Unauthorized("Invalid username.");
            }

            // Verify the hashed password
            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return Unauthorized("Invalid password.");
            }

            // Return username on successful login
            return Ok(new { message = "Login successful", username = user.Username });
        }
    }
}
