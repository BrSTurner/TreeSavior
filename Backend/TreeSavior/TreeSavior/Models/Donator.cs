using System.Collections.Generic;

namespace TreeSavior.Models
{
    public class Donator : Entity
    {
        public string Name { get; set; }
        public string CPF { get; set; }
        public virtual ICollection<Donation> Donations { get; set; }
    }
}
