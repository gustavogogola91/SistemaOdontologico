using Microsoft.EntityFrameworkCore;
using SistemaOdontologico.Data; 
using backend.Backup;
using backend.FileEncryptor;
using backend.Restore;
using Quartz;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("DbConnectionString")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IFileEncryptorService, FileEncryptorService>();
builder.Services.AddScoped<IBackupService, BackupService>();
builder.Services.AddScoped<IRestoreService, RestoreService>();

builder.Services.AddQuartzHostedService(options =>
{
    options.WaitForJobsToComplete = true;
});

builder.Services.AddQuartz(q =>
{
    var jobKey = new JobKey("BackupJob");

    q.AddJob<BackupJob>(opts => opts.WithIdentity(jobKey));

    q.AddTrigger(opts => opts
            .ForJob(jobKey)
            .WithIdentity("BackupJob-trigger")
            .WithCronSchedule("0 0 2 * * ?")
        );
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowAll");
//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();