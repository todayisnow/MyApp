using Elastic.Apm.NetCoreAll;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Ordering.API.Extensions;
using Ordering.Application;
using Ordering.Infrastructure;
using System.IdentityModel.Tokens.Jwt;

namespace Ordering.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddApplicationServices();
            services.AddInfrastructureServices(Configuration);



            services.AddAutoMapper(typeof(Startup));

            services.AddControllers();

            var adminApiConfiguration =
                Configuration.GetSection(nameof(AdminApiConfiguration)).Get<AdminApiConfiguration>();
            services.AddSingleton(adminApiConfiguration);

            services.AddHttpClientServices(adminApiConfiguration);

            services.AddAuthentication(adminApiConfiguration);

            services.AddAuthorization(adminApiConfiguration);

            services.AddSwaggerConfiguration(adminApiConfiguration);




            //  services.AddHealthChecks().AddDbContextCheck<OrderContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AdminApiConfiguration adminApiConfiguration)
        {
            app.UseAllElasticApm(Configuration);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"{adminApiConfiguration.ApiBaseUrl}/swagger/v1/swagger.json", adminApiConfiguration.ApiName);

                c.OAuthClientId(adminApiConfiguration.OidcSwaggerUIClientId);
                c.OAuthAppName(adminApiConfiguration.ApiName);
                c.OAuthUsePkce();
            });
            //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ordering.API v1"));
            //app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //endpoints.MapHealthChecks("/hc", new HealthCheckOptions()
                //{
                //    Predicate = _ => true,
                //    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                //});
            });
        }
    }
}
