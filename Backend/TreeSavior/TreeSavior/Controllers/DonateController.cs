﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TreeSavior.Data;
using TreeSavior.ViewModels;

namespace TreeSavior.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DonateController : ControllerBase
    {
        private readonly MySqlContext _mySqlContext;
        public DonateController(MySqlContext mySqlContext)
        {
            _mySqlContext = mySqlContext;
        }

        [HttpPost]
        public async Task<IActionResult> Donate(DonateViewModel donateViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                /*TODO: 
                 * More Validations using FluentValidator
                 * Check if CPF/CNPJ already exists in Database, if yes you should only place data on donation table, otherwise you just save user and donation
                 * Commit and return success
                 */

                return Ok();
            }
            catch
            {

                return BadRequest();
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetTopDonators()
        {
            try
            {
                //TODO: Get from Database using JOIN and suming all donations from that user and order by desc the sum 

                return Ok();
            }
            catch
            {

                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetStatus()
        {
            return Ok("API - Working");
        }
    }
}
