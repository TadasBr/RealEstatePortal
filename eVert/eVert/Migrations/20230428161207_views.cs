using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eVert.Migrations
{
    /// <inheritdoc />
    public partial class views : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Area",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "HasParking",
                table: "Advertisements",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "RoomsCount",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "Advertisements",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Area",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "HasParking",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "RoomsCount",
                table: "Advertisements");

            migrationBuilder.DropColumn(
                name: "Views",
                table: "Advertisements");
        }
    }
}
