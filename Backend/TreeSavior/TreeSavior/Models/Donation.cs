using System;

namespace TreeSavior.Models
{
    public class Donation : Entity
    {
        public virtual Donator Donator { get; set; }
        public int DonatorId { get; set; }
        public int Quantity { get; set; }
        public decimal Value { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime DonationDate { get; set; }
    }
}
