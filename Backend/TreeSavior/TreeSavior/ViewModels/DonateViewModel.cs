using System.ComponentModel.DataAnnotations;

namespace TreeSavior.ViewModels
{
    public class DonateViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string CPF { get; set; }

        [Required]
        [Range(5, int.MaxValue)]
        public decimal Value { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public string CardHolder { get; set; }

        [Required]
        public long CardNumber { get; set; }

        [Required]
        [StringLength(6)]
        public string CardExpirationDate { get; set; }

        [Required]
        public int CardSecurityCode { get; set; }

        [Required]
        [Range(1, 12)]
        public int CardParcels { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public decimal TotalAmount { get; set; }
    }
}
