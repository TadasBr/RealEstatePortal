using eVert.Data;
using eVert.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<eVertDbContext>();
builder.Services.AddTransient<ICategoriesRepository, CategoriesRepository>();

var app = builder.Build();

app.UseRouting();

app.MapControllers();

app.Run();
