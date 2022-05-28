namespace Ordering.API.Extensions
{
    public class AuthrizationOptions
    {
        public string Uri { get; set; }
        public string ApiResource { get; set; }
        public string[] AllowedScopes { get; set; }
        public string[] AllowedClients { get; set; }
    }
}
