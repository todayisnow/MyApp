var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHealthChecksUI()
                .AddInMemoryStorage();
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();
app.MapHealthChecksUI();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();
