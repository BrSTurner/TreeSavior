using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TreeSavior.Migrations
{
    public partial class UpdateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DonationDate",
                table: "Donations",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 19, 14, 36, 10, 900, DateTimeKind.Local).AddTicks(9045),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldDefaultValue: new DateTime(2021, 9, 19, 14, 35, 51, 672, DateTimeKind.Local).AddTicks(8408));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DonationDate",
                table: "Donations",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(2021, 9, 19, 14, 35, 51, 672, DateTimeKind.Local).AddTicks(8408),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldDefaultValue: new DateTime(2021, 9, 19, 14, 36, 10, 900, DateTimeKind.Local).AddTicks(9045));
        }
    }
}
