using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeSavior.Data;
using TreeSavior.Models;
using TreeSavior.ViewModels;

namespace TreeSavior.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonateController : ControllerBase
    {
        private readonly DbSet<Donator> _donators;
        private readonly DbSet<Donation> _donations;
        private readonly MySqlContext _mySqlContext;
        public DonateController(MySqlContext mySqlContext)
        {
            _mySqlContext = mySqlContext;
            _donators = _mySqlContext.Set<Donator>();
            _donations = _mySqlContext.Set<Donation>();
        }

        [HttpPost("Donate")]
        public async Task<IActionResult> Donate(DonateViewModel donateViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                
                var donatorExists = await _donators.FirstOrDefaultAsync(x => x.CPF == donateViewModel.CPF);

                if(donatorExists == null)
                {
                    var newDonator = new Donator()
                    {
                        Name = donateViewModel.Name,
                        CPF = donateViewModel.CPF,
                        Donations = new List<Donation>()
                        {
                            new Donation() {
                                TotalAmount = donateViewModel.TotalAmount,
                                DonationDate = DateTime.Now,
                                Quantity = donateViewModel.Quantity,
                                Value = donateViewModel.Value
                            }
                        }
                    };

                    await _donators.AddAsync(newDonator);
                    
                    if(await _mySqlContext.SaveChangesAsync() > 0)
                    {
                        return Ok();
                    }

                    return BadRequest();
                }

                var newDonation = new Donation()
                {
                    TotalAmount = donateViewModel.TotalAmount,
                    DonationDate = DateTime.Now,
                    Quantity = donateViewModel.Quantity,
                    Value = donateViewModel.Value,
                    DonatorId = donatorExists.Id,
                    Donator = donatorExists
                };

                await _donations.AddAsync(newDonation);

                if (await _mySqlContext.SaveChangesAsync() > 0)
                {
                    return Ok();
                }

                return BadRequest();
            }
            catch
            {

                return BadRequest();
            }
        }


        [HttpGet("GetTopDonators")]
        public async Task<IActionResult> GetTopDonators()
        {
            try
            {
                var allDonators = await     _donators
                                            .Include(x => x.Donations)
                                            .OrderByDescending(x => x.Donations.Sum(x => x.TotalAmount))
                                            .ToListAsync();

                var topDonators = new List<TopDonateViewModel>(allDonators.Count);

                for (var i = 0; i < allDonators.Count; i++)
                {
                    topDonators.Add(new TopDonateViewModel()
                    {
                        Position = (i+1),
                        Name = allDonators[i].Name,
                        DonatedValue = allDonators[i].Donations.Sum(x => x.TotalAmount),
                        PlantedTrees = allDonators[i].Donations.Sum(x => x.Quantity)
                    });
                }

                return Ok(topDonators);
            }
            catch
            {

                return BadRequest();
            }
        }

        [HttpGet("GetStatus")]
        public IActionResult GetStatus()
        {
            return Ok("API - Working");
        }
    }
}
