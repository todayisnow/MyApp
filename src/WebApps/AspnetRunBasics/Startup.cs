using AspnetRunBasics.Extensions;
using Elastic.Apm.NetCoreAll;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using System;
namespace AspnetRunBasics
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {






            services.AddHttpClientServices(Configuration);


            services.AddHttpContextAccessor();



            services.AddRazorPages();

            services.AddIdentityServerServices(Configuration);

            services.AddHsts(opt =>
            {
                opt.Preload = true;
                opt.IncludeSubDomains = true;
                opt.MaxAge = TimeSpan.FromDays(365);

                //options.Security.HstsConfigureAction?.Invoke(opt);
            });

            // services.AddHealthChecks()
            //   .AddUrlGroup(new Uri(Configuration["ApiSettings:GatewayAddress"]), "Ocelot API Gw", HealthStatus.Degraded);




            services.AddOpenTelemetryTracing(x =>
            {
                x.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("motor"));
                x.AddAspNetCoreInstrumentation(a => a.RecordException = true);
                x.AddEntityFrameworkCoreInstrumentation(e => e.SetDbStatementForText = true);
                x.AddHttpClientInstrumentation(h => h.RecordException = true);
                x.AddMassTransitInstrumentation();
                x.AddSource("motorSource");

                x.AddOtlpExporter(options => options.Endpoint = new Uri("http://localhost:4317"));
            });

            services.AddOpenTelemetryMetrics(x =>
            {
                x.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("motor"));
                x.AddAspNetCoreInstrumentation();
                x.AddHttpClientInstrumentation();
                x.AddMeter("motorMeter");
                x.AddOtlpExporter(options => options.Endpoint = new Uri("http://localhost:4317"));
                x.AddOtlpExporter(options => options.Endpoint = new Uri("http://localhost:4317"));
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseAllElasticApm(Configuration);
            if (env.IsDevelopment())
            {
                app.UseExceptionHandler("/Error");
                //   app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            var options = new ForwardedHeadersOptions()
            {
                ForwardedHeaders = ForwardedHeaders.All
            };
            options.KnownProxies.Clear();
            options.KnownNetworks.Clear();
            app.UseForwardedHeaders(options);
            // app.UseHsts();


            //app.UsePathBase("");

            //// Add custom security headers
            //app.UseSecurityHeaders(new List<string> { "fonts.googleapis.com",
            //"fonts.gstatic.com",
            //"www.gravatar.com" });



            app.UseStaticFiles();







            //app.UseForwardedHeaders(new ForwardedHeadersOptions
            //{
            //    ForwardedHeaders = ForwardedHeaders.XForwardedProto
            //});
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();

                //endpoints.MapHealthChecks("/hc", new HealthCheckOptions()
                //{
                //    Predicate = _ => true,
                //    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                //});
            });
        }



    }
}
