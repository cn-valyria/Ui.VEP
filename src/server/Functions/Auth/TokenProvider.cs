using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Functions.Contracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Functions.Auth
{
    public class TokenProvider : ITokenProvider
    {
        private readonly string _jwtSecret;

        public TokenProvider(IConfiguration configuration)
        {
            _jwtSecret = configuration["JwtSecret"];
        }

        public string GenerateToken(VepAccount account)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", account.NationId.ToString()),
                    new Claim("code", account.UniqueCode)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateToken(string token)
        {
            if (token is null)
                return false;
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out var validatedToken);

                // This technically should only make it this far if ValidateToken worked, but it's a nice 
                // way to sanity check the boolean result
                return validatedToken.ValidTo > DateTime.UtcNow;
            }
            catch
            {
                return false;
            }
        }
    }

    public interface ITokenProvider
    {
        string GenerateToken(VepAccount account);
        bool ValidateToken(string token);
    }
}