namespace api.Contracts;

public class AuthorizedAccount
{
    public int NationId { get; set; }
    public string RulerName { get; set; }
    public string UniqueCode { get; set; }
    public string AccessToken { get; set; }
}