﻿using MediatR;
using Ordering.Application.Features.Orders.Models;
using System;
using System.Collections.Generic;

namespace Ordering.Application.Features.Orders.Queries.GetOrdersList
{
    public class GetOrdersListQuery : IRequest<List<OrdersVm>>
    {
        public string UserName { get; set; }

        public GetOrdersListQuery(string userName)
        {
            UserName = userName ?? throw new ArgumentNullException(nameof(userName));
        }
    }
}
