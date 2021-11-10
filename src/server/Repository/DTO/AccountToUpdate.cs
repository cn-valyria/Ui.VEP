namespace Repository.DTO
{
    public class AccountToUpdate
    {
        public int Id { get; set; }
        public char Role { get; set; }
        public string UniqueCode { get; set; }
        public string Discord { get; set; }
        public long DiscordUniqueId { get; set; }
        public bool HasForeignMinistry { get; set; }
        public bool HasFederalAidCommission { get; set; }
        public bool HasDisasterReliefAgency { get; set; }
    }
}