using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repository;

[assembly: FunctionsStartup(typeof(Functions.Startup))]

namespace Functions
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services
                .AddVepDbRepositories(builder.GetContext().Configuration)
                .AddAutoMapper(typeof(Startup));
        }
    }

    internal static class StartupExtensions
    {
        public static IServiceCollection AddVepDbRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            var vepDbConnectionString = configuration.GetConnectionString("VepDb");

            return services
                .AddTransient<IAccountsRepository>(sp => new AccountsRepository(vepDbConnectionString))
                .AddTransient<ITransactionsRepository>(sp => new TransactionsRepository(vepDbConnectionString));
        }
    }
}