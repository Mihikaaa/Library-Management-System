namespace LibraryManagementSystemBackend.Data
{
    using Microsoft.EntityFrameworkCore;
    using LibraryManagementSystemBackend.Models;  

    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
    }
}