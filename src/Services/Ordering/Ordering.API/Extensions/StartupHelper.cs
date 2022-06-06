using Common.Logging;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using Ordering.API.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Ordering.API.Extensions
{
    public static class StartupHelper
    {
        public static IServiceCollection AddHttpClientServices(this IServiceCollection services, AdminApiConfiguration adminApiConfiguration)
        {
            services.AddTransient<LoggingDelegatingHandler>();
            services.AddHttpClient("IDPClient", client =>
            {
                client.BaseAddress = new Uri(adminApiConfiguration.IdentityServerBaseUrl);
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");
            });
            //.AddHttpMessageHandler<LoggingDelegatingHandler>();

            return services;
        }

        public static IServiceCollection AddAuthentication(this IServiceCollection services, AdminApiConfiguration adminApiConfiguration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
            })
              .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
              {
                  options.Authority = adminApiConfiguration.IdentityServerBaseUrl;
                  options.RequireHttpsMetadata = adminApiConfiguration.RequireHttpsMetadata;
                  options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                  {
                      ValidateIssuer = true,
                      ValidAudiences = adminApiConfiguration.Audiences,
                      ValidateLifetime = true,
                      ValidIssuer = adminApiConfiguration.IdentityServerBaseUrl,
                      ClockSkew = TimeSpan.Zero,

                  };

              });

            return services;
        }
        public static IServiceCollection AddAuthorization(this IServiceCollection services, AdminApiConfiguration adminApiConfiguration)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthorizationConsts.AdministrationPolicy,
                    policy =>
                        policy.RequireAssertion(context =>
                        {
                            bool isApiUserHasAccess = context.User.HasClaim(c => c.Type == JwtClaimTypes.Scope && adminApiConfiguration.AllowedScopes.Contains(c.Value))
                                                   && context.User.HasClaim(c => c.Type == JwtClaimTypes.ClientId && adminApiConfiguration.AllowedClients.Contains(c.Value));
                            bool isAdmin = context.User.HasClaim(c =>
                                    ((c.Type == JwtClaimTypes.Role && c.Value == adminApiConfiguration.AdministrationRole) ||
                                    (c.Type == $"client_{JwtClaimTypes.Role}" && c.Value == adminApiConfiguration.AdministrationRole))
                                ) && context.User.HasClaim(c => c.Type == JwtClaimTypes.Scope && c.Value == adminApiConfiguration.OidcApiName);
                            return isAdmin || isApiUserHasAccess;


                        }

                        ));
            });

            return services;
        }

        public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services, AdminApiConfiguration adminApiConfiguration)
        {
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(adminApiConfiguration.ApiVersion, new OpenApiInfo { Title = adminApiConfiguration.ApiName, Version = adminApiConfiguration.ApiVersion });


                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        AuthorizationCode = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri($"{adminApiConfiguration.IdentityServerBaseUrl}/connect/authorize"),
                            TokenUrl = new Uri($"{adminApiConfiguration.IdentityServerBaseUrl}/connect/token"),
                            Scopes = new Dictionary<string, string> {
                    { adminApiConfiguration.OidcApiName, adminApiConfiguration.ApiName }
                }
                        }
                    }
                });
                options.OperationFilter<AuthorizeCheckOperationFilter>();

            });

            return services;
        }
    }
}
