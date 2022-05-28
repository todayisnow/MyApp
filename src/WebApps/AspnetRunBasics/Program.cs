using Common.Logging;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenTelemetry.Logs;
using OpenTelemetry.Resources;
using Serilog;
using System;
namespace AspnetRunBasics
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
           Host.CreateDefaultBuilder(args)

               .UseSerilog(SeriLogger.Configure)
            .ConfigureLogging((context, loggerConfig) =>
            {
                loggerConfig.AddOpenTelemetry(x =>
                {
                    x.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("motor"));
                    x.IncludeFormattedMessage = true;
                    x.IncludeScopes = true;
                    x.ParseStateValues = true;
                    x.AddOtlpExporter(options => options.Endpoint = new Uri("http://localhost:4317"));
                });
            })
               .ConfigureWebHostDefaults(webBuilder =>
               {
                   webBuilder.UseStartup<Startup>();
               });
    }
}
