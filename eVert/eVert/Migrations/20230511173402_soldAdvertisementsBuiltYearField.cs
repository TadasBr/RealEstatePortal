using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eVert.Migrations
{
    /// <inheritdoc />
    public partial class soldAdvertisementsBuiltYearField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuiltYear",
                table: "SoldAdvertisements",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuiltYear",
                table: "SoldAdvertisements");
        }
    }
}
