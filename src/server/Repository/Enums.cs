namespace Repository
{
    public enum Role
    {
        NotParticipating = 0,
        Buyer,
        Seller,
        Donor,
        Farm,
        Collector,
        Receiver,
        ProbationarySeller,
        TemporaryDonor,
        TemporaryCollector,
        TemporaryFarm,
        TemporaryReceiver
    }

    public enum RecentActivity
    {
        ActiveInTheLast3Days = 1,
        ActiveThisWeek = 2,
        ActiveLastWeek = 3,
        ActiveThreeWeeksAgo = 4,
        ActiveMoreThanThreeWeeksAgo = 5
    }

    public enum NationalWarStatus
    {
        War = 1,
        Peace = 2
    }
}