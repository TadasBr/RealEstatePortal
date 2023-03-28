namespace eVert.Auth.Model
{
    public class eVertRoles
    {
        public const string Admin = nameof(Admin);
        public const string eVertUser = nameof(eVertUser);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, eVertUser };

    }
}
