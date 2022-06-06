using IdentityModel.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ordering.API.Extensions;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Ordering.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json", "application/problem+json")]
    // 
    public class IdentityController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly AdminApiConfiguration _adminApiConfiguration;

        public IdentityController(IHttpClientFactory httpClientFactory, AdminApiConfiguration adminApiConfiguration)
        {
            _httpClientFactory = httpClientFactory;
            _adminApiConfiguration = adminApiConfiguration;
        }

        [HttpGet]
        [Authorize(Policy = AuthorizationConsts.AdministrationPolicy)]
        public IActionResult Get()
        {
            return new JsonResult(from c in User.Claims select new { c.Type, c.Value });
        }
        [HttpGet("Connect")]
        public async Task<ActionResult<string>> ConnectAsync(string ClientId, string ClientSecret)
        {
            var idpClient = _httpClientFactory.CreateClient("IDPClient");

            var metaDataResponse = await idpClient.GetDiscoveryDocumentAsync();

            if (metaDataResponse.IsError)
            {

                throw new HttpRequestException("Something went wrong while requesting the access token - " + metaDataResponse.Error);
            }

            var client = new HttpClient();

            var response = await client.RequestTokenAsync(new TokenRequest
            {
                Address = "https://sts.mofa.local/connect/token",
                GrantType = "client_credentials",

                ClientId = "myOrderAPIClient",
                ClientSecret = "secret",

                Parameters =
                {

                    { "scope", "orderAPI" }
                }
            });

            var userToken = await idpClient.RequestClientCredentialsTokenAsync(
                new ClientCredentialsTokenRequest
                {
                    ClientId = ClientId,
                    ClientSecret = ClientSecret,

                    Address = $"{_adminApiConfiguration.IdentityServerBaseUrl}/connect/token"


                });

            if (userToken.IsError)
            {
                throw new HttpRequestException("Something went wrong while authenticating for token - " + userToken.Error);
            }

            return Ok(userToken.AccessToken);
        }

    }
}
